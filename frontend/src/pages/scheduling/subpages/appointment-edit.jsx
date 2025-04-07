import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker, Form, Pagination, Table, Modal, message } from "antd";
import { Fragment, useContext, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const AppointmentEdit = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const checkboxRef = useRef(null);

  const handleFilter = () => setFilter((prev) => !prev);
  
  const handleOpen = () => {
    const selectAll = checkboxRef.current.children[0];
    const inputs = selectAll.querySelectorAll("input");
    inputs.forEach((checkbox) => {
      checkbox.checked && setOpen(checkbox.checked);
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      message.warning('Please select appointments to delete');
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const deletePromises = selectedRows.map(row => 
        fetch(`${import.meta.env.VITE_API_URL}scheduling/appointment/${row.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      const results = await Promise.all(deletePromises);
      const allSuccessful = results.every(res => res.ok);

      if (allSuccessful) {
        message.success(`Successfully deleted ${selectedRows.length} appointments`);
        setSelectedRows([]);
        // Refresh data here
      } else {
        message.error('Failed to delete some appointments');
      }
    } catch (error) {
      console.error('Error deleting appointments:', error);
      message.error('Error deleting appointments');
    }
    
    setShowDeleteConfirm(false);
  };

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedRows(selectedRows);
    }
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
          {status ? "Active" : "Not active"}
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
      title: "Student name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
      render: (name) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {name}
        </Paragraph>
      ),
    },

    {
      title: "Select all",
      dataIndex: "select",
      key: "select",
      align: "center",
      render: () => <CustomCheckBox onChange={handleOpen} />,
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
      studentName: "Wells Alissha",
    },
    {
      time: "3/25/2024 8:00 AM-11:00 AM",
      instructor: "William",
      status: false,
      type: "Single Appointment",
      vehicle: "Vehicle 1",
      location: "Mason Location",
      pickup: "Mason Office",
      studentName: "Wells Alissha",
    },
    {
      time: "3/25/2024 8:00 AM-11:00 AM",
      instructor: "William",
      status: true,
      type: "Single Appointment",
      vehicle: "Vehicle 1",
      location: "Mason Location",
      pickup: "Mason Office",
      studentName: "Wells Alissha",
    },
  ];

  return (
    <Fragment>
      <Form layout="vertical" className="bg-white p-5 sm:p-10">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item label="Instructor">
              <CustomSelect
                placeholder={"Instructor"}
                options={[
                  {
                    value: "Khaetbek",
                    label: "Khaetbek",
                  }
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>

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

            <Form.Item label="Displayed In Student Center">
              <CustomSelect
                placeholder={"Displayed In Student Center"}
                options={[
                  {
                    value: "Monday",
                    label: "Monday",
                  }
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center space-x-5">
                <CustomRadio name={"student"}>
                  Student 1
                </CustomRadio>

                <CustomRadio name={"student"}>
                  Student 2
                </CustomRadio>
              </div>
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item label="Status">
              <CustomSelect
                placeholder={"Status"}
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

            <Form.Item label="BTW Subtype">
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

          {open && (
            <div className="flex items-center gap-3 pt-5">
              <ButtonComponent
                controlHeight={39}
                defaultBg="#1890FF"
                defaultHoverBg="#1890FF"
                borderRadius={5}
                className={"w-full"}
              >
                Edit Appointments
              </ButtonComponent>
              <ButtonComponent
                controlHeight={39}
                defaultBg="#FF333F"
                defaultHoverBg="#FF333F"
                borderRadius={5}
                className={"w-full"}
                onClick={handleBulkDelete}
              >
                Delete appointments
              </ButtonComponent>
              <ButtonComponent
                controlHeight={39}
                defaultBg="#0000002B"
                defaultHoverBg="#0000002B"
                borderRadius={5}
                className={"w-full"}
              >
                Cancel Appointments
              </ButtonComponent>
              <ButtonComponent
                controlHeight={39}
                defaultBg="#FF9533"
                defaultHoverBg="#FF9533"
                borderRadius={5}
                className={"w-full"}
              >
                Shift appointments
              </ButtonComponent>
              <ButtonComponent
                controlHeight={39}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                borderRadius={5}
                className={"w-full"}
              >
                Export
              </ButtonComponent>
            </div>
          )}

          <div className={"-mx-5 pt-5"}>
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection
              }}
              columns={columns}
              dataSource={data}
              pagination={false}
              ref={checkboxRef}
            />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <Modal
          title="Delete Appointments"
          open={showDeleteConfirm}
          onOk={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          okText="Yes, delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete {selectedRows.length} appointments?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      )}
    </Fragment>
  );
};
