import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, checkOrder, sendOrder, receiveOrder } from '../api/marketApi'

export const createOrderThunk = createAsyncThunk('order/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      const response = await createOrder(orderData)
      return response.data.order
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 실패')
   }
})

export const checkOrderThunk = createAsyncThunk('order/checkOrder', async (id, { rejectWithValue }) => {
   try {
      const response = await checkOrder(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 확인 실패')
   }
})

export const sendOrderThunk = createAsyncThunk('order/sendOrder', async (id, { rejectWithValue }) => {
   try {
      const response = await sendOrder(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 확인 실패')
   }
})

export const receiveOrderThunk = createAsyncThunk('order/receiveOrder', async (id, { rejectWithValue }) => {
   try {
      const response = await receiveOrder(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문 확인 실패')
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
      // 주문check
      builder
         .addCase(checkOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkOrderThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(checkOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 주문send
      builder
         .addCase(sendOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(sendOrderThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(sendOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 주문receive
      builder
         .addCase(receiveOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(receiveOrderThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(receiveOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
