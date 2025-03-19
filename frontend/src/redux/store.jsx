import { APIRequest } from "@/redux/query/index.jsx";
import accountManagementSlice from "@/redux/slice/account-management-slice.jsx";
import adminSlice from "@/redux/slice/admin-slice.jsx";
import filterSlice from "@/redux/slice/filter-slice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { videoCoursesReducer } from "@/redux/slice/video-courses.jsx";

export const store = configureStore({
  reducer: {
    videoCourses: videoCoursesReducer,
    admins: adminSlice,
    filter: filterSlice,
    account_management: accountManagementSlice,
    [APIRequest.reducerPath]: APIRequest.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APIRequest.middleware),
});

setupListeners(store.dispatch);
