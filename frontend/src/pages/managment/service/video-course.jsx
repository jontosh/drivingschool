import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table, Tag, Upload } from "antd";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { PlusOutlined, EditOutlined, DeleteOutlined, VideoCameraOutlined, UploadOutlined, EyeOutlined } from "@ant-design/icons";
import Title from "@/components/title/index.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import Notfound from "@/pages/notfound/index.jsx";

const VideoCourse = () => {
  const location = useLocation();
  
  // Check if we're on an invalid sub-route
  if (location.pathname.split('/video-course/').length > 1) {
    return <Notfound />;
  }

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState({});

  // Fetch data (for backend API connection)
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const mockPlaylists = [
          {
            id: 1,
            title: "Road Signs and Traffic Rules",
            description: "Complete course about road signs and traffic rules. This comprehensive series covers all aspects of traffic regulations and road sign interpretations.",
            totalDuration: "2:15:00",
            status: "published",
            createdBy: "John Smith",
            videos: [
              {
                id: 101,
                playlistId: 1,
                title: "Introduction to Traffic Rules",
                description: "Learn the fundamental traffic rules and regulations that every driver must know. This comprehensive lesson covers basic road safety principles.",
                url: "https://player.vimeo.com/video/1066078064",
                duration: "45:00"
              },
              {
                id: 102,
                playlistId: 1,
                title: "Understanding Road Signs - Part 1",
                description: "First part of our road signs series. Learn about warning signs, regulatory signs, and guide signs. Essential knowledge for safe driving.",
                url: "https://player.vimeo.com/video/1066078064",
                duration: "45:00"
              },
              {
                id: 103,
                playlistId: 1,
                title: "Understanding Road Signs - Part 2",
                description: "Second part of our road signs series. Covers advanced road signs, temporary signs, and special situation signs.",
                url: "https://player.vimeo.com/video/1066078064",
                duration: "45:00"
              }
            ]
          },
          {
            id: 2,
            title: "Safe Driving Techniques",
            description: "Master the art of safe driving with our comprehensive course. Learn essential techniques for various driving conditions.",
            totalDuration: "1:30:00",
            status: "published",
            createdBy: "Sarah Johnson",
            videos: [
              {
                id: 201,
                playlistId: 2,
                title: "Basic Driving Techniques",
                description: "Learn the fundamental techniques of safe driving, including proper steering, braking, and acceleration.",
                url: "https://player.vimeo.com/video/1066078064",
                duration: "45:00"
              },
              {
                id: 202,
                playlistId: 2,
                title: "Advanced Driving Skills",
                description: "Master advanced driving techniques for different weather conditions and challenging situations.",
                url: "https://player.vimeo.com/video/1066078064",
                duration: "45:00"
              }
            ]
          }
        ];
        setVideos(mockPlaylists);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error("Error loading data");
      setLoading(false);
    }
  };

  const showModal = (record = null) => {
    if (record) {
      form.setFieldsValue(record);
      setEditingId(record.id);
    } else {
      form.resetFields();
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingId(null);
  };

  const handlePreview = (record) => {
    setPreviewVideo(record);
    setPreviewOpen(true);
  };

  const handlePreviewCancel = () => {
    setPreviewOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      if (editingId) {
        // Edit video
        const updatedVideos = videos.map(item => 
          item.id === editingId ? { ...item, ...values } : item
        );
        setVideos(updatedVideos);
        message.success("Video updated successfully");
      } else {
        // Add new video
        const newVideo = {
          id: Date.now(),
          ...values,
          status: values.status || "draft"
        };
        setVideos([...videos, newVideo]);
        message.success("Video added successfully");
      }
      
      setIsModalOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch (error) {
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Video",
      content: "Are you sure you want to delete this video?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        setVideos(videos.filter(item => item.id !== id));
        message.success("Video deleted successfully");
      }
    });
  };

  const columns = [
    {
      title: "Playlist Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space direction="vertical">
          <Space>
            <VideoCameraOutlined />
            <span className="font-semibold">{text}</span>
          </Space>
          <span className="text-gray-500">{record.description}</span>
        </Space>
      ),
    },
    {
      title: "Total Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
    },
    {
      title: "Videos",
      dataIndex: "videos",
      key: "videos",
      render: (videos) => videos.length,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status === "published" ? "Published" : "Draft"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handlePreview(record)}
            type="text"
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
            type="text"
          />
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
            type="text"
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin - Video Courses</title>
      </Helmet>
      
      <section className="px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full">
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Video Courses
        </Title>
        
        <Card>
          <div className="flex justify-between mb-4">
            <div>
              <ButtonComponent
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                defaultBg="#4338ca"
                defaultHoverBg="#3730a3"
              >
                Add New Video
              </ButtonComponent>
            </div>
            <div>
              <Input.Search
                placeholder="Search..."
                style={{ width: 250 }}
              />
            </div>
          </div>
          
          <Table
            columns={columns}
            dataSource={videos}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </section>

      {/* Add/Edit Video Modal */}
      <Modal
        title={editingId ? "Edit Video" : "Add New Video"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Video Title"
                name="title"
                rules={[{ required: true, message: "Please enter video title!" }]}
              >
                <Input placeholder="Enter video title" />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select placeholder="Select category">
                  <Select.Option value="Driving">Driving</Select.Option>
                  <Select.Option value="Theory">Theory</Select.Option>
                  <Select.Option value="Road Signs">Road Signs</Select.Option>
                  <Select.Option value="Safety">Safety</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[{ required: true, message: "Please enter video duration!" }]}
              >
                <Input placeholder="Example: 15:30" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Video Description"
                name="description"
                rules={[{ required: true, message: "Please enter video description!" }]}
              >
                <Input.TextArea rows={4} placeholder="Brief description about the video" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Video URL"
                name="url"
                rules={[{ required: true, message: "Please enter video URL!" }]}
              >
                <Input placeholder="Video URL address" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="video"
                label="Upload Video"
              >
                <Upload
                  accept="video/*"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Select video file</Button>
                </Upload>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                initialValue="draft"
              >
                <Select>
                  <Select.Option value="published">Publish</Select.Option>
                  <Select.Option value="draft">Save as Draft</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end gap-2 mt-3">
            <Button onClick={handleCancel}>Cancel</Button>
            <ButtonComponent
              htmlType="submit"
              loading={loading}
              defaultBg="#4338ca"
              defaultHoverBg="#3730a3"
            >
              {editingId ? "Save" : "Add"}
            </ButtonComponent>
          </div>
        </Form>
      </Modal>

      {/* Video preview modal */}
      <Modal
        title={previewVideo?.title}
        open={previewOpen}
        onCancel={handlePreviewCancel}
        footer={null}
        width={1000}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{previewVideo?.title}</h3>
            <p className="text-gray-600">{previewVideo?.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="font-medium">Total Duration:</span> {previewVideo?.totalDuration}
            </div>
            <div>
              <span className="font-medium">Created By:</span> {previewVideo?.createdBy}
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              <Tag color={previewVideo?.status === "published" ? "green" : "orange"}>
                {previewVideo?.status === "published" ? "Published" : "Draft"}
              </Tag>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Videos in Playlist:</h4>
            {previewVideo?.videos?.map((video, index) => (
              <div key={video.id} className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
                  <iframe
                    src={video.url}
                    width="100%"
                    height="250"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h5 className="font-semibold">
                  Lesson {index + 1}: {video.title}
                </h5>
                <p className="text-gray-600 mt-1">{video.description}</p>
                <p className="text-gray-500 mt-2">Duration: {video.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoCourse;