import { createSlice } from '@reduxjs/toolkit'
import profileData from '../data/profileData.json'

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileData,
  reducers: {}
})

export default profileSlice.reducer
