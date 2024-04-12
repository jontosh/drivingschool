import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  superAdmins: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    ReplenishmentAdmin(state, action) {
      state.admins = action.payload;
    },
  },
});

export const { ReplenishmentAdmin } = adminSlice.actions;
export default adminSlice.reducer;
