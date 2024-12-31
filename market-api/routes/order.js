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
            status: '거래진행중',
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
router.patch('/check/:id', isLoggedIn, async (req, res) => {
   try {
      const check = await Order.update(
         {
            status: '상품준비중',
         },
         {
            where: {
               status: '결제완료',
               id: req.params.id,
            },
         }
      )
      if (!check) {
         return res.status(400).json({ success: false, message: '주문을 확인할 수 없습니다.' })
      }
      res.json({
         success: true,
         message: '주문을 확인했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '주문 확인중 오류가 발생했습니다.', error })
   }
})

// 발송완료
router.patch('/send/:id', isLoggedIn, async (req, res) => {
   try {
      const send = await Order.update(
         {
            status: '배송중',
         },
         {
            where: {
               status: '상품준비중',
               id: req.params.id,
            },
         }
      )
      if (!send) {
         return res.status(400).json({ success: false, message: '주문을 확인할 수 없습니다.' })
      }
      res.json({
         success: true,
         message: '배송을 완료했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '주문 확인중 오류가 발생했습니다.', error })
   }
})

// 수령완료
router.patch('/receive/:id', isLoggedIn, async (req, res) => {
   try {
      const orderReceive = await Order.findOne({
         where: { id: req.params.id },
      })
      await orderReceive.update({ status: '배송완료' })
      if (!orderReceive) {
         return res.status(404).json({ success: false, message: '주문을 찾을 수 없습니다.' })
      }
      const productReceive = await Product.findOne({
         where: { id: orderReceive.ProductId },
      })
      await productReceive.update({ status: '판매완료' })
      if (!productReceive) {
         return res.status(404).json({ success: false, message: '상품을 찾을 수 없습니다.' })
      }
      res.json({
         success: true,
         message: '상품 상태를 성공적으로 수정했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '상품 상태 변경중 오류가 발생했습니다.', error })
   }
})

module.exports = router
