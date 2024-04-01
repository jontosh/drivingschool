import adminSlice from "@/redux/slice/admin-slice.jsx";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admins: adminSlice,
  },
});
