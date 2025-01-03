import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardMedia, CardContent, Typography, Pagination, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { fetchProductsThunk } from '../../features/boardSlice'
import { Link, useSearchParams } from 'react-router-dom'
import { Container, Wrap } from '../../styles/home'

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
            <Wrap>
               <Container>
                  {products.map((pr) =>
                     pr.status === '판매중' ? (
                        <Card style={{ margin: '8px', width: '300px', border: '1px solid rgb(230, 230, 230)', borderRadius: '0', padding: '0' }} key={pr.id} sx={{ boxShadow: 0 }}>
                           <Link to={`/board/detail/${pr.id}`} style={{ padding: '0' }}>
                              <CardMedia sx={{ height: 240 }} image={`${process.env.REACT_APP_API_URL}${pr.Images[0].img}`} title={pr.title} />
                              <CardContent>
                                 <Typography>{pr.title} </Typography>
                                 <Typography sx={{ fontWeight: 'bold' }}>{pr.price.toLocaleString()} 원</Typography>
                                 <Typography>{pr.User.nick}</Typography>
                                 <Typography>{dayjs(pr.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                 <Typography>{pr.status}</Typography>
                              </CardContent>
                           </Link>
                        </Card>
                     ) : (
                        <Card style={{ margin: '8px', width: '300px', border: '1px solid rgb(230, 230, 230)', borderRadius: '0', padding: '0' }} key={pr.id} sx={{ boxShadow: 0 }}>
                           <Link to={`/board/detail/${pr.id}`}>
                              <CardMedia sx={{ height: 240 }} image={`${process.env.REACT_APP_API_URL}${pr.Images[0].img}`} title={pr.title} style={{ filter: 'grayscale(100%)' }} />
                              <CardContent>
                                 <Typography>
                                    <s>{pr.title}</s>
                                 </Typography>
                                 <Typography sx={{ fontWeight: 'bold' }}>
                                    <s>{pr.price.toLocaleString()} 원</s>
                                 </Typography>
                                 <Typography>{pr.User.nick}</Typography>
                                 <Typography>{dayjs(pr.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                 <Typography style={{ fontWeight: 'bold' }}>{pr.status}</Typography>
                              </CardContent>
                           </Link>
                        </Card>
                     )
                  )}
               </Container>
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지
                     page={page} // 현재 페이지
                     onChange={handlePageChange} // 페이지 변경 함수
                  />
               </Stack>
            </Wrap>
         ) : (
            !loading && <Wrap style={{ textAlign: 'center' }}>게시물이 없습니다.</Wrap>
         )}
      </>
   )
}
export default BoardListItem
