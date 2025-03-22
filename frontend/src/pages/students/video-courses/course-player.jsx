import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllVideoCourses, updateCourseProgress } from '@/redux/slice/video-courses';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const dispatch = useDispatch();
  const courses = useSelector(selectAllVideoCourses);
  const currentCourse = courses.find(course => course.id === parseInt(courseId));
  const lessons = currentCourse?.videoLessons || [];

  const handleLessonComplete = () => {
    if (!currentCourse) return;
    
    const updatedLessons = [...lessons];
    updatedLessons[activeLesson].completed = true;
    
    // Calculate overall progress
    const completedCount = updatedLessons.filter(lesson => lesson.completed).length;
    const progress = Math.round((completedCount / lessons.length) * 100);
    
    // Update course progress
    dispatch(updateCourseProgress({ 
      courseId: currentCourse.id, 
      progress 
    }));

    // Move to next lesson if available
    if (activeLesson < lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    }
  };

  if (!currentCourse) return <div className="p-4">Course not found</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar with lessons */}
      <div className="w-1/4 bg-white p-4 overflow-y-auto border-r">
        <h2 className="text-xl font-bold mb-4">{currentCourse.title}</h2>
        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`p-3 rounded cursor-pointer ${
                index === activeLesson
                  ? 'bg-blue-100 text-blue-700'
                  : lesson.completed
                  ? 'bg-green-50 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveLesson(index)}
            >
              <h3 className="font-medium">{lesson.title}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">{lesson.duration}</p>
                {lesson.completed && (
                  <span className="text-green-600 text-sm">✓ Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Video player */}
          <div className="aspect-w-16 aspect-h-9 bg-black mb-4">
            <iframe
              src={lessons[activeLesson]?.videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>

          {/* Lesson information */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">
              {lessons[activeLesson]?.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {lessons[activeLesson]?.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Lesson {activeLesson + 1} of {lessons.length}
              </div>
              <button
                onClick={handleLessonComplete}
                className={`px-4 py-2 rounded ${
                  lessons[activeLesson]?.completed
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {lessons[activeLesson]?.completed ? 'Completed' : 'Complete Lesson'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
