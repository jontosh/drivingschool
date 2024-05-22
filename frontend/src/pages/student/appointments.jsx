import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Table } from "antd";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import ManagementStyle from "@/pages/managment/management.module.scss";

const AppointmentsData = () => {
  const { colorsObject } = useContext(ColorsContext);
  const columns = [
    {
      title: "Appent Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => <Paragraph fontSize={"text-lg"}>{date}</Paragraph>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => <Paragraph fontSize={"text-lg"}>{time}</Paragraph>,
    },
    {
      title: "App Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <ButtonComponent
          className={"shadow-2xl"}
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          fontSize={12}
          borderRadius={5}
          paddingInline={32}
        >
          {status ? "Confirmed" : "Cancelled"}
        </ButtonComponent>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Pickup Location",
      dataIndex: "pickupLocation",
      key: "pickupLocation",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicle",
      key: "vehicle",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    }
  ];

  const data = [
    {
      date: "12.22.2024",
      time: "8 am - 5 pm",
      status: true,
      instructor: "Khaetbek",
      location: "Mason Location",
      pickupLocation: "Mason Office",
      product: "BTW 8hrs",
      position: "Drive",
      notes: "",
      vehicle: "Vehicle 1"
    },
    {
      date: "12.22.2024",
      time: "8 am - 5 pm",
      status: false,
      instructor: "Khaetbek",
      location: "Mason Location",
      pickupLocation: "Mason Office",
      product: "BTW 8hrs",
      position: "Drive",
      notes: "",
      vehicle: "Vehicle 1"
    },
  ];

  return { columns, data };
};

export const Appointments = ({ }) => {
  const { subtitle } = useParams();
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = AppointmentsData();
  const setActiveLink = ({ isActive }) =>
    isActive
      ? `text-xl text-indigo-600 font-semibold `
      : `text-xl text-gray-500 font-semibold `;

  return (
    <div>
      <div className={"space-x-9"}>
        {/*By Student IS*/}
        <NavLink
          className={setActiveLink}
          to={"/student/account/appointments/1/wheel"}
        >
          Behind the wheel
        </NavLink>
        <NavLink
          className={setActiveLink}
          to={"/student/account/appointments/1/online"}
        >
          Online course
        </NavLink>
      </div>

      <form
        className={
          "pt-3.5 pb-3 flex gap-5 items-center border-b border-b-gray-400 -mx-5 px-5"
        }
      >
        <label className={"relative"}>
          <CustomInput
            colorBorder={colorsObject.primary}
            placeholder={"Search"}
            className={`w-96 pl-12 pr-4 text-sm`}
            classNames={"h-[50px]"}
          />

          <span className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}>
            <AiOutlineSearch />
          </span>
        </label>
        <CustomSelect
          placeholder={"Please select type"}
          className={`w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
          colorBorder={colorsObject.primary}
          options={[
            {
              value: "8h in car",
              label: "8h in car",
            },
          ]}
        />
        <CustomSelect
          placeholder={"Please select status"}
          className={`w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
          colorBorder={colorsObject.primary}
          options={[
            {
              value: "Confirmed",
              label: "Confirmed",
            },
            {
              value: "Cancelled",
              label: "Cancelled",
            },
          ]}
        />
      </form>

      {subtitle && (
        <div className={"pt-5 -mx-5"}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </div>
  );
};
