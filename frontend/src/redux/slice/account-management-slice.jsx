import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: [],
  highSchool: [],
  howDidYouHear: [],
  vehicles: [],
};

const accountManagementSlice = createSlice({
  name: "account-management-slice",
  initialState,
  reducers: {
    AccountManagementLocation(state, action) {
      state.location = action.payload.data;
    },
    AccountManagementHighSchool(state, action) {
      state.highSchool = action.payload.data;
    },
    AccountManagementHowDidYour(state, action) {
      state.howDidYouHear = action.payload.data;
    },
    AccountManagementVehicles(state, action) {
      state.vehicles = action.payload.data;
    },
  },
});

export const {
  AccountManagementHighSchool,
  AccountManagementHowDidYour,
  AccountManagementLocation,
  AccountManagementVehicles,
} = accountManagementSlice.actions;
export default accountManagementSlice.reducer;
