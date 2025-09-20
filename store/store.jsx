import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/generalSlice';
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    reservation: reservationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
