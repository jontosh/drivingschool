import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import IconComponent from "@/components/icons";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { DatePicker, Form, Pagination, Table, Modal, message } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const OpenTimeSlots = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleFilter = () => setFilter((prev) => !prev);

  const handleDelete = async (record) => {
    setSlotToDelete(record);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!slotToDelete) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}scheduling/time_slot/${slotToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        message.success('Time slot deleted successfully');
        // Refresh the data
        // You would typically call your data fetching function here
      } else {
        message.error('Failed to delete time slot');
      }
    } catch (error) {
      console.error('Error deleting time slot:', error);
      message.error('Error deleting time slot');
    }
    
    setShowDeleteConfirm(false);
    setSlotToDelete(null);
  };

  const columns = [
    {
      title: "Date/Start and End Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {time}
        </Paragraph>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
      render: (instructor) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {instructor}
        </Paragraph>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <ButtonComponent
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverColor={colorsObject.main}
          defaultColor={colorsObject.main}
          controlHeight={30}
          borderRadius={5}
          style={{ width: 94 }}
        >
          {status ? "Confirmed" : "Open"}
        </ButtonComponent>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {type}
        </Paragraph>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      align: "center",
      render: (vehicle) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {vehicle}
        </Paragraph>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (location) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {location}
        </Paragraph>
      ),
    },
    {
      title: "Pickup Location",
      dataIndex: "pickup",
      key: "pickup",
      align: "center",
      render: (pickup) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {pickup}
        </Paragraph>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 110,
      render: (_, record) => (
        <div className={"text-center space-x-2.5"}>
          <IconComponent
            className={"text-xl text-red-600 border border-indigo-600 cursor-pointer"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
          <IconComponent
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<ExportOutlined />}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      time: "3/25/2024 8:00 AM-11:00 AM",
      instructor: "William",
      status: true,
      type: "Single Appointment",
      vehicle: "Vehicle 1",
      location: "Mason Location",
      pickup: "Mason Office",
    },
    {
      time: "3/25/2024 8:00 AM-11:00 AM",
      instructor: "William",
      status: false,
      type: "Single Appointment",
      vehicle: "Vehicle 1",
      location: "Mason Location",
      pickup: "Mason Office",
    },
  ];

  return (
    <Fragment>
      <div className="bg-white py-5 px-5 sm:px-9">
        <Form layout="vertical">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="flex items-center space-x-5">
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  borderRadius={5}
                  paddingInline={20}
                  className={"mt-6"}
                >
                  Add new
                </ButtonComponent>

                <Form.Item label="Instructor" className="w-full m-0">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Khaetbek",
                        label: "Khaetbek",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>
              </div>

              <Form.Item label="Select date">
                <DatePicker className="w-full h-[50px] border-[#667085]" />
              </Form.Item>

              <Form.Item label="Time filter">
                <CustomSelect
                  placeholder={"Time filter"}
                  options={[
                    {
                      value: "8:18 PM",
                      label: "8:18 PM",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Weekdays">
                <CustomSelect
                  placeholder={"Weekdays"}
                  options={[
                    {
                      value: "Monday",
                      label: "Monday",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>
            </div>

            <div className="space-y-5">
              <Form.Item label="Displayed In Student Center">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Vehicle">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Location">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Appointment type">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex max-[500px]:flex-col justify-center gap-5 pt-5">
            <ButtonComponent
              defaultHoverBg={"#24C18F"}
              defaultBg={"#24C18F"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
              onClick={handleFilter}
            >
              Filter
            </ButtonComponent>
            <ButtonComponent
              defaultHoverBg={colorsObject.secondary}
              defaultBg={colorsObject.secondary}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
            >
              Clear
            </ButtonComponent>
          </div>
        </Form>
      </div>

      {Filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <div className={"flex justify-between items-center"}>
            <form className={"flex gap-5"}>
              <label className={"relative shadow-xl"}>
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Find student"}
                  className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
                  classNames={"h-[50px]"}
                />
                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </label>
            </form>

            <Pagination
              total={10}
              pageSize={1}
              current={CurrentPagination}
              onChange={handleChangePagination}
            />
          </div>

          <div className={"-mx-5 pt-5"}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <Modal
          title="Delete Time Slot"
          open={showDeleteConfirm}
          onOk={confirmDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setSlotToDelete(null);
          }}
          okText="Yes, delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this time slot?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      )}
    </Fragment>
  );
};
