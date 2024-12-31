import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserByIdThunk, fetchSellProductByUserIdThunk, fetchBuyProductByUserIdThunk } from '../../features/userSlice'
import { checkOrderThunk, sendOrderThunk, receiveOrderThunk } from '../../features/orderSlice'
import { Link, useParams } from 'react-router-dom'
import { Container, Wrap } from '../../styles/userDetail'

import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Button, Pagination, Stack } from '@mui/material'

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
         if (confirmed) dispatch(checkOrderThunk(id))
         else console.log('취소')
      },
      [dispatch]
   )
   const sendOrder = useCallback(
      (id) => {
         const confirmed = window.confirm('배송시작으로 변경하시겠습니까?')
         if (confirmed) dispatch(sendOrderThunk(id))
         else console.log('취소')
      },
      [dispatch]
   )
   const receiveOrder = useCallback(
      (id) => {
         const confirmed = window.confirm('배송완료로 변경하시겠습니까?')
         if (confirmed) dispatch(receiveOrderThunk(id))
      },
      [dispatch]
   )

   return (
      <Wrap>
         {user && (
            <Container>
               <p>{user.nick}님의 프로필 페이지</p>
               <p>가입일 : {user.createdAt.substr(0, 10)}</p>
               <div>
                  <Box sx={{ width: '100%' }}>
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
                                 <table>
                                    <tbody>
                                       <tr>
                                          <th>이미지</th>
                                          <th>카테고리</th>
                                          <th>제목</th>
                                          <th>가격</th>
                                          <th>판매상태</th>
                                          <th>주문상황</th>
                                          {nowUser != null && nowUser.id == id && <th>주문관리</th>}
                                       </tr>
                                       {sellProducts.map((pr) => (
                                          <tr key={pr.id}>
                                             <td>
                                                <Link to={`/board/detail/${pr.id}`}>
                                                   <img src={`${process.env.REACT_APP_API_URL}${pr.Images[0].img}`} height={'100px'} alt="이미지" />
                                                </Link>
                                             </td>
                                             <td>{pr.Category.categoryName}</td>
                                             <td>
                                                <Link to={`/board/detail/${pr.id}`}>{pr.title}</Link>
                                             </td>
                                             <td>{pr.price.toLocaleString()}</td>
                                             <td>{pr.status}</td>
                                             <td>{pr.Order?.status}</td>
                                             {nowUser != null && nowUser.id == id && (
                                                <>
                                                   {pr.status == '판매중' && <td></td>}

                                                   {pr.Order?.status == '결제완료' && (
                                                      <td>
                                                         <Button onClick={() => checkOrder(pr.Order.id)}>상품준비</Button>
                                                      </td>
                                                   )}
                                                   {pr.Order?.status == '상품준비중' && (
                                                      <td>
                                                         <Button onClick={() => sendOrder(pr.Order.id)}>배송시작</Button>
                                                      </td>
                                                   )}
                                                   {pr.Order?.status == '배송중' && (
                                                      <td>
                                                         <Button onClick={() => receiveOrder(pr.Order.id)}>배송완료</Button>
                                                      </td>
                                                   )}
                                                   {pr.Order?.status == '배송완료' && <td>배송완료</td>}
                                                </>
                                             )}
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
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
                                       <table>
                                          <tbody>
                                             <tr>
                                                <th>이미지</th>
                                                <th>판매상품</th>
                                                <th>배송지</th>
                                                <th>연락처</th>
                                                <th>주문상황</th>
                                             </tr>
                                             {buyProducts.map((pr) => (
                                                <tr key={pr.id}>
                                                   <td>
                                                      <Link to={`/board/detail/${pr.id}`}>
                                                         <img src={`${process.env.REACT_APP_API_URL}${pr.Product.Images[0].img}`} height={'100px'} alt="이미지" />
                                                      </Link>
                                                   </td>
                                                   <td>{pr.Product.title}</td>
                                                   <td>{pr.address}</td>
                                                   <td>{pr.phone}</td>
                                                   <td>{pr.status}</td>
                                                </tr>
                                             ))}
                                          </tbody>
                                       </table>
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
