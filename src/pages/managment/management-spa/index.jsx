import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Location } from "@/pages/managment/management-spa/location.jsx";
import { Space } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { CiMap } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { PiCopyLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { useParams } from "react-router-dom";

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
              controlHeight={40}
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
            className={"text-2xl text-indigo-600 hover:text-indigo-600"}
            icon={<TfiWrite />}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600"}
            icon={<CiMap />}
            classNames={"items-center"}
          />

          <IconComponent
            className={"text-2xl text-indigo-600 hover:text-indigo-600"}
            icon={<GoClock />}
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
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Process",
      type: "Main office only",
    },
    {
      name: "Mason Location",
      code: 8581,
      status: "Close",
      type: "Main office only",
    },
  ];

  return { columns, data };
};

const ManagementSpaIndex = () => {
  const { title } = useParams();

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
  }
};

export default ManagementSpaIndex;
