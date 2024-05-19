import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const findStudentSlice = createSlice({
  name: "findStudentSlice",
  initialState,
  reducers: {
    FilterStudent(state, action) {
      const search = action.payload.search;
      const data = action.payload.data;
      const active = action.payload.active;

      state.items = data?.filter((item) => {
        return (
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.cell_phone.toLowerCase().includes(search.toLowerCase())
        );
      });
    },
  },
});

export const { FilterStudent } = findStudentSlice.actions;
export default findStudentSlice.reducer;
