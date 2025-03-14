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

  // Ma'lumotlarni olish (backend API ga ulanish uchun)
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    // Bu yerda API ga so'rov yuborish kerak
    try {
      // Vaqtinchalik test ma'lumotlari
      setTimeout(() => {
        setVideos([
          {
            id: 1,
            title: "Avtomobil boshqarish asoslari",
            description: "Ushbu video darsda avtomobil boshqarishning asosiy qoidalari bilan tanishasiz",
            category: "Boshqarish",
            url: "https://example.com/video1",
            duration: "15:30",
            status: "published"
          },
          {
            id: 2,
            title: "Yo'l belgilari",
            description: "Barcha yo'l belgilarini o'rganishga mo'ljallangan video darslik",
            category: "Nazariya",
            url: "https://example.com/video2",
            duration: "23:45",
            status: "draft"
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
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
        // Video tahrirlash
        const updatedVideos = videos.map(item => 
          item.id === editingId ? { ...item, ...values } : item
        );
        setVideos(updatedVideos);
        message.success("Video muvaffaqiyatli yangilandi");
      } else {
        // Yangi video qo'shish
        const newVideo = {
          id: Date.now(),
          ...values,
          status: values.status || "draft"
        };
        setVideos([...videos, newVideo]);
        message.success("Video muvaffaqiyatli qo'shildi");
      }
      
      setIsModalOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch (error) {
      message.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Videoni o'chirish",
      content: "Haqiqatan ham bu videoni o'chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Yo'q",
      onOk: () => {
        setVideos(videos.filter(item => item.id !== id));
        message.success("Video muvaffaqiyatli o'chirildi");
      }
    });
  };

  const columns = [
    {
      title: "Video nomi",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space>
          <VideoCameraOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Kategoriya",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Davomiyligi",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status === "published" ? "Nashr qilingan" : "Qoralama"}
        </Tag>
      ),
    },
    {
      title: "Amallar",
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
        <title>Admin - Video kurslar</title>
      </Helmet>
      
      <section className="px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full">
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Video kurslar
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
                Yangi video qo'shish
              </ButtonComponent>
            </div>
            <div>
              <Input.Search
                placeholder="Qidirish..."
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

      {/* Video qo'shish/tahrirlash modali */}
      <Modal
        title={editingId ? "Video tahrirlash" : "Yangi video qo'shish"}
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
                label="Video nomi"
                name="title"
                rules={[{ required: true, message: "Iltimos, video nomini kiriting!" }]}
              >
                <Input placeholder="Video nomini kiriting" />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Kategoriya"
                name="category"
                rules={[{ required: true, message: "Iltimos, kategoriyani tanlang!" }]}
              >
                <Select placeholder="Kategoriyani tanlang">
                  <Select.Option value="Boshqarish">Boshqarish</Select.Option>
                  <Select.Option value="Nazariya">Nazariya</Select.Option>
                  <Select.Option value="Yo'l belgilari">Yo'l belgilari</Select.Option>
                  <Select.Option value="Xavfsizlik">Xavfsizlik</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Davomiyligi"
                name="duration"
                rules={[{ required: true, message: "Iltimos, video davomiyligini kiriting!" }]}
              >
                <Input placeholder="Misol: 15:30" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Video tavsifi"
                name="description"
                rules={[{ required: true, message: "Iltimos, video tavsifini kiriting!" }]}
              >
                <Input.TextArea rows={4} placeholder="Video haqida qisqacha ma'lumot" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Video URL"
                name="url"
                rules={[{ required: true, message: "Iltimos, video URL manzilini kiriting!" }]}
              >
                <Input placeholder="Video URL manzili" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="video"
                label="Video yuklash"
              >
                <Upload
                  accept="video/*"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Video faylni tanlang</Button>
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
                  <Select.Option value="published">Nashr qilish</Select.Option>
                  <Select.Option value="draft">Qoralama saqlash</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end gap-2 mt-3">
            <Button onClick={handleCancel}>Bekor qilish</Button>
            <ButtonComponent
              htmlType="submit"
              loading={loading}
              defaultBg="#4338ca"
              defaultHoverBg="#3730a3"
            >
              {editingId ? "Saqlash" : "Qo'shish"}
            </ButtonComponent>
          </div>
        </Form>
      </Modal>

      {/* Video preview modali */}
      <Modal
        title={previewVideo?.title}
        open={previewOpen}
        onCancel={handlePreviewCancel}
        footer={null}
        width={800}
      >
        <div className="space-y-4">
          <div className="aspect-video bg-gray-200 flex items-center justify-center rounded">
            {/* Backend ulanish bo'lganida haqiqiy video player qo'yiladi */}
            <div className="text-center p-10">
              <VideoCameraOutlined style={{ fontSize: 48 }} />
              <p className="mt-2">Video player: {previewVideo?.url}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold">Tavsif:</h4>
            <p>{previewVideo?.description}</p>
          </div>
          
          <div className="flex gap-3">
            <div>
              <span className="font-medium">Kategoriya:</span> {previewVideo?.category}
            </div>
            <div>
              <span className="font-medium">Davomiyligi:</span> {previewVideo?.duration}
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              <Tag color={previewVideo?.status === "published" ? "green" : "orange"}>
                {previewVideo?.status === "published" ? "Nashr qilingan" : "Qoralama"}
              </Tag>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoCourse;