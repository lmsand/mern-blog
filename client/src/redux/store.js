import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' // changed name

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})
