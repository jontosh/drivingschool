import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { AlertDelete, AlertEdit } from "@/hooks/alert.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Fragment, useState } from "react";

export const StaffModule = () => {
  const { data } = useRequestGetQuery({ path: "/student_account/instructor/" });
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const { AlertDeleteComponent } = AlertDelete();

  const columns = [
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Cell phone",
      dataIndex: "cell_phone",
      key: "cell_phone",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
            {text.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Fragment>
          <div className={"space-x-2.5"}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
              onClick={() => {
                setIsOpen(true);
                setModalType("edit");
              }}
            />

            <IconComponent
              className={"text-xl text-red-600 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<DeleteOutlined />}
              onClick={() => {
                setIsOpen(true);
                setModalType("delete");
              }}
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
          {IsOpen && ModalType === "delete" && (
            <AlertDeleteComponent setIsOpen={setIsOpen} />
          )}
          {IsOpen && ModalType === "edit" && (
            <AlertEdit setIsOpen={setIsOpen} />
          )}
        </Fragment>
      ),
    },
  ];

  return { data, columns };
};
