import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      product: null,
      pagenation: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default boardSlice.reducer
