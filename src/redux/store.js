import { configureStore } from '@reduxjs/toolkit'
import userslice from './usersice.js'
export default configureStore({
  reducer: {
    user:userslice
  },
})