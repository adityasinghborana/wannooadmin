import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  Users: any[]
}

const initialState: UserState = {
  Users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      addUsers: (state, action)=>{
            state.Users = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { addUsers } = userSlice.actions

export default userSlice.reducer