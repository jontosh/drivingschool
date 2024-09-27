import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import { useContext } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineFileUnknown,
  AiOutlineMessage,
  AiOutlineProject,
  AiOutlineSolution,
  AiOutlineUnorderedList,
} from "react-icons/ai";

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
  return (
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
