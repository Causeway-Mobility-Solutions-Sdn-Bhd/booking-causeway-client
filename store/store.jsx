import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/generalSlice';
import reservationReducer from './slices/reservationSlice';
import authReducer from './slices/authSlie';
import { reservationApi } from './api/reservationApiSlice';

export const store = configureStore({
  reducer: {
    general: generalReducer,
    reservation: reservationReducer,
    auth: authReducer,
    [reservationApi.reducerPath]: reservationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reservationApi.middleware), 
  devTools: process.env.NODE_ENV !== 'production',
});
