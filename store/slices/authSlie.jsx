import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logedUser: {},
};

const generalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogedUser(state, action) { state.logedUser = action.payload; },
  },
});

export const { setLogedUser } = generalSlice.actions;
export default generalSlice.reducer;
