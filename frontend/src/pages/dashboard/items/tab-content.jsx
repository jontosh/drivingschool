import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import { Fragment, useContext } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineFileUnknown,
  AiOutlineMessage,
  AiOutlineProject,
  AiOutlineSolution,
  AiOutlineUnorderedList,
} from "react-icons/ai";

export const UploadFiles = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <div className={"pt-16 pb-12"}>
        <div className="flex items-center flex-col gap-5 text-center">
          <IconComponent
            className={"text-5xl"}
            icon={<AiOutlineFileUnknown />}
          />
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            There are 0 new text messages received in the last 24 hours.
          </Paragraph>
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            You have <span className="text-red-600">5</span> documents to be
            confirmed.
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
              href={"#!"}
            >
              Show all files
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export const Task = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <div className={"pt-16 pb-12"}>
        <div className="flex items-center flex-col gap-5 text-center">
          <IconComponent
            className={"text-5xl"}
            icon={<AiOutlineUnorderedList />}
          />
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            There are 0 new text messages received in the last 24 hours.
          </Paragraph>
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            You have <span className="text-red-600">5</span> documents to be
            confirmed.
          </Paragraph>
          <div>
            <ButtonComponent
              defaultHoverBg={colorsObject.info}
              defaultBg={colorsObject.info}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              fontSize={14}
              controlHeight={32}
              paddingBlock={4}
              paddingInline={15}
              borderRadius={3}
              href={"#!"}
            >
              Show all tasks
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export const Messages = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <div className={"pt-16 pb-12"}>
        <div className="flex items-center flex-col gap-5 text-center">
          <IconComponent className={"text-5xl"} icon={<CommentOutlined />} />
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            There are 0 new text messages received in the last 24 hours.
          </Paragraph>
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            You have <span className="text-red-600">5</span> documents to be
            confirmed.
          </Paragraph>
          <div>
            <ButtonComponent
              defaultHoverBg={colorsObject.info}
              defaultBg={colorsObject.info}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              fontSize={14}
              controlHeight={32}
              paddingBlock={4}
              paddingInline={15}
              borderRadius={3}
              href={"#!"}
            >
              Show unread texts
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export const Enrollments = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <div className={"pt-16 pb-12"}>
        <div className="flex items-center flex-col gap-5 text-center">
          <IconComponent className={"text-5xl"} icon={<EyeOutlined />} />
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            There are 0 new text messages received in the last 24 hours.
          </Paragraph>
          <Paragraph fontSize={"text-base"} fontWeightStrong={500}>
            You have <span className="text-red-600">5</span> documents to be
            confirmed.
          </Paragraph>
          <div>
            <ButtonComponent
              defaultHoverBg={colorsObject.info}
              defaultBg={colorsObject.info}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              fontSize={14}
              controlHeight={32}
              paddingBlock={4}
              paddingInline={15}
              borderRadius={3}
              href={"#!"}
            >
              Show website enrollments
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const TabItem = () => {
  return [
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
  ].map((item) => {
    return { ...item };
  });
};

export default TabItem;
