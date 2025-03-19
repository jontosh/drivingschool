import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIRequest } from '@/redux/query';

export const fetchVideoCourses = createAsyncThunk(
  'videoCourses/fetchVideoCourses',
  async () => {
    try {
      const response = await APIRequest.get('/video-courses');
      return response.data;
    } catch (error) {
      throw new Error('You don\'t have any video courses');
    }
  }
);

const videoCoursesSlice = createSlice({
  name: 'videoCourses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideoCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchVideoCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const videoCoursesReducer = videoCoursesSlice.reducer;
export const selectAllVideoCourses = (state) => state.videoCourses.courses;
export const selectVideoCoursesStatus = (state) => state.videoCourses.status;
export const selectVideoCoursesError = (state) => state.videoCourses.error;
