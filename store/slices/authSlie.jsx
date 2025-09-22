import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unVerifideUser: {},
};

const generalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUnVerifideUser(state, action) { state.unVerifideUser = action.payload; },
  },
});

export const { setUnVerifideUser } = generalSlice.actions;
export default generalSlice.reducer;
