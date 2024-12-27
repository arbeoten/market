import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteProductThunk, fetchProductByIdThunk } from '../../features/boardSlice'
import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const BoardDetailPage = ({ isAuthenticated, user }) => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const slides = () =>
      product.Images.map((img) => {
         return (
            <SwiperSlide key={img.img}>
               <img src={process.env.REACT_APP_API_URL + img.img}></img>
            </SwiperSlide>
         )
      })

   // 게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchProductByIdThunk(id))
   }, [dispatch, id])
   const { product, loading, error } = useSelector((state) => state.board)

   const onClickDelete = useCallback((id) => {
      dispatch(deleteProductThunk(id))
         .unwrap()
         .then(() => {
            // navigate('/') => spa방식
            window.location.href = '/' // => 전체 페이지 새로고침
         })
         .catch((error) => {
            console.log('게시물 삭제중 오류발생 :', error)
            alert('게시물 삭제에 실패했습니다.')
         })
   }, [])
   return (
      <>
         {product && (
            <>
               <Swiper
                  pagination={{
                     type: 'fraction',
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
               >
                  {slides()}
               </Swiper>
               <h1>{product.title}</h1>
               <p>{product.User.nick} 님이 판매중입니다</p>
               {isAuthenticated && product.User.id === user.id && (
                  <>
                     <Link to={`/board/edit/${product.id}`}>
                        <button>수정</button>
                     </Link>
                     <button onClick={() => onClickDelete(product.id)}>삭제</button>
                  </>
               )}
               {isAuthenticated && product.User.id !== user.id && (
                  <>
                     <Link to={`/order`} state={{ product: product }}>
                        <button disabled={product.status === '판매중' ? false : true}>주문하기</button>
                     </Link>
                  </>
               )}
            </>
         )}
      </>
   )
}

export default BoardDetailPage
