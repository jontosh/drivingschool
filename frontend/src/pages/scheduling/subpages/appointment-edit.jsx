import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Pagination, Table } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const AppointmentEdit = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [open, setOpen] = useState(false)
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleFilter = () => setFilter((prev) => !prev);
  const handleOpen = () => setOpen((prev) => !prev)

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
  ];

  return (
    <Fragment>
      <form className="bg-white p-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-5">
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Instructor</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <CustomInput
              spanClassName={`flex-shrink-0 w-40 text-right`}
              spanText={"Select date"}
              className={"w-full border border-indigo-700 shadow-xl"}
              placeholder={"MM/DD/YYYY - MM/DD/YYYY"}
              classNames={
                "inline-flex w-full h-10 flex-row-reverse items-center gap-5"
              }
            />

            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Time filter</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Weekdays</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>
                Displayed In Student Center
              </span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <div className={"space-x-5 text-center"}>
              <CustomCheckBox className={"gap-x-2.5"}>Student 1</CustomCheckBox>

              <CustomCheckBox className={"gap-x-2.5"}>Student 2</CustomCheckBox>
            </div>
          </div>

          <div className={"space-y-5"}>
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Status</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: "Confirmed",
                    label: "Confirmed",
                  },
                  {
                    value: "Canceled",
                    label: "Canceled",
                  },
                ]}
              />
            </label>
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Vehicle</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Location</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: "USA",
                    label: "USA",
                  },
                ]}
              />
            </label>
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>BTW Subtype</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>
            <label className={"inline-flex w-full items-center gap-5"}>
              <span className={`flex-shrink-0 w-40 text-right`}>Appointment type</span>

              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-10 shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>
          </div>
        </div>

        <div className="text-center space-x-3 pt-6">
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
      </form>

      {Filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <div className={"flex justify-between items-center"}>
            <form className={"flex gap-5"}>
              <label className={"relative shadow-xl"}>
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Find student"}
                  className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
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
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      )}
    </Fragment>
  );
};
