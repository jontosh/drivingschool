import ButtonComponent from "@/components/button/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Exam } from "@/pages/managment/service/exam.jsx";
import { Fees } from "@/pages/managment/service/fees.jsx";
import { Miscellaneous } from "@/pages/managment/service/miscellaneous.jsx";
import { Packages } from "@/pages/managment/service/packages.jsx";
import { Product } from "@/pages/managment/service/product.jsx";
import { DeleteOutlined, ExportOutlined, FormOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
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
    render: (text) => (
      <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
        {text}
      </Paragraph>
    ),
  },
  {
    title: "Code number",
    dataIndex: "codeNumber",
    key: "codeNumber",
    render: (text) => (
      <div className={"text-center"}>
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      </div>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (text) => (
      <div className={"text-center"}>
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      </div>
    ),
  },
  {
    title: "Sub type",
    dataIndex: "subtype",
    key: "subtype",
    render: (text) => (
      <div className={"text-center"}>
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      </div>
    ),
  },
  {
    title: "BTW HOURS",
    dataIndex: "hours",
    key: "hours",
    render: (text) => (
      <div className={"text-center"}>
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      </div>
    ),
  },
  {
    title: "Observation Hours",
    dataIndex: "observation",
    key: "observation",
    render: (text) => (
      <div className={"text-center"}>
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      </div>
    ),
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
            controlHeight={30}
            borderRadius={5}
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
    render: () => (
      <div className={"space-x-2.5"}>
        <IconComponent
          className={"text-xl text-indigo-500 border border-indigo-600"}
          style={{
            borderRadius: 5,
            paddingLeft: 4,
            paddingRight: 4,
          }}
          icon={<FormOutlined />}
        />

        <IconComponent
          className={"text-xl text-red-600 border border-indigo-600"}
          style={{
            borderRadius: 5,
            paddingLeft: 4,
            paddingRight: 4,
          }}
          icon={<DeleteOutlined />}
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
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className={"text-lg"}>${price}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
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
              controlHeight={30}
              borderRadius={5}
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
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <IconComponent
            className={"text-xl text-red-600 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<DeleteOutlined />}
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
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <span className={"text-lg"}>${discount}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
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
              controlHeight={30}
              borderRadius={5}
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
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <IconComponent
            className={"text-xl text-red-600 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<DeleteOutlined />}
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

const PackagesData = () => {
  const columns = [
    {
      title: "Service name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Service price",
      key: "price",
      dataIndex: "price",
      render: (text) => (
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Service content",
      key: "content",
      dataIndex: "content",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        return (
          <Space size={"middle"}>
            <ButtonComponent
              defaultBg={CheckProgress(text)}
              defaultHoverBg={CheckProgress(text)}
              controlHeight={30}
              borderRadius={5}
              style={{ width: "128px" }}
            >
              {text.toUpperCase()}
            </ButtonComponent>
          </Space>
        );
      },
    },
    {
      title: "Web Purchase",
      key: "web",
      dataIndex: "web",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"w-6"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Student Portal Purchase",
      key: "portal",
      dataIndex: "portal",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"w-6"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Students Enrolled",
      key: "enrolled",
      dataIndex: "enrolled",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"w-6"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <IconComponent
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<FormOutlined />}
          />

          <IconComponent
            className={"text-xl text-red-600 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<DeleteOutlined />}
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
      key: "1",
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Active",
      web: true,
      portal: false,
      enrolled: true,
    },
    {
      key: "2",
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Close",
      web: true,
      portal: true,
      enrolled: true,
    },
    {
      key: "3",
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Process",
      web: true,
      portal: false,
      enrolled: false,
    },
  ];

  return { columns, data };
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
    case "quiz-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <div className={"px-5"}>content</div>
        </Fragment>
      );
    }
    case "packages": {
      const { columns, data } = PackagesData();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Packages columns={columns} data={data} />
        </Fragment>
      );
    }
    default:
      navigate("/management/service/");
  }
};

export default ServiceSpa;
