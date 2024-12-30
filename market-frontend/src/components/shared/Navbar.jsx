import { useDispatch } from 'react-redux'
import { Container, Wrap, SearchBox, LoginBt } from '../../styles/navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { logoutUserThunk } from '../../features/authSlice'
import SearchIcon from '@mui/icons-material/Search'

const Navbar = ({ isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [keyword, setKeyword] = useState('')

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate])

   const handleSearch = useCallback(() => {
      window.location.href = `/?keyword=${keyword}`
   }, [keyword])
   return (
      <Wrap>
         <Container>
            <Link to="/">
               <img src="/images/logo.png" height={'40px'} />
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
                  <Link to="/login">
                     <LoginBt>로그인/회원가입</LoginBt>
                  </Link>
               </>
            )}
         </Container>
      </Wrap>
   )
}

export default Navbar
