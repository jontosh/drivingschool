import { Fragment, useState, useEffect } from "react";
import { Table, Collapse, Modal, Form, Input, Space, Select } from "antd";
import ButtonComponent from "@/components/button/index.jsx";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';

const { Panel } = Collapse;

const PlaylistColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <ReactMarkdown>{text}</ReactMarkdown>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        <ButtonComponent
          defaultBg="#1890FF"
          defaultHoverBg="#40A9FF"
          defaultBorderColor="#1890FF"
          defaultHoverBorderColor="#40A9FF"
          className="flex items-center gap-1"
          onClick={() => handleEditPlaylist(record)}
        >
          <AiOutlineEdit /> 
        </ButtonComponent>
        <ButtonComponent
          defaultBg="#FF4D4F"
          defaultHoverBg="#FF7875"
          defaultBorderColor="#FF4D4F"
          defaultHoverBorderColor="#FF7875"
          className="flex items-center gap-1"
          onClick={() => handleDeletePlaylist(record.id)}
        >
          <AiOutlineDelete />
        </ButtonComponent>
      </div>
    ),
  },
];

const VideoColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <ReactMarkdown>{text}</ReactMarkdown>,
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Total Lessons",
    dataIndex: "totalLessons",
    key: "totalLessons",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const statusColors = {
        ACTIVE: "text-green-600 bg-green-100",
        INACTIVE: "text-red-600 bg-red-100",
        INCOMING: "text-blue-600 bg-blue-100"
      };
      return (
        <span className={`px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      );
    }
  },
  {
    title: "Video",
    key: "video",
    render: (_, record) => (
      <div className="w-[560px]">
        <iframe 
          width="100%" 
          height="315" 
          src={record.videoUrl} 
          title={record.title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        />
      </div>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <ButtonComponent
          icon={<AiOutlineEdit />}
          onClick={() => handleEditVideo(record, playlist.id)}
          defaultBg="#1890FF"
          defaultHoverBg="#40A9FF"
        >
          Edit
        </ButtonComponent>
        <ButtonComponent
          icon={<AiOutlineDelete />}
          onClick={() => handleDeleteVideo(playlist.id, record.id)}
          defaultBg="#FF4D4F"
          defaultHoverBg="#FF7875"
        >
          Delete
        </ButtonComponent>
      </Space>
    ),
  },
];

export const VideoCourses = ({ status, search }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'playlist' or 'video'
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    // Test ma'lumotlarini yuklash
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
            videoUrl: "https://player.vimeo.com/video/1066078064",
            duration: "45:00",
            status: "ACTIVE"
          },
          {
            id: 102,
            playlistId: 1,
            title: "Understanding Road Signs - Part 1",
            description: "First part of our road signs series. Learn about warning signs, regulatory signs, and guide signs. Essential knowledge for safe driving.",
            videoUrl: "https://player.vimeo.com/video/1066078064",
            duration: "45:00",
            status: "ACTIVE"
          },
          {
            id: 103,
            playlistId: 1,
            title: "Understanding Road Signs - Part 2",
            description: "Second part of our road signs series. Covers advanced road signs, temporary signs, and special situation signs.",
            videoUrl: "https://player.vimeo.com/video/1066078064",
            duration: "45:00",
            status: "INCOMING"
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
            videoUrl: "https://player.vimeo.com/video/1066078064",
            duration: "45:00",
            status: "ACTIVE"
          },
          {
            id: 202,
            playlistId: 2,
            title: "Advanced Driving Skills",
            description: "Master advanced driving techniques for different weather conditions and challenging situations.",
            videoUrl: "https://player.vimeo.com/video/1066078064",
            duration: "45:00",
            status: "INACTIVE"
          }
        ]
      }
    ];
    setPlaylists(mockPlaylists);
  }, []);

  const handleAddPlaylist = () => {
    setModalType('playlist');
    setEditingItem(null);
    setDescription("");
    setIsModalVisible(true);
  };

  const handleAddVideo = (playlistId) => {
    setModalType('video');
    setEditingItem({ playlistId });
    setDescription("");
    setIsModalVisible(true);
  };

  const handleEditPlaylist = (playlist) => {
    setModalType('playlist');
    setEditingItem(playlist);
    setDescription(playlist.description || "");
    form.setFieldsValue({
      title: playlist.title
    });
    setIsModalVisible(true);
  };

  const handleEditVideo = (video, playlistId) => {
    setModalType('video');
    setEditingItem({ ...video, playlistId });
    setDescription(video.description || "");
    form.setFieldsValue({
      title: video.title,
      videoUrl: video.videoUrl,
      duration: video.duration,
      status: video.status
    });
    setIsModalVisible(true);
  };

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
  };

  const handleDeleteVideo = (playlistId, videoId) => {
    Modal.confirm({
      title: "Delete Video",
      content: "Are you sure you want to delete this video?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        setPlaylists(playlists.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.filter(v => v.id !== videoId)
            };
          }
          return playlist;
        }));
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'playlist') {
        if (editingItem) {
          // Edit existing playlist
          setPlaylists(playlists.map(p => 
            p.id === editingItem.id ? { 
              ...p, 
              ...values, 
              description,
              totalDuration: calculateTotalDuration(p.videos)
            } : p
          ));
        } else {
          // Add new playlist
          setPlaylists([...playlists, {
            id: Date.now(),
            ...values,
            description,
            totalDuration: "00:00",
            status: "draft",
            videos: []
          }]);
        }
      } else {
        // Handle video
        const videoUrl = values.videoUrl.includes('embed') 
          ? values.videoUrl 
          : values.videoUrl.replace('watch?v=', 'embed/');
        
        const newVideo = {
          id: editingItem?.id || Date.now(),
          ...values,
          description,
          videoUrl,
          status: values.status
        };

        setPlaylists(playlists.map(playlist => {
          if (playlist.id === editingItem?.playlistId) {
            const updatedVideos = editingItem.id
              ? playlist.videos.map(v => v.id === editingItem.id ? newVideo : v)
              : [...playlist.videos, newVideo];
            
            return {
              ...playlist,
              videos: updatedVideos,
              totalDuration: calculateTotalDuration(updatedVideos)
            };
          }
          return playlist;
        }));
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setDescription("");
      setEditingItem(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setDescription("");
  };

  // Videolar umumiy davomiyligini hisoblash
  const calculateTotalDuration = (videos) => {
    if (!videos || videos.length === 0) return "00:00";

    const totalMinutes = videos.reduce((total, video) => {
      const [minutes] = video.duration.split(":").map(Number);
      return total + minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Fragment>
      <div className="h-screen p-4 flex flex-col">
        <ButtonComponent
          icon={<AiOutlinePlus />}
          onClick={handleAddPlaylist}
          defaultBg="#4338ca"
          defaultHoverBg="#3730a3"
          className="mb-4"
        >
          Add New Playlist
        </ButtonComponent>

        <div className="flex-1 overflow-auto">
          <Collapse>
            {playlists.map(playlist => (
              <Panel
                key={playlist.id}
                header={
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{playlist.title}</h3>
                      <p className="text-gray-500">{playlist.description}</p>
                    </div>
                    <Space>
                      <span>Total Duration: {playlist.totalDuration}</span>
                      <span>Videos: {playlist.videos.length}</span>
                      <ButtonComponent
                        icon={<AiOutlinePlus />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddVideo(playlist.id);
                        }}
                        defaultBg="#4338ca"
                        defaultHoverBg="#3730a3"
                      >
                        
                      </ButtonComponent>
                      <ButtonComponent
                        icon={<AiOutlineEdit />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPlaylist(playlist);
                        }}
                        defaultBg="#1890FF"
                        defaultHoverBg="#40A9FF"
                      >
                        
                      </ButtonComponent>
                      <ButtonComponent
                        icon={<AiOutlineDelete />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePlaylist(playlist.id);
                        }}
                        defaultBg="#FF4D4F"
                        defaultHoverBg="#FF7875"
                      >
                        
                      </ButtonComponent>
                    </Space>
                  </div>
                }
              >
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <Table
                    columns={[
                      {
                        title: "Title",
                        dataIndex: "title",
                        key: "title",
                        width: 200,
                        fixed: 'left'
                      },
                      {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                        width: 300,
                        render: (text) => <ReactMarkdown>{text}</ReactMarkdown>,
                      },
                      {
                        title: "Duration",
                        dataIndex: "duration",
                        key: "duration",
                        width: 100
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        width: 120,
                        render: (status) => {
                          const statusColors = {
                            ACTIVE: "text-green-600 bg-green-100",
                            INACTIVE: "text-red-600 bg-red-100",
                            INCOMING: "text-blue-600 bg-blue-100"
                          };
                          return (
                            <span className={`px-2 py-1 rounded-full ${statusColors[status]}`}>
                              {status}
                            </span>
                          );
                        }
                      },
                      {
                        title: "Video",
                        key: "video",
                        width: 580,
                        render: (_, record) => (
                          <div className="w-[560px]">
                            <iframe 
                              width="100%" 
                              height="315" 
                              src={record.videoUrl} 
                              title={record.title}
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              referrerPolicy="strict-origin-when-cross-origin" 
                              allowFullScreen
                            />
                          </div>
                        ),
                      },
                      {
                        title: "Actions",
                        key: "actions",
                        width: 200,
                        fixed: 'right',
                        render: (_, record) => (
                          <Space size="middle">
                            <ButtonComponent
                              icon={<AiOutlineEdit />}
                              onClick={() => handleEditVideo(record, playlist.id)}
                              defaultBg="#1890FF"
                              defaultHoverBg="#40A9FF"
                            >
                              Edit
                            </ButtonComponent>
                            <ButtonComponent
                              icon={<AiOutlineDelete />}
                              onClick={() => handleDeleteVideo(playlist.id, record.id)}
                              defaultBg="#FF4D4F"
                              defaultHoverBg="#FF7875"
                            >
                              Delete
                            </ButtonComponent>
                          </Space>
                        ),
                      },
                    ]}
                    dataSource={playlist.videos}
                    rowKey="id"
                    scroll={{ x: 1500, y: 500 }}
                    pagination={{
                      pageSize: 5,
                      position: ['bottomCenter'],
                      showTotal: (total) => `Jami: ${total} ta video`,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '20'],
                    }}
                  />
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>

      {/* Modal for adding/editing playlist or video */}
      <Modal
        title={`${editingItem ? 'Edit' : 'Add'} ${modalType === 'playlist' ? 'Playlist' : 'Video'}`}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setDescription("");
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            required
            help="Supports Markdown formatting"
          >
            <MDEditor value={description} onChange={setDescription} />
          </Form.Item>

          {modalType === 'video' && (
            <>
              <Form.Item
                label="Video URL"
                name="videoUrl"
                rules={[{ required: true, message: 'Please input video URL!' }]}
              >
                <Input placeholder="https://player.vimeo.com/video/..." />
              </Form.Item>

              <Form.Item
                label="Duration"
                name="duration"
                rules={[{ required: true, message: 'Please input duration!' }]}
              >
                <Input placeholder="Example: 45:00" />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status!' }]}
                initialValue="ACTIVE"
              >
                <Select>
                  <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                  <Select.Option value="INACTIVE">INACTIVE</Select.Option>
                  <Select.Option value="INCOMING">INCOMING</Select.Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};
