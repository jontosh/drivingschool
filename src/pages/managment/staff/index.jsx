import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Pagination, Space, Table } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { PiCopyLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";

const CheckProgress = (status = "") => {
  const { colorsObject } = useContext(ColorsContext);
  switch (status.toLowerCase()) {
    case "active":
      return "#24C18F";
    case "process":
      return colorsObject.orange;
    case "close":
      return colorsObject.danger;
    default:
      return colorsObject.main;
  }
};

const columns = [
  {
    title: "Last name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Cell phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      return (
        <Space size={"middle"}>
          <ButtonComponent
            defaultBg={CheckProgress(text)}
            defaultHoverBg={CheckProgress(text)}
            controlHeight={40}
            style={{ width: "128px" }}
          >
            {text.toUpperCase()}
          </ButtonComponent>
        </Space>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size={"middle"}>
        <IconComponent
          className={"text-indigo-600 hover:text-indigo-600"}
          icon={<TfiWrite />}
        />

        <IconComponent
          className={"w-full text-red-600 hover:text-red-600"}
          icon={<RiDeleteBin6Line />}
        />

        <IconComponent
          className={"text-indigo-600 hover:text-indigo-600"}
          icon={<PiCopyLight />}
        />
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Aminov",
    firstName: "Makhsud",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "Active",
    phone: "(513)837-5128",
  },
  {
    key: "2",
    codeNumber: "001",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "Close",
    name: "Aminov",
    firstName: "Makhsud",
    phone: "(513)837-5128",
  },
  {
    key: "2",
    name: "Aminov",
    firstName: "Makhsud",
    codeNumber: "001",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "process",
    phone: "(513)837-5128",
  },
];

const Staff = ({}) => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Service management</title>
      </Helmet>

      <Fragment>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Account managment
        </Title>

        <Title
          level={3}
          fontSize={"text-black text-3xl"}
          fontWeightStrong={600}
          titleMarginBottom={10}
        >
          Staff
        </Title>

        <div className={"py-6 px-5 bg-white rounded-2xl shadow-lg"}>
          <div className={"flex justify-between items-center mb-5"}>
            <form className={"flex gap-x-5 items-center"}>
              <label className={"relative shadow-lg"}>
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Search"}
                  className={`w-96 pl-12 pr-4 text-sm inline-flex flex-row-reverse `}
                />

                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </label>
              <Fragment>
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  paddingInline={26}
                  controlHeight={40}
                  borderRadius={5}
                  className={"inline-flex items-center"}
                  href={"/management/modal/add-staff"}
                >
                  Add new
                </ButtonComponent>

                <CustomSelect
                  value={"Status"}
                  options={StatusSelect}
                  style={{
                    width: 122,
                    height: 40,
                  }}
                  className={`${ServiceStyle["Service__select"]}`}
                  colorBorder={"#1890FF"}
                  selectorBg={"#1890FF"}
                />
              </Fragment>
            </form>

            <Pagination
              total={10}
              pageSize={1}
              current={CurrentPagination}
              onChange={handleChangePagination}
            />
          </div>

          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Staff;
