import { useCallback, useEffect, useState } from 'react'
import { Container, Wrap } from '../styles/input'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategorysThunk, createCategoryThunk } from '../features/categorySlice'
import { TextField, Button } from '@mui/material'

const AdminPage = ({ user, isAuthenticated }) => {
   // 잘못된 경로 접근시 홈으로
   useEffect(() => {
      if (user?.id !== 1) window.location.href = '/'
   }, [])

   const [category, setCategory] = useState('')
   const dispatch = useDispatch()
   const { categorys } = useSelector((state) => state.category)

   useEffect(() => {
      dispatch(fetchCategorysThunk())
   }, [dispatch])

   const handleInputCategory = useCallback(() => {
      if (!category.trim()) {
         alert('데이터가 비어있습니다.')
      }
      dispatch(createCategoryThunk({ category }))
         .unwrap()
         .then(() => {
            dispatch(fetchCategorysThunk())
         })
         .catch((error) => {
            console.error('카테고리 등록 에러 :', error)
         })
   }, [dispatch, category])

   return (
      <Wrap>
         {user && categorys && (
            <Container>
               <p>현재 카테고리 </p>
               {categorys.length > 0 ? (
                  categorys.map((ct) => (
                     <p>
                        {ct.id}. {ct.categoryName}
                     </p>
                  ))
               ) : (
                  <p>없음</p>
               )}
               <p>카테고리 등록 </p>
               <TextField label="카테고리명" variant="outlined" type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ m: 1 }} />
               <Button style={{ width: '200px', margin: '10px auto' }} variant="contained" onClick={handleInputCategory} sx={{ mt: 2 }}>
                  등록하기
               </Button>
            </Container>
         )}
      </Wrap>
   )
}

export default AdminPage
