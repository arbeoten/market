import { useDispatch } from 'react-redux'
import { Container, Menu, SearchBox, LoginBt } from '../../styles/navbar'
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
   }, [dispatch, keyword])
   return (
      <Container>
         <Menu>
            <Link to="/">
               <img src="/images/logo.png" height={'40px'} />
            </Link>
            <SearchBox>
               <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
               <button onClick={handleSearch}>
                  <SearchIcon />
               </button>
            </SearchBox>
            {isAuthenticated ? (
               // 로그인 상태일시
               <>
                  환영합니다 <Link to={`/user/${user.id}`}>{user?.nick}님</Link>
                  <button onClick={handleLogout}>로그아웃</button>
                  <Link to="/board/create">
                     <button>판매등록</button>
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
         </Menu>
      </Container>
   )
}

export default Navbar
