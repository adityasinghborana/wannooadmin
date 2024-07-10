import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface isAdminState {
    isAdmin: boolean
}

const initialState: isAdminState = {
    isAdmin: false,
}

export const isAdminSlice = createSlice({
    name: 'isAdmin',
    initialState,
    reducers: {
        CheckIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { CheckIsAdmin } = isAdminSlice.actions

export default isAdminSlice.reducer