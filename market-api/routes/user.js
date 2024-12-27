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

module.exports = router
