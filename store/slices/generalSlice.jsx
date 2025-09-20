import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  openBg: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSidebarOpen(state, action) { state.sidebarOpen = action.payload; },
    setOpenBg(state, action) { state.openBg = action.payload; },
  },
});

export const { setSidebarOpen, setOpenBg } = generalSlice.actions;
export default generalSlice.reducer;
