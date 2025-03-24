import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideoCourses, updateCourseProgress, selectAllVideoCourses, selectVideoCoursesStatus, selectVideoCoursesError } from '@/redux/slice/video-courses';
import { Card, Col, Row, Spin, Empty, Button, Progress, Typography, List } from 'antd';
import { PlayCircleOutlined, BookOutlined, ClockCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

const VideoCourses = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const courses = useSelector(selectAllVideoCourses);
  const status = useSelector(selectVideoCoursesStatus);
  const error = useSelector(selectVideoCoursesError);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (status === 'idle' && studentId) {
      dispatch(fetchVideoCourses(studentId));
    }
  }, [status, dispatch, studentId]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="text-center">
              <p className="text-lg mb-4">{error}</p>
              <Button type="primary" onClick={() => dispatch(fetchVideoCourses(studentId))}>
                Refresh
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="text-center">
              <p className="text-lg mb-4">You don't have any video courses yet</p>
              <Button type="primary" onClick={() => dispatch(fetchVideoCourses(studentId))}>
                Refresh
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedVideo(course.lessons > 0 ? course.videoUrl : null);
    setActiveLesson(0);
  };

  const handleLessonSelect = (index, videoUrl) => {
    setActiveLesson(index);
    setSelectedVideo(videoUrl);
  };

  const handleUpdateProgress = (courseId, progress) => {
    dispatch(updateCourseProgress({ studentId, courseId, progress }));
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'text-green-600',
      INACTIVE: 'text-red-600',
      INCOMING: 'text-blue-600'
    };
    return colors[status] || 'text-gray-600';
  };

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">Video Courses</Title>
      <Row gutter={[16, 16]}>
        {!selectedCourse ? (
          // Course selection view
          courses.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="h-full cursor-pointer"
                onClick={() => handleCourseSelect(course)}
                cover={
                  <div className="relative">
                    <img
                      alt={course.title}
                      src={course.thumbnail}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <PlayCircleOutlined className="text-4xl text-white" />
                    </div>
                  </div>
                }
              >
                <div className="mb-4">
                  <Title level={4} className="mb-2">{course.title}</Title>
                  <Text type="secondary">{course.description}</Text>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <BookOutlined />
                      <Text>{course.lessons} lessons</Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockCircleOutlined />
                      <Text>{course.duration}</Text>
                    </div>
                  </div>
                  <Text className={getStatusColor(course.status)}>{course.status}</Text>
                </div>

                <Progress
                  percent={course.progress}
                  size="small"
                  status={course.progress === 100 ? "success" : "active"}
                  format={(percent) => `${percent}% completed`}
                />
              </Card>
            </Col>
          ))
        ) : (
          // Video player and lessons view
          <>
            <Col xs={24} md={6}>
              <Card className="h-full">
                <Title level={4} className="mb-4">Lessons</Title>
                <Button
                  type="link"
                  className="mb-4 px-0"
                  onClick={() => setSelectedCourse(null)}
                >
                  ← Back to Courses
                </Button>
                <List
                  dataSource={Array(selectedCourse.lessons).fill().map((_, i) => ({
                    title: `Lesson ${i + 1} - ${selectedCourse.title}`,
                    videoUrl: selectedCourse.videoUrl,
                    isCompleted: i < 4 // First 4 lessons are marked as completed
                  }))}
                  renderItem={(item, index) => (
                    <List.Item
                      className={`cursor-pointer hover:bg-gray-100 p-2 rounded ${activeLesson === index ? 'bg-gray-100' : ''}`}
                      onClick={() => handleLessonSelect(index, item.videoUrl)}
                    >
                      <div className="flex items-center gap-2 w-full justify-between">
                        <div className="flex items-center gap-2">
                          <PlayCircleOutlined />
                          <Text>{item.title}</Text>
                        </div>
                        {item.isCompleted && (
                          <CheckCircleFilled className="text-green-500" />
                        )}
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={18}>
              <Card>
                {selectedVideo ? (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedVideo}
                      title={selectedCourse.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <Empty description="No video selected" />
                )}
                <div className="mt-4">
                  <Title level={4}>{selectedCourse.title}</Title>
                  <Text type="secondary">{selectedCourse.description}</Text>
                  <Progress
                    percent={selectedCourse.progress}
                    className="mt-4"
                    status={selectedCourse.progress === 100 ? "success" : "active"}
                    format={(percent) => `${percent}% completed`}
                    onChange={(value) => handleUpdateProgress(selectedCourse.id, value)}
                  />
                </div>
                {/* button end lessons */}
                {selectedCourse && (
                  <div className="mt-4">
                    <Button type="primary" onClick={() => handleUpdateProgress(selectedCourse.id, 100)}>
                      Mark Course as Completed
                    </Button>
                  </div>
                )}
              </Card>
            </Col>

          </>
        )}
      </Row>

    </div>
  );
};

export default VideoCourses;
