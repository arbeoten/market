import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const orderSlice = createSlice({
   name: 'order',
   initialState: {
      user: null,
      product: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default orderSlice.reducer
