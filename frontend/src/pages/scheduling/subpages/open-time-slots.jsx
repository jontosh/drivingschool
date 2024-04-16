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

export const OpenTimeSlots = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleFilter = () => setFilter((prev) => !prev);

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
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <CustomCheckBox />
          <CustomCheckBox />
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
      <div className="bg-white py-5 px-9">
        <form>
          <div className="grid grid-cols-2 gap-5">
            <div className={"space-y-5"}>
              <div className="flex gap-5 items-center">
                <ButtonComponent
                  defaultHoverBg={colorsObject.info}
                  defaultBg={colorsObject.info}
                  defaultColor={colorsObject.main}
                  defaultHoverColor={colorsObject.main}
                  controlHeight={40}
                  paddingInline={18}
                  borderRadius={5}
                >
                  Add new
                </ButtonComponent>

                <label className={"inline-flex flex-grow items-center gap-5"}>
                  <span className={"text-base flex-shrink-0 w-20 text-right"}>Instructor:</span>
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

              <CustomInput
                spanText={"Select date"}
                placeholder={`MM/DD/YYYY - MM/DD/YYYY`}
                spanClassName={"flex-shrink-0 w-36 text-right"}
                className={" flex-grow border border-indigo-700 shadow-xl"}
                classNames={
                  "inline-flex w-full h-10 flex-row-reverse items-center gap-5"
                }
              />

              <label className={"inline-flex w-full items-center gap-5"}>
                <span className={"text-base flex-shrink-0 w-36 text-right"}>Time filter:</span>
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
                <span className={"text-base flex-shrink-0 w-36 text-right"}>Weekdays</span>
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

            <div className="space-y-5">
              <label className={"inline-flex w-full items-center gap-5"}>
                <span className={"text-base flex-shrink-0 w-36 text-right"}>
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
              <label className={"inline-flex w-full items-center gap-5"}>
                <span className={"text-base flex-shrink-0 w-36 text-right"}>Vehicle</span>
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
                <span className={"text-base flex-shrink-0 w-36 text-right"}>Location</span>
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
                <span className={"text-base flex-shrink-0 w-36 text-right"}>
                  Appointment Type
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
    </Fragment>
  );
};
