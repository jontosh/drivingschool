import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { AccountManagementLocation } from "@/redux/slice/account-management-slice.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { GoClock, GoEye } from "react-icons/go";
import { TbActivityHeartbeat } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export const LocationModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/location/",
  });

  const LocationState = useSelector(
    (state) => state.account_management.location,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountManagementLocation({ data }));
  }, [data]);

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

  const LocationState = useSelector(
    (state) => state.account_management.location,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountManagementLocation({ data }));
  }, [data]);

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

  const LocationState = useSelector(
    (state) => state.account_management.location,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AccountManagementLocation({ data }));
  }, [data]);

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
  const { data } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });

  const LocationState = useSelector(
    (state) => state.account_management.location,
  );
  const dispatch = useDispatch();

  useEffect(() => {}, [data]);

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
      render: (code, _, index) => {
        // console.log(LocationState[index]?.code);
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {LocationState[index]?.code}
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
