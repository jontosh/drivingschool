import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  filteredTeachers: [],
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    listOfTeachers(state, action) {
      state.teachers = action.payload;
    },

    filteredTeachers(state, action) {
      const search = action.payload.search;
      const data = action.payload.data;

      state.filteredTeachers = data?.filter((item) => {
        return item.first_name.toLowerCase().includes(search?.toLowerCase());
      });
    },
  },
});

export const { filteredTeachers, listOfTeachers } = filterSlice.actions;
export default filterSlice.reducer;
