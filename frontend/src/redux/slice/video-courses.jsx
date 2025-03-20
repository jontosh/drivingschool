import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIRequest } from '@/redux/query';

// Mock data
const mockCourses = [
  {
    id: 1,
    title: "Traffic Rules Basics",
    description: "Learn the fundamental traffic rules and regulations for safe driving",
    thumbnail: "https://img.freepik.com/free-vector/traffic-rules-concept-illustration_114360-1013.jpg",
    videoUrl: "https://player.vimeo.com/video/1066078064",
    duration: "2:15:30",
    lessons: 12,
    progress: 45,
    status: "ACTIVE"
  },
  {
    id: 2,
    title: "Car Control Techniques",
    description: "Master essential car control techniques for various driving conditions",
    thumbnail: "https://img.freepik.com/free-vector/driving-school-illustration_23-2148646195.jpg",
    videoUrl: "https://player.vimeo.com/video/1066078064",
    duration: "1:45:00",
    lessons: 8,
    progress: 0,
    status: "INCOMING"
  },
  {
    id: 3,
    title: "Defensive Driving",
    description: "Learn how to anticipate and avoid dangerous situations on the road",
    thumbnail: "https://img.freepik.com/free-vector/driving-school-concept-illustration_114360-8164.jpg",
    videoUrl: "https://player.vimeo.com/video/1066078064",
    duration: "3:00:00",
    lessons: 15,
    progress: 80,
    status: "ACTIVE"
  }
];

export const fetchVideoCourses = createAsyncThunk(
  'videoCourses/fetchVideoCourses',
  async (studentId) => {
    try {
      // Mock API call - In production, replace with actual API call
      // const response = await APIRequest.get(`/api/students/${studentId}/video-courses`);
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCourses);
        }, 1000);
      });
    } catch (error) {
      throw new Error("Failed to fetch video courses");
    }
  }
);

export const updateCourseProgress = createAsyncThunk(
  'videoCourses/updateProgress',
  async ({ studentId, courseId, progress }) => {
    try {
      // Mock API call - In production, replace with actual API call
      // const response = await APIRequest.put(`/api/students/${studentId}/video-courses/${courseId}/progress`, { progress });
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ courseId, progress });
        }, 500);
      });
    } catch (error) {
      throw new Error("Failed to update course progress");
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
      })
      .addCase(updateCourseProgress.fulfilled, (state, action) => {
        const { courseId, progress } = action.payload;
        const course = state.courses.find(c => c.id === courseId);
        if (course) {
          course.progress = progress;
        }
      });
  }
});

export const videoCoursesReducer = videoCoursesSlice.reducer;
export const selectAllVideoCourses = (state) => state.videoCourses.courses;
export const selectVideoCoursesStatus = (state) => state.videoCourses.status;
export const selectVideoCoursesError = (state) => state.videoCourses.error;
