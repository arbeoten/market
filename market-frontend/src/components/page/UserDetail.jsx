import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserByIdThunk, fetchSellProductByUserIdThunk, fetchBuyProductByUserIdThunk } from '../../features/userSlice'
import { checkOrderThunk, sendOrderThunk, receiveOrderThunk } from '../../features/orderSlice'
import { Link, useParams } from 'react-router-dom'
import { Container, Wrap, CardContainer, OrderBt } from '../../styles/userDetail'

import { Card, CardMedia, CardContent, Typography, Pagination, Stack, Box, Tab, Tabs, CardActions } from '@mui/material'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const UserPageDetail = ({ isAuthenticated, nowUser }) => {
   // 탭구현
   function CustomTabPanel(props) {
      const { children, value, index, ...other } = props

      return (
         <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
         </div>
      )
   }

   CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
   }

   function a11yProps(index) {
      return {
         id: `simple-tab-${index}`,
         'aria-controls': `simple-tabpanel-${index}`,
      }
   }

   const [value, setValue] = useState(0)
   const handleChange = (event, newValue) => {
      setValue(newValue)
   }
   // 탭구현 종료

   const { id } = useParams()
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const { buyProducts, sellProducts, user, buyPagination, sellPagination, loading, error } = useSelector((state) => state.user)
   useEffect(() => {
      dispatch(fetchGetUserByIdThunk(id))
   }, [dispatch, id])

   // 판매상품
   useEffect(() => {
      dispatch(fetchSellProductByUserIdThunk({ page, id }))
   }, [dispatch, id, page])

   const handleSellPageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   // 구매상품
   useEffect(() => {
      dispatch(fetchBuyProductByUserIdThunk({ page, id }))
   }, [dispatch, id, page])

   const handleBuyPageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   const checkOrder = useCallback(
      (id) => {
         const confirmed = window.confirm('상품준비중으로 변경하시겠습니까?')
         if (confirmed) {
            dispatch(checkOrderThunk(id))
               .unwrap()
               .then(() => window.location.reload())
         } else console.log('취소')
      },
      [dispatch]
   )
   const sendOrder = useCallback(
      (id) => {
         const confirmed = window.confirm('배송시작으로 변경하시겠습니까?')
         if (confirmed)
            dispatch(sendOrderThunk(id))
               .unwrap()
               .then(() => window.location.reload())
         else console.log('취소')
      },
      [dispatch]
   )
   const receiveOrder = useCallback(
      (id) => {
         const confirmed = window.confirm('배송완료로 변경하시겠습니까?')
         if (confirmed)
            dispatch(receiveOrderThunk(id))
               .unwrap()
               .then(() => window.location.reload())
      },
      [dispatch]
   )

   return (
      <Wrap>
         {user && (
            <Container>
               <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{user.nick}</p>
               <p>가입일 {user.createdAt.substr(0, 10)}</p>
               <div>
                  <Box sx={{ width: '920px' }}>
                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                           <Tab label="판매상품" {...a11yProps(0)} />
                           <Tab label="주문내역" {...a11yProps(1)} />
                        </Tabs>
                     </Box>
                     {/* 판매관리 */}
                     <CustomTabPanel value={value} index={0}>
                        {sellProducts && sellProducts.length < 1 ? (
                           <p>판매 상품이 없습니다.</p>
                        ) : (
                           sellPagination && (
                              <>
                                 <CardContainer>
                                    {sellProducts.map((pr) => (
                                       <Card style={{ margin: '10px', width: '30%', border: '1px solid rgb(230, 230, 230)', borderRadius: '0', padding: '0' }} key={pr.id} sx={{ boxShadow: 0 }}>
                                          <Link to={`/board/detail/${pr.id}`}>
                                             <CardMedia sx={{ height: 240 }} image={`${process.env.REACT_APP_API_URL}${pr.Images[0].img}`} title={pr.title} />
                                             <CardContent>
                                                <Typography>{pr.title} </Typography>
                                                <Typography sx={{ fontWeight: 'bold' }}>{pr.price.toLocaleString()} 원</Typography>
                                                <Typography>{dayjs(pr.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                                <Typography>{pr.status}</Typography>
                                             </CardContent>
                                          </Link>
                                          {nowUser != null && nowUser.id == id && (
                                             <CardActions style={{ borderTop: '1px solid silver' }}>
                                                <p style={{ fontWeight: 'bold', lineHeight: '40px' }}>{pr.Order?.status || '구매대기중'}</p>
                                                {pr.Order?.status === '결제완료' && <OrderBt onClick={() => checkOrder(pr.Order?.id)}>주문확인</OrderBt>}
                                                {pr.Order?.status === '상품준비중' && <OrderBt onClick={() => sendOrder(pr.Order?.id)}>배송출발</OrderBt>}
                                                {pr.Order?.status === '배송중' && <OrderBt onClick={() => receiveOrder(pr.Order?.id)}>배송완료</OrderBt>}
                                             </CardActions>
                                          )}
                                       </Card>
                                    ))}
                                 </CardContainer>
                                 <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                                    <Pagination
                                       count={sellPagination.totalPages} // 총 페이지
                                       page={page} // 현재 페이지
                                       onChange={handleSellPageChange} // 페이지 변경 함수
                                    />
                                 </Stack>
                              </>
                           )
                        )}
                     </CustomTabPanel>
                     {/* 주문상품 */}
                     <CustomTabPanel value={value} index={1}>
                        {nowUser != null && nowUser.id == id ? (
                           <>
                              {buyProducts && buyProducts.length < 1 ? (
                                 <p>주문 내역이 없습니다.</p>
                              ) : (
                                 buyPagination && (
                                    <>
                                       {buyProducts.map((pr) => (
                                          <div key={pr.id} style={{ border: '1px solid silver', padding: '8px', marginBottom: '15px' }}>
                                             <p style={{ padding: '10px' }}>{dayjs(pr.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                                             {pr.Product ? (
                                                <Link to={`/board/detail/${pr.id}`}>
                                                   <div style={{ display: 'flex' }}>
                                                      <img src={`${process.env.REACT_APP_API_URL}${pr.Product?.Images[0].img}`} height={'120px'} alt="이미지" style={{ margin: '4px 4px 8px 8px' }} />
                                                      <div>
                                                         <p style={{ margin: '0 0 5px 5px' }}>
                                                            {pr.Product?.title} / {pr.Product?.price.toLocaleString()} 원
                                                         </p>
                                                         <p style={{ margin: '5px' }}>{pr.address}</p>
                                                         <p style={{ margin: '5px' }}>{pr.name}님</p>
                                                         <p style={{ margin: '15px 0 0 8px', fontWeight: 'bold' }}>{pr.status}</p>
                                                      </div>
                                                   </div>
                                                </Link>
                                             ) : (
                                                <p style={{ margin: '10px' }}>삭제된 상품입니다. 관리자에게 문의하세요 (주문번호 : {pr.id})</p>
                                             )}
                                          </div>
                                       ))}

                                       <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                                          <Pagination
                                             count={buyPagination.totalPages} // 총 페이지
                                             page={page} // 현재 페이지
                                             onChange={handleBuyPageChange} // 페이지 변경 함수
                                          />
                                       </Stack>
                                    </>
                                 )
                              )}
                           </>
                        ) : (
                           <>본인만 확인 가능한 페이지입니다.</>
                        )}
                     </CustomTabPanel>
                  </Box>
               </div>
            </Container>
         )}
      </Wrap>
   )
}

export default UserPageDetail
