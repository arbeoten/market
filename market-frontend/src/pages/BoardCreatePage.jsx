import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createProductThunk } from '../features/boardSlice'
import BoardReg from '../components/board/BoardReg'

const BoardCreatePage = () => {
   const dispatch = useDispatch()
   const handleSubmit = useCallback(
      (productData) => {
         dispatch(createProductThunk(productData))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 에러', error)
               alert('게시물 등록 실패', error)
            })
      },
      [dispatch]
   )
   return (
      <>
         <h1>게시물 등록</h1>
         <BoardReg onSubmit={handleSubmit}></BoardReg>
      </>
   )
}

export default BoardCreatePage
