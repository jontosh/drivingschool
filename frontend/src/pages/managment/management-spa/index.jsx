import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Hear } from "@/pages/managment/management-spa/hear.jsx";
import { HighSchool } from "@/pages/managment/management-spa/high-school.jsx";
import { Location } from "@/pages/managment/management-spa/location.jsx";
import { Vehicles } from "@/pages/managment/management-spa/vehicles.jsx";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { CiMap } from "react-icons/ci";
import { GoClock, GoEye } from "react-icons/go";
import { TbActivityHeartbeat } from "react-icons/tb";
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

const LocationData = () => {
  const columns = [
    {
      title: "Location name",
      key: "name",
      dataIndex: "name",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Location code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        return (
          <div className={"text-center"}>
            <ButtonComponent
              defaultBg={CheckProgress(text)}
              defaultHoverBg={CheckProgress(text)}
              controlHeight={30}
              borderRadius={5}
              style={{ width: "128px" }}
            >
              {text?.toUpperCase()}
            </ButtonComponent>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className={" space-x-2.5 "}>
          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<TfiWrite />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<CiMap />}
            classNames={"items-center"}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<GoClock />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Mason Location",
      code: 8581,
      status: "Active",
      type: "Main office only",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Process",
      type: "Main office only",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Close",
      type: "Main office only",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
  ];

  return { columns, data };
};

const HighSchoolData = () => {
  const columns = [
    {
      title: "School name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "School code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "High school map",
      key: "map",
      dataIndex: "map",
      align: "center",
      render: () => (
        <div className={"text-center"}>
          <IconComponent
            className={"text-2xl cursor-default"}
            icon={<GoEye />}
          />
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        return (
          <div className={"text-center"}>
            <ButtonComponent
              defaultBg={CheckProgress(text)}
              defaultHoverBg={CheckProgress(text)}
              controlHeight={30}
              borderRadius={5}
              style={{ width: "128px" }}
            >
              {text?.toUpperCase()}
            </ButtonComponent>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className={" space-x-2.5 "}>
          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<TfiWrite />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<GoClock />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Mason Location",
      code: 8581,
      status: "Active",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Process",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Close",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
  ];

  return { columns, data };
};

const HearData = () => {
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-start"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "School code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        return (
          <div className={"text-center"}>
            <ButtonComponent
              defaultBg={CheckProgress(text)}
              defaultHoverBg={CheckProgress(text)}
              controlHeight={30}
              borderRadius={5}
              style={{ width: "128px" }}
            >
              {text?.toUpperCase()}
            </ButtonComponent>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className={" space-x-2.5 "}>
          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<TfiWrite />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<GoClock />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Facebook",
      code: 8581,
      status: "Active",
    },
    {
      name: "Google",
      code: 8581,
      status: "Process",
    },
    {
      name: "Other",
      code: 8581,
      status: "Close",
    },
    {
      name: "Recommendation",
      code: 8581,
      status: "Close",
    },
    {
      name: "Yelp",
      code: 8581,
      status: "Active",
    },
  ];

  return { columns, data };
};
const VehiclesData = () => {
  const { colorsObject } = useContext(ColorsContext);
  const columns = [
    {
      title: "Location name",
      key: "name",
      dataIndex: "name",
      render: (text) => {
        return <Paragraph fontSize={"text-lg"}>{text}</Paragraph>;
      },
    },
    {
      title: "Location code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"} fontWeightStrong={400}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Appointment color",
      key: "appointment",
      dataIndex: "appointment",
      align: "center",
      render: (color) => {
        return (
          <div className={"text-center"}>
            <ButtonComponent
              defaultBg={color}
              defaultHoverBg={color}
              controlHeight={30}
              borderRadius={5}
              className={"w-32"}
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className={" space-x-2.5 "}>
          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<TfiWrite />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<TbActivityHeartbeat />}
            classNames={"items-center"}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"}
            icon={<GoClock />}
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 5, paddingTop: 4 }}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Mason Location",
      code: 8581,
      appointment: colorsObject.info,
      type: "Car",
    },
    {
      name: "Mason Location",
      code: 8581,
      appointment: colorsObject.secondary,
      type: "Car",
    },
    {
      name: "Mason Location",
      code: 8581,
      appointment: colorsObject.danger,
      type: "Car",
    },
  ];

  return { columns, data };
};

const ManagementSpaIndex = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  switch (title) {
    case "location": {
      const { columns, data } = LocationData();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Location</title>
          </Helmet>
          <Location columns={columns} data={data} />
        </Fragment>
      );
    }
    case "high school": {
      const { columns, data } = HighSchoolData();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - High School</title>
          </Helmet>
          <HighSchool columns={columns} data={data} />
        </Fragment>
      );
    }
    case "how did you hear": {
      const { columns, data } = HearData();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - How did you hear</title>
          </Helmet>
          <Hear columns={columns} data={data} />
        </Fragment>
      );
    }
    case "vehicles": {
      const { columns, data } = VehiclesData();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Vehicles</title>
          </Helmet>
          <Vehicles columns={columns} data={data} />
        </Fragment>
      );
    }
    default:
      navigate("/management/single-page");
  }
};

export default ManagementSpaIndex;
