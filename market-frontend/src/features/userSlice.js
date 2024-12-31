import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserById, sellProductByUserId, buyProductByUserId } from '../api/marketApi'

// 유저 검색 thunk
export const fetchGetUserByIdThunk = createAsyncThunk('user/fetchGetUserById', async (id, { rejectWithValue }) => {
   try {
      const response = await getUserById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '유저 불러오기 실패')
   }
})

// 판매물품 thunk
export const fetchSellProductByUserIdThunk = createAsyncThunk('user/fetchSellProductByUserId', async ({ page, id }, { rejectWithValue }) => {
   try {
      const response = await sellProductByUserId({ page, id })
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '유저 불러오기 실패')
   }
})

// 구매물품 thunk
export const fetchBuyProductByUserIdThunk = createAsyncThunk('user/fetchBuyProductByUserId', async ({ page, id }, { rejectWithValue }) => {
   try {
      const response = await buyProductByUserId({ page, id })
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '유저 불러오기 실패')
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
      buyPagination: null,
      sellPagination: null,
      buyProducts: [],
      sellProducts: [],
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 유저 불러오기
      builder
         .addCase(fetchGetUserByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchGetUserByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
         })
         .addCase(fetchGetUserByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 판매물품
      builder
         .addCase(fetchSellProductByUserIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchSellProductByUserIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.sellProducts = action.payload.products
            state.sellPagination = action.payload.sellPagination
         })
         .addCase(fetchSellProductByUserIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 구매물품
      builder
         .addCase(fetchBuyProductByUserIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBuyProductByUserIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.buyProducts = action.payload.products
            state.buyPagination = action.payload.buyPagination
         })
         .addCase(fetchBuyProductByUserIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default userSlice.reducer
