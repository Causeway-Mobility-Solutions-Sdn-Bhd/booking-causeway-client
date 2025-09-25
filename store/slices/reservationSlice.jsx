import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState = {
  isDifferentReturnLocation: false,
  selectedVehicleClasses: [],
  reservation: {},
  vehicleLoader: true,
  currency: "myr",
  allCurrencies: [],
  currentUUID: "",
  selectedVehicle: {},
  additionalCharges: [],
  selectedAdditionalCharges: [],
  finalPaymentLink : "",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setIsDifferentReturnLocation(state, action) {
      state.isDifferentReturnLocation = action.payload;
    },
    setSelectedVehicleClasses(state, action) {
      state.selectedVehicleClasses = action.payload;
    },
    setReservation(state, action) {
      state.reservation = action.payload;
    },

    setVehicleLoader(state, action) {
      state.vehicleLoader = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setCurrentUUID(state, action) {
      state.currentUUID = action.payload;
    },
    setSelectedVehicle(state, action) {
      state.selectedVehicle = action.payload;
    },
    setAdditionalCharges(state, action) {
      state.additionalCharges = action.payload;
    },
    setSelectedAdditionalCharges(state, action) {
      state.selectedAdditionalCharges = action.payload;
    },
    setFinalPaymentLink(state, action) {
      state.finalPaymentLink = action.payload;
    },
    setAllCurrencies(state, action) {
      state.allCurrencies = action.payload;
    }
  },
});

export const {
  setIsDifferentReturnLocation,
  setSelectedVehicleClasses,
  setReservation,
  setVehicleLoader,
  setCurrency,
  setCurrentUUID,
  setSelectedVehicle,
  setAdditionalCharges,
  setSelectedAdditionalCharges,
  setFinalPaymentLink,
  setAllCurrencies,
} = reservationSlice.actions;

export default reservationSlice.reducer;
