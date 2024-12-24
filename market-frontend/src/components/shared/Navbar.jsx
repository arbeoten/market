import { useDispatch } from 'react-redux'
import { Container } from '../../styles/myStyle'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { logoutUserThunk } from '../../features/authSlice'

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
         {isAuthenticated ? (
            // 로그인 상태일시
            <>
               환영합니다 {user?.nick}님<button onClick={handleLogout}>로그아웃</button>
               <Link to="/board/create">
                  <button>판매등록</button>
               </Link>
            </>
         ) : (
            // 로그인 상태가 아닐시
            <>
               <Link to="/login">
                  <button>로그인/회원가입</button>
               </Link>
            </>
         )}
         <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
         <button onClick={handleSearch}>검색</button>
      </Container>
   )
}

export default Navbar
