import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserById } from '../api/marketApi'

// 유저 검색 thunk
export const fetchGetUserByIdThunk = createAsyncThunk('user/fetchGetUserById', async (id, { rejectWithValue }) => {
   try {
      const response = await getUserById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '유저 불러오기 실패')
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
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
   },
})

export default userSlice.reducer
