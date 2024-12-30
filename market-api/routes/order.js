const express = require('express')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()
const { Order, Product } = require('../models')

// 상품 주문
router.post('/', isLoggedIn, async (req, res) => {
   try {
      const order = await Order.create({
         address: req.body.address,
         phone: req.body.phone,
         name: req.body.name,
         ProductId: req.body.pid,
         CustomerId: req.user.id,
      })
      await Product.update(
         {
            status: '결제완료',
         },
         { where: { id: order.ProductId } }
      )
      res.json({
         success: true,
         order: {
            id: order.id,
            name: order.name,
            address: order.address,
            phone: order.phone,
            ProductId: order.ProductId,
            CustomerId: order.CustomerId,
         },
         message: '상품 주문을 성공적으로 완료했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '상품 주문 중 오류가 발생했습니다.', error })
   }
})

// 주문확인

// 발송완료

// 수령완료

module.exports = router
