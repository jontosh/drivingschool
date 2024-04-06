import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Exam } from "@/pages/managment/service/exam.jsx";
import { Fees } from "@/pages/managment/service/fees.jsx";
import { Miscellaneous } from "@/pages/managment/service/miscellaneous.jsx";
import { Product } from "@/pages/managment/service/product.jsx";
import { Space } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { PiCopyLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";

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
            // paddingInline={39}
            controlHeight={40}
            style={{width: "128px"}}
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
    status: "process",
  },
];

const FeesData = () => {
  const columns = [
    {
      title: "Location name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
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
            className={"text-red-600 hover:text-red-600"}
          >
            <RiDeleteBin6Line />
          </IconComponent>

          <IconComponent
            defaultBg={"transparent"}
            defaultHoverBg={"transparent"}
            className={"text-indigo-600 hover:text-indigo-600"}
          >
            <TfiWrite />
          </IconComponent>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Active",
    },
    {
      key: "2",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Process",
    },
    {
      key: "3",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Close",
    },
  ];
  return { columns, data };
};

const DiscountsData = () => {
  const columns = [
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <span>$ {discount}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
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
            className={"text-red-600 hover:text-red-600"}
          >
            <RiDeleteBin6Line />
          </IconComponent>

          <IconComponent
            defaultBg={"transparent"}
            defaultHoverBg={"transparent"}
            className={"text-indigo-600 hover:text-indigo-600"}
          >
            <TfiWrite />
          </IconComponent>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Mason Location",
      discount: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Active",
    },
    {
      key: "2",
      name: "Mason Location",
      discount: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Process",
    },
    {
      key: "3",
      name: "Mason Location",
      discount: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Close",
    },
  ];
  return { columns, data };
};

const ExamData = () => {
  const columns = [
    {
      title: "Quiz name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Questions Per Quiz",
      dataIndex: "questionsPer",
      key: "questionsPer",
    },
    {
      title: "Question Pool",
      dataIndex: "questionPool",
      key: "questionPool",
    },
    {
      title: "Passing grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return { columns };
};
const ServiceSpa = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  switch (title.toLowerCase()) {
    case "product":
      return (
        <Fragment>
          <Helmet>
            <title>Service - Product</title>
          </Helmet>
          <Product data={data} columns={columns} />
        </Fragment>
      );
    case "fees": {
      const { columns, data } = FeesData();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Frees</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "discounts": {
      const { columns, data } = DiscountsData();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Discounts</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "miscellaneous": {
      const { columns, data } = FeesData();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Miscellaneous</title>
          </Helmet>
          <Miscellaneous data={data} columns={columns} />
        </Fragment>
      );
    }
    case "quiz-exam": {
      const { columns } = ExamData();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Exam columns={columns} />
        </Fragment>
      );
    }
    default:
      navigate("/management/service/");
  }
};

export default ServiceSpa;
