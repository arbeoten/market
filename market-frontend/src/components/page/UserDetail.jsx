import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserByIdThunk } from '../../features/userSlice'
import { useParams } from 'react-router-dom'

const UserPageDetail = ({ isAuthenticated, nowUser }) => {
   const { id } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchGetUserByIdThunk(id))
   }, [dispatch, id])
   const { user, loading, error } = useSelector((state) => state.user)

   return <>{user && <></>}</>
}

export default UserPageDetail
