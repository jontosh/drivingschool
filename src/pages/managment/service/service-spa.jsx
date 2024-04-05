import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Product } from "@/pages/managment/service/product.jsx";
import { Space } from "antd";
import { Fragment, useContext } from "react";
import { PiCopyLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { useParams } from "react-router-dom";

const CheckProgress = (status = "") => {
  const { colorsObject } = useContext(ColorsContext);
  switch (status.toLowerCase()) {
    case "active":
      return "#24C18F";
    case "progress":
      return colorsObject.orange;
    case "close":
      return colorsObject.danger;
    default:
      return colorsObject.main;
  }
};

const columns = [
  {
    title: "Item Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Code number",
    dataIndex: "codeNumber",
    key: "codeNumber",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Sub type",
    dataIndex: "subtype",
    key: "subtype",
  },
  {
    title: "BTW HOURS",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Observation Hours",
    dataIndex: "observation",
    key: "observation",
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
            paddingInline={39}
            controlHeight={40}
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
          defaultBg={"transparent"}
          defaultHoverBg={"transparent"}
          className={"text-indigo-600 hover:text-indigo-600"}
        >
          <TfiWrite />
        </IconComponent>

        <IconComponent
          defaultBg={"transparent"}
          defaultHoverBg={"transparent"}
          className={"text-red-600 hover:text-red-600"}
        >
          <RiDeleteBin6Line />
        </IconComponent>

        <IconComponent
          defaultBg={"transparent"}
          defaultHoverBg={"transparent"}
          className={"text-indigo-600 hover:text-indigo-600"}
        >
          <PiCopyLight />
        </IconComponent>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Advanced Parking",
    codeNumber: "001",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "Active",
  },
  {
    key: "2",
    name: "Advanced Parking",
    codeNumber: "001",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "Close",
  },
  {
    key: "2",
    name: "Advanced Parking",
    codeNumber: "001",
    type: "Owner",
    subtype: "Teen BTW",
    hours: 1,
    observation: 1,
    status: "Progress",
  },
];
const ServiceSpa = () => {
  const { title } = useParams();

  if (title === "product") {
    return (
      <Fragment>
        <title>Service - Product</title>
        <Product data={data} columns={columns} />
      </Fragment>
    );
  }
};

export default ServiceSpa;
