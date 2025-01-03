import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteProductThunk, fetchProductByIdThunk } from '../../features/boardSlice'
import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Wrap, Container, SwiperBox, ContentBox, DetailBt } from '../../styles/boardDetail'

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
               <img src={process.env.REACT_APP_API_URL + img.img} width={'400px'} alt="상품이미지"></img>
            </SwiperSlide>
         )
      })

   // 게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchProductByIdThunk(id))
   }, [dispatch, id])
   const { product, loading, error } = useSelector((state) => state.board)

   const onClickDelete = useCallback(
      (id) => {
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
      },
      [dispatch]
   )

   if (error) console.log(error)

   return (
      <Wrap>
         {loading && <>Loading...</>}
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
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{product.title}</p>
                  <p>{product.Category?.categoryName}</p>
                  <p style={{ fontSize: '2.2em', fontWeight: 'bold' }}>{product.price.toLocaleString()}원</p>
                  <div style={{ border: '1px solid silver', padding: '8px', marginTop: '10px' }}>
                     <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                        <Link to={`/user/${product.User.id}`}>{product.User.nick}</Link>
                     </p>
                     <p>가입일: {product.User.createdAt.substr(0, 10)}</p>
                  </div>
                  <p>등록일 {product.createdAt.substr(0, 10)}</p>
                  <p>상품상태 {product.subContent}</p>
                  {isAuthenticated && product.User.id === user.id && (
                     <>
                        <Link to={`/board/edit/${product.id}`} state={{ redirectUrl: window.location.pathname || '/' }}>
                           <DetailBt variant="contained" style={{ marginLeft: '0' }}>
                              수정
                           </DetailBt>
                        </Link>
                        <DetailBt variant="contained" onClick={() => onClickDelete(product.id)} sx={{ mt: 1, ml: 1 }}>
                           삭제
                        </DetailBt>
                     </>
                  )}
                  {isAuthenticated && product.User.id !== user.id && (
                     <>
                        <Link to={`/order`} state={{ product: product }} style={{ color: 'white' }}>
                           {product.status === '판매중' && (
                              <DetailBt variant="contained" style={{ marginLeft: '0' }}>
                                 구매하기
                              </DetailBt>
                           )}
                        </Link>
                     </>
                  )}
                  {!isAuthenticated && (
                     <>
                        <Link to={`/login`} state={{ redirectUrl: window.location.pathname || '/' }} style={{ color: 'white' }}>
                           {product.status === '판매중' && (
                              <DetailBt variant="contained" style={{ marginLeft: '0' }}>
                                 구매하기
                              </DetailBt>
                           )}
                        </Link>
                     </>
                  )}
               </ContentBox>
               <div style={{ flexBasis: '100%', margin: '40px', padding: '10px', borderTop: '1px solid silver' }}>
                  <p style={{ marginBottom: '20px', fontSize: '1.1em' }}>상품소개</p>
                  <p>{product.content}</p>
               </div>
            </Container>
         )}
      </Wrap>
   )
}

export default BoardDetailPage
