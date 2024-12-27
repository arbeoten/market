import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'
import userReducer from '../features/userSlice'
import orderReducer from '../features/orderSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
      order: orderReducer,
   },
})

export default store
