import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logedUser: {},
};

const generalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogedUserUser(state, action) { state.unVerifideUser = action.payload; },
  },
});

export const { setLogedUserUser } = generalSlice.actions;
export default generalSlice.reducer;
