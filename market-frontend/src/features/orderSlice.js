import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder } from '../api/marketApi'

export const createOrderThunk = createAsyncThunk('order/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      const response = await createOrder(orderData)
      return response.data.order
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 실패')
   }
})

const orderSlice = createSlice({
   name: 'order',
   initialState: {
      user: null,
      order: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 주문등록
      builder
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            state.order = action.payload
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
