import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TourState {
  Tours: any[]
}

const initialState: TourState = {
  Tours: [],
}

export const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
      addTours: (state, action)=>{
            state.Tours = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { addTours } = tourSlice.actions

export default tourSlice.reducer