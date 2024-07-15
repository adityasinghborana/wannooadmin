import { createSlice } from '@reduxjs/toolkit'

export interface VendorState {
  Vendors: any[]
}

const initialState: VendorState = {
    Vendors: [],
}

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
      addVendors: (state, action)=>{
            state.Vendors = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { addVendors } = vendorSlice.actions

export default vendorSlice.reducer