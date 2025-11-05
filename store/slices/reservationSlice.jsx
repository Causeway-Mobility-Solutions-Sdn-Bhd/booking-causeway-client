import { createSlice } from "@reduxjs/toolkit";

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
  finalPayment : {},
  selectedPayment : "full",
  voucherCode : "",
  favorites : [],
  discountAmount : {}
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
    setFinalPayment(state, action) {
      state.finalPayment = action.payload;
    },
    setAllCurrencies(state, action) {
      state.allCurrencies = action.payload;
    },
    setSelectedPayment(state, action) {
      state.selectedPayment = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setVoucherCode(state, action) {
      state.voucherCode = action.payload;
    },
    setDiscountAmount(state, action) {
      state.discountAmount = action.payload;
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
  setFinalPayment,
  setAllCurrencies,
  setSelectedPayment,
  setFavorites,
  setVoucherCode,
  setDiscountAmount
} = reservationSlice.actions;

export default reservationSlice.reducer;
