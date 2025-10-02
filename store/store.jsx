import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import generalReducer from "./slices/generalSlice";
import reservationReducer from "./slices/reservationSlice";
import authReducer from "./slices/authSlie";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    reservation: reservationReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
