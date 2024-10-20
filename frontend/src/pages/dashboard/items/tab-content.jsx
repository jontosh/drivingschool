import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import { useContext, useMemo } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineFileUnknown,
  AiOutlineMessage,
  AiOutlineProject,
  AiOutlineSolution,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { retry } from "@reduxjs/toolkit/query";
import { CheckProgress } from "@/modules/progress.jsx";
import TableComponent from "@/components/table/index.jsx";
import { Modal, Timeline } from "antd";

const NotificationCard = ({
  icon,
  mainText,
  countText,
  buttonText,
  buttonHref,
  colorsObject,
}) => (
  <div className="pt-16 pb-12">
    <div className="flex items-center flex-col gap-5 text-center">
      <IconComponent className="text-5xl" icon={icon} />
      <Paragraph fontSize="text-base" fontWeightStrong={500}>
        There are 0 new text messages received in the last 24 hours.
      </Paragraph>
      <Paragraph fontSize="text-base" fontWeightStrong={500}>
        You have <span className="text-red-600">5</span> {countText}.
      </Paragraph>
      <div>
        <ButtonComponent
          defaultHoverBg={colorsObject.infoHover}
          defaultBg={colorsObject.info}
          defaultHoverColor={colorsObject.main}
          defaultColor={colorsObject.main}
          fontSize={14}
          controlHeight={32}
          paddingBlock={4}
          paddingInline={15}
          borderRadius={5}
          href={buttonHref}
        >
          {buttonText}
        </ButtonComponent>
      </div>
    </div>
  </div>
);

export const UploadFiles = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <NotificationCard
      icon={<AiOutlineFileUnknown />}
      mainText="There are 0 new text messages received in the last 24 hours."
      countText="documents to be confirmed"
      buttonText="Show all files"
      buttonHref="#!"
      colorsObject={colorsObject}
    />
  );
};

export const Task = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <NotificationCard
      icon={<AiOutlineUnorderedList />}
      mainText="There are 0 new text messages received in the last 24 hours."
      countText="documents to be confirmed"
      buttonText="Show all tasks"
      buttonHref="#!"
      colorsObject={colorsObject}
    />
  );
};

export const Messages = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: WebMessagesList } = useRequestGetQuery({
    path: "/communication/web_message/",
  });
  const [requestPatch, { reset }] = useRequestPatchMutation();

  const cols = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => (
        <Paragraph>{dayjs(date).format("DD/MM/YYYY [at] hh:mm A")}</Paragraph>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => (
        <Link to={"mailto:" + email} target={"_blank"}>
          {email}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const { bg, hover } = CheckProgress(status);
        return (
          <ButtonComponent
            defaultHoverBg={hover}
            defaultBg={bg}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            paddingInline={43}
          >
            {status}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const onDone = async () => {
          try {
            const { error } = await requestPatch({
              path: "/communication/web_message",
              id: record?.id,
              data: { ...record, status: "ACTIVE" },
            });
            if (error?.status >= 400) {
              Modal.error({
                title: "Error message",
                content: (
                  <Timeline
                    items={Object.values(error?.data).map((item) => ({
                      children: item[0],
                    }))}
                  />
                ),
              });
            } else {
              Modal.success({
                title: "Success",
                onOk: () => reset(),
              });
            }
          } catch (e) {
            console.warn(e);
          }
        };
        return (
          <ButtonComponent
            defaultHoverBg={colorsObject.infoHover}
            defaultBg={colorsObject.info}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            paddingInline={43}
            onClick={onDone}
          >
            Done
          </ButtonComponent>
        );
      },
    },
  ];

  const inactiveMessages = useMemo(() => {
    if (!WebMessagesList) return [];

    return WebMessagesList?.filter((item) => item.status === "INACTIVE");
  }, [WebMessagesList]);

  return inactiveMessages.length !== 0 ? (
    <TableComponent columns={cols} data={inactiveMessages} />
  ) : (
    <NotificationCard
      icon={<CommentOutlined />}
      mainText="There are 0 new text messages received in the last 24 hours."
      countText="documents to be confirmed"
      buttonText="Show unread texts"
      buttonHref="#!"
      colorsObject={colorsObject}
    />
  );
};

export const Enrollments = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <NotificationCard
      icon={<EyeOutlined />}
      mainText="There are 0 new text messages received in the last 24 hours."
      countText="documents to be confirmed"
      buttonText="Show website enrollments"
      buttonHref="#!"
      colorsObject={colorsObject}
    />
  );
};

const TabItem = () => {
  const items = [
    {
      key: "1",
      label: <span>Upload files 0</span>,
      children: <UploadFiles />,
      icon: <AiOutlineCloudUpload />,
    },
    {
      key: "2",
      label: (
        <span>
          Task <span className="text-red-600">18</span>
        </span>
      ),
      children: <Task />,
      icon: <AiOutlineProject />,
    },
    {
      key: "3",
      label: (
        <span>
          Text message <span className="text-red-600">5</span>
        </span>
      ),
      children: <Messages />,
      icon: <AiOutlineMessage />,
    },
    {
      key: "4",
      label: (
        <span>
          Website enrollments <span className="text-red-600">0</span>
        </span>
      ),
      children: <Enrollments />,
      icon: <AiOutlineSolution />,
    },
  ];

  return items.map((item) => ({ ...item }));
};

export default TabItem;
