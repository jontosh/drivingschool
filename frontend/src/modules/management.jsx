import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { GoClock, GoEye } from "react-icons/go";
import { TbActivityHeartbeat } from "react-icons/tb";

export const LocationModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const columns = [
    {
      title: "Location name",
      key: "name",
      dataIndex: "name",
      render: (text) => {
        return (
          <Paragraph className={"text-start"} fontSize={"text-lg"}>
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
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            //
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
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

  return { columns, data };
};

export const HighSchoolModule = () => {
  const { data } = useRequestGetQuery({ path: "/account_management/schools/" });

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
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            //
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
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
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<FormOutlined />}
          />

          <IconComponent
            className={
              "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
            }
            icon={<GoClock />}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          />
        </div>
      ),
    },
  ];

  return { columns, data };
};

export const HearModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-start pl-[285px]"} fontSize={"text-lg"}>
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
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className={"space-x-2.5 "}>
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
            className={
              "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
            }
            icon={<GoClock />}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          />
        </div>
      ),
    },
  ];

  return { columns, data };
};

export const VehiclesModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/account_management/vehicle/" });

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
          <Paragraph
            className={"text-center"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Appointment color",
      key: "color",
      dataIndex: "color",
      align: "center",
      render: (color) => {
        return (
          <div
            className="w-32 m-auto"
            style={{
              height: 30,
              borderRadius: 5,
              background: color,
            }}
          />
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
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<FormOutlined />}
          />

          <IconComponent
            className={
              "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
            }
            icon={<TbActivityHeartbeat />}
            classNames={"items-center"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          />

          <IconComponent
            className={
              "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
            }
            icon={<GoClock />}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
          />
        </div>
      ),
    },
  ];

  return { columns, data };
};
