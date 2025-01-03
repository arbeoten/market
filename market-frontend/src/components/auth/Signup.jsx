import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'
import { Link, useLocation } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { Wrap, Container } from '../../styles/input'

const Signup = () => {
   const [loginId, setLoginId] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [phone, setPhone] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)

   const location = useLocation()
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!loginId.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim() || !phone.trim()) {
         alert('모든 데이터를 입력해주세요')
         return
      }
      dispatch(registerUserThunk({ loginId, nick, password, phone }))
         .unwrap()
         .then(() => {
            //회원가입 성공시
            setIsSignupComplete(true) //회원가입 완료 상태 true로 변경
         })
         .catch((error) => {
            //회원가입 중 에러 발생시
            console.error('회원가입 에러:', error)
         })
   }, [loginId, nick, password, confirmPassword, phone, dispatch])

   if (isSignupComplete) {
      return (
         <Wrap>
            <Container>
               <p>
                  회원가입이 완료되었습니다.
                  <Link style={{ fontWeight: 'bold' }} to={location.state?.redirectUrl || '/'}>
                     기존 페이지로 이동
                  </Link>
               </p>
            </Container>
         </Wrap>
      )
   }
   return (
      <Wrap>
         <Container>
            <p>회원가입</p>
            {error && <>{error}</>}
            <TextField label="아이디" variant="outlined" type="text" name="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
            <TextField label="비밀번호" variant="outlined" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="비밀번호 확인" variant="outlined" type="Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <p>{password === confirmPassword ? password && confirmPassword && '비밀번호가 일치합니다' : password && confirmPassword && '비밀번호가 일치하지 않습니다.'}</p>
            <TextField label="닉네임" variant="outlined" type="text" name="nick" value={nick} onChange={(e) => setNick(e.target.value)} />
            <TextField label="연락처" variant="outlined" type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Button variant="contained" onClick={handleSignup} disabled={loading}>
               가입신청
            </Button>
         </Container>
      </Wrap>
   )
}

export default Signup
