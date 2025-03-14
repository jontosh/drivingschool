import { Fragment, useState } from "react";
import { Table, Collapse, Modal, Form, Input } from "antd";
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
          <AiOutlineEdit /> Edit
        </ButtonComponent>
        <ButtonComponent
          defaultBg="#FF4D4F"
          defaultHoverBg="#FF7875"
          defaultBorderColor="#FF4D4F"
          defaultHoverBorderColor="#FF7875"
          className="flex items-center gap-1"
          onClick={() => handleDeletePlaylist(record.id)}
        >
          <AiOutlineDelete /> Delete
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
      <div className="flex gap-2">
        <ButtonComponent
          defaultBg="#1890FF"
          defaultHoverBg="#40A9FF"
          defaultBorderColor="#1890FF"
          defaultHoverBorderColor="#40A9FF"
          className="flex items-center gap-1"
          onClick={() => handleEditVideo(record)}
        >
          <AiOutlineEdit /> Edit
        </ButtonComponent>
        <ButtonComponent
          defaultBg="#FF4D4F"
          defaultHoverBg="#FF7875"
          defaultBorderColor="#FF4D4F"
          defaultHoverBorderColor="#FF7875"
          className="flex items-center gap-1"
          onClick={() => handleDeleteVideo(record.playlistId, record.id)}
        >
          <AiOutlineDelete /> Delete
        </ButtonComponent>
      </div>
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

  const handleEditVideo = (video) => {
    setModalType('video');
    setEditingItem(video);
    setDescription(video.description || "");
    form.setFieldsValue({
      title: video.title,
      videoUrl: video.videoUrl
    });
    setIsModalVisible(true);
  };

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
  };

  const handleDeleteVideo = (playlistId, videoId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          videos: playlist.videos.filter(v => v.id !== videoId)
        };
      }
      return playlist;
    }));
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (modalType === 'playlist') {
        if (editingItem) {
          // Edit existing playlist
          setPlaylists(playlists.map(p => 
            p.id === editingItem.id ? { ...p, ...values, description } : p
          ));
        } else {
          // Add new playlist
          setPlaylists([...playlists, {
            id: Date.now(),
            ...values,
            description,
            videos: []
          }]);
        }
      } else {
        // Handle video
        const videoUrl = values.videoUrl.includes('embed') 
          ? values.videoUrl 
          : values.videoUrl.replace('watch?v=', 'embed/');
        
        const newVideo = {
          id: Date.now(),
          ...values,
          description,
          videoUrl
        };

        setPlaylists(playlists.map(playlist => {
          if (playlist.id === editingItem.playlistId) {
            return {
              ...playlist,
              videos: editingItem.id
                ? playlist.videos.map(v => v.id === editingItem.id ? newVideo : v)
                : [...playlist.videos, newVideo]
            };
          }
          return playlist;
        }));
      }

      setIsModalVisible(false);
      form.resetFields();
      setDescription("");
    });
  };

  return (
    <Fragment>
      <div className="p-4">
        <div className="mb-4">
          <ButtonComponent
            defaultBg="#1890FF"
            defaultHoverBg="#40A9FF"
            defaultBorderColor="#1890FF"
            defaultHoverBorderColor="#40A9FF"
            className="flex items-center gap-1"
            onClick={handleAddPlaylist}
          >
            <AiOutlinePlus /> Add New Playlist
          </ButtonComponent>
        </div>

        <Collapse>
          {playlists.map(playlist => (
            <Panel 
              header={playlist.title} 
              key={playlist.id}
              extra={
                <ButtonComponent
                  defaultBg="#1890FF"
                  defaultHoverBg="#40A9FF"
                  defaultBorderColor="#1890FF"
                  defaultHoverBorderColor="#40A9FF"
                  className="flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddVideo(playlist.id);
                  }}
                >
                  <AiOutlinePlus /> Add Video
                </ButtonComponent>
              }
            >
              <Table
                columns={VideoColumns}
                dataSource={playlist.videos}
                rowKey="id"
                pagination={false}
              />
            </Panel>
          ))}
        </Collapse>

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
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              required
              help="Supports Markdown formatting"
            >
              <MDEditor
                value={description}
                onChange={setDescription}
                preview="edit"
              />
            </Form.Item>
            {modalType === 'video' && (
              <Form.Item
                name="videoUrl"
                label="Video URL"
                rules={[
                  { required: true, message: 'Please input video URL!' },
                  { 
                    pattern: /youtube\.com/,
                    message: 'Please enter a valid YouTube URL!'
                  }
                ]}
              >
                <Input placeholder="https://www.youtube.com/embed/..." />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
};
