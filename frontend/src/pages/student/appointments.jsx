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
      title: "Date/Time",
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
      title: "Status",
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
      title: "Sr No",
      dataIndex: "srNo",
      key: "srNo",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Class Score / In-Car Evaluation",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];

  const data = [
    {
      date: "12.22.2024",
      time: "8 am - 5 pm",
      status: true,
      srNo: "What is it ?",
      type: "8h in car",
      grade: "Score or something like this",
    },
    {
      date: "12.22.2024",
      time: "8 am - 5 pm",
      status: false,
      srNo: "What is it ?",
      type: "8h in car",
      grade: "Score or something like this",
    },
  ];

  return { columns, data };
};

export const Appointments = ({}) => {
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
            className={`w-96 pl-12 pr-4 text-sm  `}
          />

          <span className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}>
            <AiOutlineSearch />
          </span>
        </label>
        <CustomSelect
          placeholder={"Please select type"}
          className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
          style={{ width: 207 }}
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
          className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
          style={{ width: 207 }}
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

      <div className={"pt-5 -mx-5"}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};
