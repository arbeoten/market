import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'
import userReducer from '../features/userSlice'
import orderReducer from '../features/orderSlice'
import categoryReducer from '../features/categorySlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
      order: orderReducer,
      category: categoryReducer,
   },
})

export default store
