import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  submittedData: null,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.submittedData = action.payload
    },
    clearFormData: (state) => {
      state.submittedData = null
    },
  },
})

export const { saveFormData, clearFormData } = formSlice.actions

export const selectSubmittedFormData = (state) => state.form.submittedData

export default formSlice.reducer
