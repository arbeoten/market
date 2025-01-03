const express = require('express')
const { Category } = require('../models')
const router = express.Router()

// 전체 카테고리 조회
router.get('/', async (req, res) => {
   try {
      const categorys = await Category.findAll({
         order: [['id']],
      })
      res.json({
         categorys,
         success: true,
         message: '카테고리 리스트 호출 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '카테고리 리스트를 불러오는 중에 오류가 발생했습니다.' })
   }
})

// 카테고리 추가
router.post('/', async (req, res) => {
   try {
      const categorys = await Category.create({
         categoryName: req.body.category,
      })
      res.json({
         success: true,
         message: '카테고리 등록 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '카테고리를 등록하는 중에 오류가 발생했습니다.' })
   }
})

module.exports = router
