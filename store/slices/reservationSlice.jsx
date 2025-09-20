import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDifferentReturnLocation: false,
  selectedVehicleClasses: [],
  reservation: {},
  vehicleLoader: true,
  currency: "MYR",
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
} = reservationSlice.actions;

export default reservationSlice.reducer;
