import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './features/user/userSlice'
import TourReducer from './features/tours/tourSlice'
import vendorReducer from './features/vendors/vendorSlice'
import isAdminReducer from './features/isAdmin/isAdminSlice'

export const createStore = () => {
  return configureStore({
    reducer: {
      user: UserReducer,
      tour: TourReducer,
      vendor: vendorReducer,
      CheckIsAdmin: isAdminReducer
    },
  })
}

export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']