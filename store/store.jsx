import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/generalSlice';
import reservationReducer from './slices/reservationSlice';
import authReducer from './slices/authSlie';


export const store = configureStore({
  reducer: {
    general: generalReducer,
    reservation: reservationReducer,
    auth : authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
