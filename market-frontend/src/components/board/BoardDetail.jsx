import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteProductThunk, fetchProductByIdThunk } from '../../features/boardSlice'
import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Wrap, Container, SwiperBox, ContentBox } from '../../styles/boardDetail'
import { Button } from '@mui/material'

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
               <img src={process.env.REACT_APP_API_URL + img.img} width={'400px'}></img>
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
      <Wrap>
         {product && (
            <Container>
               <SwiperBox>
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
               </SwiperBox>
               <ContentBox>
                  <h1>{product.title}</h1>
                  <p>
                     {product.Category.categoryName} / 등록일 : {product.createdAt.substr(0, 10)}
                  </p>
                  <p>가격 : {product.price.toLocaleString()}원</p>
                  <p>물품상태 : {product.subContent}</p>
                  <div style={{ border: '1px solid silver', padding: '8px', marginTop: '10px' }}>
                     <p>{product.User.nick} 님이 판매중입니다.</p>
                     <p>가입일: {product.User.createdAt.substr(0, 10)}</p>
                  </div>
                  <p>{product.content}</p>
                  {isAuthenticated && product.User.id === user.id && (
                     <>
                        <Link to={`/board/edit/${product.id}`}>
                           <Button variant="contained" sx={{ mt: 1 }}>
                              수정
                           </Button>
                        </Link>
                        <Button variant="contained" onClick={() => onClickDelete(product.id)} sx={{ mt: 1, ml: 1 }}>
                           삭제
                        </Button>
                     </>
                  )}
                  {isAuthenticated && product.User.id !== user.id && (
                     <>
                        <Button variant="contained" disabled={product.status === '판매중' ? false : true} sx={{ mt: 1 }}>
                           <Link to={`/order`} state={{ product: product }} style={{ color: 'white' }}>
                              구매하기
                           </Link>
                        </Button>
                     </>
                  )}
               </ContentBox>
            </Container>
         )}
      </Wrap>
   )
}

export default BoardDetailPage
