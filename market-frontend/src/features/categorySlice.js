import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createCategory, getCategorys, deleteCategory } from '../api/marketApi'

// 카테고리 등록 thunk
export const createCategoryThunk = createAsyncThunk('category/createCategory', async (categoryData, { rejectWithValue }) => {
   try {
      const response = await createCategory(categoryData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카테고리 등록 실패')
   }
})

// 전체 카테고리 호출 thunk
export const fetchCategorysThunk = createAsyncThunk('category/fetchCategorys', async (_, { rejectWithValue }) => {
   try {
      const response = await getCategorys()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '전체 카테고리 호출 실패')
   }
})

// 카테고리 삭제 thunk
export const deleteCategorysThunk = createAsyncThunk('category/deleteCategorys', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteCategory(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '카테고리 삭제 실패')
   }
})

const categorySlice = createSlice({
   name: 'category',
   initialState: {
      categorys: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 카테고리 등록
      builder
         .addCase(createCategoryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createCategoryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createCategoryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 전체 카테고리 호출
      builder
         .addCase(fetchCategorysThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCategorysThunk.fulfilled, (state, action) => {
            state.loading = false
            state.categorys = action.payload.categorys
         })
         .addCase(fetchCategorysThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 카테고리 삭제
      builder
         .addCase(deleteCategorysThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteCategorysThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteCategorysThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default categorySlice.reducer
