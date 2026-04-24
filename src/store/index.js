import { configureStore } from '@reduxjs/toolkit'
import formReducer from './slices/formSlice'
import apiReducer from './slices/apiSlice'

export const store = configureStore({
  reducer: {
    form: formReducer,
    api: apiReducer,
  },
})
