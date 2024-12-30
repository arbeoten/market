import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Stack } from '@mui/material'
import { fetchProductsThunk } from '../../features/boardSlice'
import { Link, useSearchParams } from 'react-router-dom'
import { Container, Table } from '../../styles/home'

const BoardListItem = ({ isAuthenticated, user }) => {
   const [query, setQuery] = useSearchParams('')
   let keyword = query.get('keyword')
   if (keyword == null) keyword = ''
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { products, pagination, loading, error } = useSelector((state) => state.board)
   useEffect(() => {
      dispatch(fetchProductsThunk({ page, keyword }))
   }, [dispatch, page, keyword])

   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   return (
      <>
         {products && products.length > 0 ? (
            <Container>
               <Table>
                  <tbody>
                     <tr>
                        <th>이미지</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>판매자</th>
                        <th>판매상태</th>
                     </tr>
                     {products.map((pr) =>
                        pr.status !== '판매중' ? (
                           <tr key={pr.id}>
                              <td>
                                 <Link to={`/board/detail/${pr.id}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}${pr.Images[0].img}`} height={'100px'} alt="이미지" style={{ filter: 'grayscale(100%)' }} />
                                 </Link>
                              </td>
                              <td>
                                 <s>{pr.Category.categoryName}</s>
                              </td>
                              <td>
                                 <s>
                                    <Link to={`/board/detail/${pr.id}`}>{pr.title}</Link>
                                 </s>
                              </td>
                              <td>
                                 <s>{pr.price.toLocaleString()}</s>
                              </td>
                              <td>
                                 <Link to={`/user/${pr.User.id}`}>{pr.User.nick}</Link>
                              </td>
                              <td style={{ color: 'blue' }}>{pr.status}</td>
                           </tr>
                        ) : (
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
                              <td>
                                 <Link to={`/user/${pr.User.id}`}>{pr.User.nick}</Link>
                              </td>
                              <td>{pr.status}</td>
                           </tr>
                        )
                     )}
                  </tbody>
               </Table>
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지
                     page={page} // 현재 페이지
                     onChange={handlePageChange} // 페이지 변경 함수
                  />
               </Stack>
            </Container>
         ) : (
            !loading && <Container>게시물이 없습니다.</Container>
         )}
      </>
   )
}
export default BoardListItem
