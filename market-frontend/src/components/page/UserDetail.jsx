import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserByIdThunk } from '../../features/userSlice'
import { useParams } from 'react-router-dom'
import { Container, Wrap } from '../../styles/userDetail'

const UserPageDetail = ({ isAuthenticated, nowUser }) => {
   const { id } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchGetUserByIdThunk(id))
   }, [dispatch, id])
   const { sellCount, user, loading, error } = useSelector((state) => state.user)

   return (
      <Wrap>
         {user && (
            <Container>
               <p>{user.nick}님의 프로필 페이지</p>
               <p>가입일 : {user.createdAt.substr(0, 10)}</p>
               <p>판매횟수 : {sellCount}</p>
            </Container>
         )}
      </Wrap>
   )
}

export default UserPageDetail
