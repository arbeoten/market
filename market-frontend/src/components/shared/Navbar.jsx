import { useDispatch } from 'react-redux'
import { Container, Wrap, SearchBox, LoginBt } from '../../styles/navbar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { logoutUserThunk } from '../../features/authSlice'
import SearchIcon from '@mui/icons-material/Search'

const Navbar = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const [keyword, setKeyword] = useState('')

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            window.location.reload()
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch])

   const handleSearch = useCallback(() => {
      window.location.href = `/?keyword=${keyword}`
   }, [keyword])

   const handleLogin = useCallback(() => {
      if (window.location.pathname === '/login') navigate('/login', { state: { redirectUrl: location.state?.redirectUrl || '/' } })
      else navigate('/login', { state: { redirectUrl: window.location.pathname || '/' } })
   }, [navigate])
   return (
      <Wrap>
         <Container>
            <Link to="/" style={{ margin: '0' }}>
               <img src="/images/logo2.png" height={'40px'} alt="로고" />
            </Link>
            <SearchBox>
               <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') handleSearch()
                  }}
               />
               <button onClick={handleSearch}>
                  <SearchIcon />
               </button>
            </SearchBox>
            {isAuthenticated ? (
               // 로그인 상태일시
               <>
                  <p>
                     <Link to={`/user/${user.id}`}>{user?.nick}님</Link>
                  </p>
                  <LoginBt style={{ width: '60px' }} onClick={handleLogout}>
                     로그아웃
                  </LoginBt>
                  <Link to="/board/create">
                     <LoginBt style={{ width: '60px' }}>판매등록</LoginBt>
                  </Link>
               </>
            ) : (
               // 로그인 상태가 아닐시
               <>
                  <LoginBt onClick={handleLogin}>로그인/회원가입</LoginBt>
               </>
            )}
         </Container>
      </Wrap>
   )
}

export default Navbar
