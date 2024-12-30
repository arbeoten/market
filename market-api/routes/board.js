const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { isLoggedIn } = require('./middlewares')
const { Product, Image, User, Category } = require('../models')
const { Sequelize } = require('sequelize')
const { title } = require('process')

// uploads 폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads')
} catch (err) {
   console.log('uploads 폴더를 새로 생성합니다')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodedFileName)
         const basename = path.basename(decodedFileName, ext)
         cb(null, basename + '_' + Date.now() + ext)
      },
   }),
   limits: { fileSize: 10 * 1024 * 1024 },
})

// 게시물 등록
router.post(
   '/',
   isLoggedIn,
   upload.fields([
      { name: 'titleImg', maxCount: 1 },
      { name: 'subImg', maxCount: 4 },
   ]),
   async (req, res) => {
      try {
         if (!req.files.titleImg[0]) {
            return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다' })
         }
         // 게시물 생성
         const product = await Product.create({
            title: req.body.title,
            content: req.body.content,
            subContent: req.body.subContent,
            price: req.body.price,
            // status -> 디폴트
            SellerId: req.user.id,
            CategoryId: req.body.categoryId,
         })

         // 대표 이미지 등록
         const titleImgReg = await Image.create({
            img: `/${req.files.titleImg[0].filename}`,
            ProductId: product.id,
            isTitle: true,
         })

         // 서브 이미지 등록
         if (req.files.subImg) {
            const imgFiles = req.files.subImg
            const result = imgFiles.map((img) => {
               Image.create({
                  img: `/${img.filename}`,
                  ProductId: product.id,
                  isTitle: false,
               })
            })
         }
         res.json({
            success: true,
            product: {
               id: product.id,
               title: product.title,
               content: product.content,
               subContent: product.content,
               price: product.price,
               status: product.status,
               CategoryId: product.CategoryId,
               SellerId: product.SellerId,
            },
            message: '게시물이 성공적으로 등록되었습니다',
         })
      } catch (error) {
         console.error(error)
         res.status(500).json({ success: false, message: '게시물 등록 중 오류가 발생했습니다.', error })
      }
   }
)

// 게시물 호출 (상품)
router.get('/', async (req, res) => {
   try {
      const Op = Sequelize.Op
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 5
      const keyword = req.query.keyword || ''
      const offset = (page - 1) * limit

      const count = await Product.count()
      let products = null

      if (keyword) {
         products = await Product.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
               {
                  model: User,
                  attributes: ['id', 'nick'],
               },
               {
                  model: Image,
                  attributes: ['img'],
                  where: {
                     isTitle: true,
                  },
               },
               {
                  model: Category,
                  attributes: ['categoryName'],
               },
            ],
            where: { title: { [Op.like]: `%${keyword}%` } },
         })
      } else {
         products = await Product.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
               {
                  model: User,
                  attributes: ['id', 'nick'],
               },
               {
                  model: Image,
                  attributes: ['img'],
                  where: {
                     isTitle: true,
                  },
               },
               {
                  model: Category,
                  attributes: ['categoryName'],
               },
            ],
         })
      }
      res.json({
         success: true,
         products,
         pagination: {
            totalProducts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '게시물 리스트 호출 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트를 불러오는 중에 오류가 발생했습니다.' })
   }
})

// 특정 게시물 호출
router.get('/:id', async (req, res) => {
   try {
      const product = await Product.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'createdAt'],
            },
            {
               model: Image,
               attributes: ['img', 'isTitle'],
            },
            {
               model: Category,
               attributes: ['categoryName'],
            },
         ],
      })
      if (!product) {
         return res.status(404).json({ success: false, message: '상품을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         product,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 로드 중 오류가 발생했습니다.', error })
   }
})

// 게시물 수정
router.put(
   '/:id',
   isLoggedIn,
   upload.fields([
      { name: 'titleImg', maxCount: 1 },
      { name: 'subImg', maxCount: 4 },
   ]),
   async (req, res) => {
      try {
         const product = await Product.findOne({
            where: { id: req.params.id, SellerId: req.user.id },
         })
         if (!product) {
            return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
         }
         await product.update({
            title: req.body.title,
            content: req.body.content,
            subContent: req.body.content,
            price: req.body.price,
            CategoryId: req.body.categoryId,
         })
         // 이미지
         if (req.files.titleImg) {
            const titleImg = await Image.findOne({
               where: { ProductId: product.id, isTitle: true },
            })
            await titleImg.update({
               img: `/${req.files.titleImg[0].filename}`,
            })
         }
         // 서브 이미지
         if (req.files.subImg) {
            await Image.destroy({ where: { ProductId: product.id, isTitle: false } })
            const imgFiles = req.files.subImg
            const result = imgFiles.map((img) => {
               Image.create({
                  img: `/${img.filename}`,
                  ProductId: product.id,
                  isTitle: false,
               })
            })
         }
         const updatedProduct = await Product.findOne({
            where: { id: req.params.id },
            include: [
               {
                  model: User,
                  attributes: ['id', 'nick'], // user 테이블의 id, nick 컬럼만 가져옴
               },
            ],
         })
         res.json({
            success: true,
            post: updatedProduct,
            message: '게시물이 성공적으로 수정되었습니다.',
         })
      } catch (error) {
         console.error(error)
         res.status(500).json({ success: false, message: '게시물 수정 중 오류가 발생했습니다.', error })
      }
   }
)

// 게시물 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const product = await Product.findOne({
         where: { id: req.params.id, SellerId: req.user.id },
      })
      if (!product) {
         return res.status(400).json({ success: false, message: '상품을 찾을 수 없습니다.' })
      }
      //게시물 삭제
      await product.destroy()
      await Image.destroy({ where: { ProductId: req.params.id } })
      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
