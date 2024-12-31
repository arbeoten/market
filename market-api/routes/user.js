const express = require('express')
const router = express.Router()
const { User, Order, Product, Image, Category } = require('../models')

// 유저 검색
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findOne({
         where: { id: req.params.id },
      })
      if (!user) {
         return res.status(404).json({ success: false, message: '유저를 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         user,
         message: '유저를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '유저를 찾는 중 오류가 발생했습니다.', error })
   }
})

// 판매 리스트
router.get('/:id/sell', async (req, res) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = 5
      const offset = (page - 1) * limit

      const products = await Product.findAndCountAll({
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
            {
               model: Order,
            },
         ],
         where: { SellerId: req.params.id },
      })
      if (!products) {
         return res.status(404).json({ success: false, message: '상품을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         products: products.rows,
         sellPagination: {
            totalProducts: products.count,
            currentPage: page,
            totalPages: Math.ceil(products.count / limit),
            limit,
         },
         message: '판매 상품 리스트 호출 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트를 불러오는 중에 오류가 발생했습니다.' })
   }
})

// 구매 리스트
router.get('/:id/buy', async (req, res) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = 5
      const offset = (page - 1) * limit

      const orders = await Order.findAndCountAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: Product,
               include: [
                  {
                     model: Image,
                     attributes: ['img'],
                     where: {
                        isTitle: true,
                     },
                  },
               ],
            },
         ],
         where: { CustomerId: req.params.id },
      })
      if (!orders) {
         return res.status(404).json({ success: false, message: '주문을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         products: orders.rows,
         buyPagination: {
            totalProducts: orders.count,
            currentPage: page,
            totalPages: Math.ceil(orders.count / limit),
            limit,
         },
         message: '구매 상품 리스트 호출 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 리스트를 불러오는 중에 오류가 발생했습니다.' })
   }
})

module.exports = router
