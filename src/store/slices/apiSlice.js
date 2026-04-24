import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('api/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!response.ok) {
      throw new Error('Failed to fetch API data')
    }

    return await response.json()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Unexpected API error')
  }
})

const initialState = {
  status: 'idle',
  data: [],
  error: null,
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message || 'Failed to fetch data'
      })
  },
})

export const selectApiStatus = (state) => state.api.status
export const selectApiData = (state) => state.api.data
export const selectApiError = (state) => state.api.error

export default apiSlice.reducer
