import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const myPageSlice = createSlice({
   name: 'myPage',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default myPageSlice.reducer
