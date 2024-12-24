import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserThunk } from '../../features/authSlice'

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
      <>
         {error && <>{error}</>}
         <form onSubmit={handleLogin}>
            <p>아이디</p>
            <input type="text" name="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
            <p>비밀번호</p>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>
               로그인
            </button>
         </form>
         <p>
            계정이 없다면 회원가입을 진행해주세요. <Link to="/signup">회원가입</Link>
         </p>
      </>
   )
}
export default Login
