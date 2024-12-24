const express = require('express')
const router = express.Router()
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   const { nick, loginId, password, phone } = req.body
   try {
      // 중복 아이디 처리
      const exUser = await User.findOne({ where: { loginId } })
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '존재하는 사용자입니다.',
         })
      }
      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12)

      // create : 데이터 삽입(insert)
      const newUser = await User.create({
         nick,
         loginId,
         password: hash, // 암호화된 비밀번호
         phone,
      })
      res.status(201).json({
         success: true,
         message: '사용자 등록 성공',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '사용자 등록중 오류 발생',
         error,
      })
   }
})

// 로그인 (보안상 이유 + 서버데이터(로그인상태)를 변경하는 것이기 때문에 get이 아닌 post 사용)
router.post('/login', isNotLoggedIn, async (req, res, next) => {
   // 패스포트 라이브러리를 이용한 로그인 인증
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res.status(500).json({
            success: false,
            message: '로그인 인증 중 오류 발생',
         })
      }
      if (!user) {
         // 비밀번호 불일치 or 사용자 없음
         return res.status(401).json({
            success: false,
            message: '로그인 중 오류 발생 (비밀번호 불일치 or 사용자 없음)',
         })
      }
      req.login(user, (loginError) => {
         if (loginError) {
            return res.status(500).json({
               success: false,
               message: '로그인 중 오류 발생',
            })
         }
         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logOut((error) => {
      if (error) {
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류 발생',
         })
      }
      res.json({
         success: true,
         message: '로그아웃 성공',
      })
   })
})

// 로그인 상태 확인
router.get('/status', async (req, res, next) => {
   // 로그인이 된 상태라면
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick,
         },
      })
   } else {
      // 로그인이 안됐다면
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router
