import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: null,
};

const generalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      state.loggedUser = action.payload;
    },
  },
});

export const { setLoggedUser } = generalSlice.actions;
export default generalSlice.reducer;
