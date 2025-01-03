import { useCallback, useEffect, useState } from 'react'
import { Container, Wrap } from '../styles/input'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategorysThunk, createCategoryThunk, deleteCategorysThunk } from '../features/categorySlice'
import { TextField, Button } from '@mui/material'

const AdminPage = ({ user, isAuthenticated }) => {
   // 잘못된 경로 접근시 홈으로
   useEffect(() => {
      if (user?.id !== 1) window.location.href = '/'
   }, [user?.id])

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

   const handleDeleteCategory = useCallback(
      (id) => {
         dispatch(deleteCategorysThunk(id))
            .then(() => {
               dispatch(fetchCategorysThunk())
            })
            .catch((error) => {
               console.error('카테고리 삭제 에러 :', error)
            })
      },
      [dispatch]
   )

   return (
      <Wrap>
         {user && categorys && (
            <Container>
               <p style={{ marginBottom: '20px' }}>현재 카테고리 </p>

               {categorys.length > 0 ? (
                  categorys.map((ct) => (
                     <div key={ct.id} style={{ margin: '5px', border: '1px solid silver', width: '240px' }}>
                        <p>
                           {ct.id}. {ct.categoryName}
                        </p>
                        <Button variant="contained" onClick={() => handleDeleteCategory(ct.id)}>
                           삭제
                        </Button>
                     </div>
                  ))
               ) : (
                  <p>없음</p>
               )}
               <p style={{ margin: '20px' }}>카테고리 등록 </p>
               <div style={{ width: '240px' }}>
                  <TextField fullWidth label="카테고리명" variant="outlined" type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                  <Button fullWidth variant="contained" onClick={handleInputCategory}>
                     등록하기
                  </Button>
               </div>
            </Container>
         )}
      </Wrap>
   )
}

export default AdminPage
