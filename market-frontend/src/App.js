import styles from './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserPage from './pages/UserPage'
import OrderPage from './pages/OrderPage'
import BoardDetailPage from './pages/BoardDetailPage'
import BoardCreatePage from './pages/BoardCreatePage'
import BoardEditPage from './pages/BoardEditPage'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { checkAuthStatusThunk } from './features/authSlice'
import Footer from './components/shared/Footer'

function App() {
   const dispatch = useDispatch()

   const { isAuthenticated, user } = useSelector((state) => state.auth)
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/:search" element={<HomePage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user/:id" element={<UserPage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/board/detail/:id" element={<BoardDetailPage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/board/create" element={<BoardCreatePage />} />
            <Route path="/board/edit/:id" element={<BoardEditPage />} />
         </Routes>
         <Footer />
      </>
   )
}

export default App
