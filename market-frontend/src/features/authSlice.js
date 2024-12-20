import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false, // 로그인 상태 저장
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {},
})

export default authSlice.reducer
