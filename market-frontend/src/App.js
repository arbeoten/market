import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import OrderPage from './pages/OrderPage'
import BoardDetailPage from './pages/BoardDetailPage'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
   const dispatch = useDispatch()

   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태 가져오기
   useEffect(() => {
      //  dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:search" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/boardDetail" element={<BoardDetailPage />} />
         </Routes>
      </>
   )
}

export default App
