import { APIRequest } from "@/redux/query/index.jsx";
import adminSlice from "@/redux/slice/admin-slice.jsx";
import findStudentSlice from "@/redux/slice/find-student-slice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    admins: adminSlice,
    findStudent: findStudentSlice,
    [APIRequest.reducerPath]: APIRequest.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APIRequest.middleware),
});

setupListeners(store.dispatch);
