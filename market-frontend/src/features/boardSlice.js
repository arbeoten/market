import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../api/marketApi'

// 게시물 등록 thunk
export const createProductThunk = createAsyncThunk('board/createProduct', async (productData, { rejectWithValue }) => {
   try {
      const response = await createProduct(productData)
      return response.data.product
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 등록 실패')
   }
})

// 게시물 호출 thunk
export const fetchProductsThunk = createAsyncThunk('board/fetchProducts', async ({ page, keyword }, { rejectWithValue }) => {
   try {
      const response = await getProducts({ page, keyword })
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 특정 게시물 호출 thunk
export const fetchProductByIdThunk = createAsyncThunk('board/fetchProductById', async (id, { rejectWithValue }) => {
   try {
      const response = await getProductById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 불러오기 실패')
   }
})

// 게시물 수정
export const updateProductThunk = createAsyncThunk('board/updateProduct', async (data, { rejectWithValue }) => {
   try {
      const { id, productData } = data
      const response = await updateProduct(id, productData)
      return response.data.product
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
   }
})

// 게시물 삭제
export const deleteProductThunk = createAsyncThunk('board/deleteProduct', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deleteProduct(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      products: [],
      product: null,
      pagination: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 게시물 등록
      builder
         .addCase(createProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createProductThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 호출
      builder
         .addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProductsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.pagination = action.payload.pagination
         })
         .addCase(fetchProductsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 특정 게시물 불러오기
      builder
         .addCase(fetchProductByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload.product
         })
         .addCase(fetchProductByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 삭제
      builder
         .addCase(deleteProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 게시물 수정
      builder
         .addCase(updateProductThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateProductThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateProductThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
