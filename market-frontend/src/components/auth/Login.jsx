import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserThunk } from '../../features/authSlice'
import { Wrap, Container } from '../../styles/input'
import { TextField, Button } from '@mui/material'

const Login = () => {
   const [loginId, setLoginId] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (loginId.trim() && password.trim()) {
            dispatch(loginUserThunk({ loginId, password }))
               .unwrap()
               .then(() => navigate('/'))
               .catch((error) => console.error('로그인 실패'))
         }
      },
      [dispatch, loginId, password, navigate]
   )

   return (
      <Wrap>
         <Container>
            <p>로그인</p>
            {error && <>{error}</>}
            <form onSubmit={handleLogin}>
               <TextField id="loginId" label="아이디" variant="outlined" type="text" name="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} sx={{ m: 1 }} />
               <TextField id="password" label="비밀번호" variant="outlined" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ m: 1 }} />
               <Button type="submit" disabled={loading} variant="contained" sx={{ m: 1 }}>
                  로그인
               </Button>
            </form>
            <p>
               계정이 없다면 회원가입을 진행해주세요. <Link to="/signup">회원가입</Link>
            </p>
         </Container>
      </Wrap>
   )
}
export default Login
