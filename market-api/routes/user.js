const express = require('express')
const router = express.Router()
const { User, Order, Product } = require('../models')

// 유저 검색
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Order,
               where: { CustomerId: req.params.id },
               required: false,
            },
            {
               model: Product,
               where: { SellerId: req.params.id },
               required: false,
            },
         ],
         order: [
            [Order, 'id', 'DESC'],
            [Product, 'id', 'DESC'],
         ],
      })
      if (!user) {
         return res.status(404).json({ success: false, message: '유저를 찾을 수 없습니다.' })
      }
      const products = await Product.findAll({
         where: {
            SellerId: req.params.id,
            status: '판매완료',
         },
      })
      let sellCount = 0
      if (products.length) sellCount = products.length
      res.json({
         success: true,
         user,
         sellCount,
         message: '유저를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '유저를 찾는 중 오류가 발생했습니다.', error })
   }
})

// 판매수 카운트
router.get('/:id/sellCount', async (req, res) => {
   try {
      const products = await Product.findAll({
         where: {
            SellerId: req.params.id,
            status: '판매완료',
         },
      })
      let sellCount = 0
      if (products.length) sellCount = products.length
      res.json({
         sellCount,
         success: true,
         message: '유저 정보 확인을 성공했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '유저 정보 확인중 오류가 발생했습니다.', error })
   }
})
module.exports = router
