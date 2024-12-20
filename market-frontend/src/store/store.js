import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'
import myPageReducer from '../features/myPageSlice'
import orderReducer from '../features/orderSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      board: boardReducer,
      myPage: myPageReducer,
      order: orderReducer,
   },
})

export default store
