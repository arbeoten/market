import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { fetchProductByIdThunk, updateProductThunk } from '../features/boardSlice'
import { useEffect, useCallback } from 'react'
import BoardReg from '../components/board/BoardReg'

const BoardEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const { product, loading, error } = useSelector((state) => state.board)
   const handleSubmit = useCallback(
      (productData) => {
         dispatch(updateProductThunk({ id, productData }))
            .unwrap()
            .then(() => {
               if (location.state?.redirectUrl) {
                  navigate(location.state?.redirectUrl)
               } else {
                  navigate('/')
               }
            })
            .catch((error) => {
               console.error('게시물 수정 실패 : ', error)
               alert('게시물 수정에 실패했습니다.')
            })
      },
      [dispatch, id]
   )
   useEffect(() => {
      dispatch(fetchProductByIdThunk(id))
   }, [dispatch, id])

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생 : {error}</p>

   return <>{product && <BoardReg onSubmit={handleSubmit} initialValues={product} />}</>
}

export default BoardEditPage
