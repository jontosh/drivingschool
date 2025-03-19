import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoCourses, selectAllVideoCourses, selectVideoCoursesStatus, selectVideoCoursesError } from '@/redux/slice/video-courses';
import { Card, Col, Row, Spin, Alert, Empty, Button } from 'antd';

const VideoCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectAllVideoCourses);
  const status = useSelector(selectVideoCoursesStatus);
  const error = useSelector(selectVideoCoursesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideoCourses());
    }
  }, [status, dispatch]);

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
              <Button type="primary" onClick={() => dispatch(fetchVideoCourses())}>
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
              <Button type="primary" onClick={() => dispatch(fetchVideoCourses())}>
                Refresh
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Video Courses</h1>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={course.title}
                  src={course.thumbnail}
                  className="h-48 object-cover"
                />
              }
            >
              <Card.Meta
                title={course.title}
                description={course.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VideoCourses;
