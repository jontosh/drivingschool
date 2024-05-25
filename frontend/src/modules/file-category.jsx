import ButtonComponent from "@/components/button/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { FormOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const FileCategoryModule = () => {
  const { data } = useRequestGetQuery({
    path: "/student_account/file_category/",
  });

  const columns = [
    {
      title: "Category",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "File status",
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
            style={{ width: 81 }}
            borderRadius={10}
          >
            {text.toLowerCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
      align: "center",
      render: () => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
            />
          </div>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      dataIndex: "delete",
      align: "center",
      render: () => {
        return (
          <div className={"text-center"}>
            <IconComponent className={"w-7"} icon={<Icons type={"cross"} />} />
          </div>
        );
      },
    },
  ];

  return { data, columns };
};
