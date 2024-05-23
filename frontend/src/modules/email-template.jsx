import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { LuSmartphone } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";

export const EmailTemplateModule = () => {
  const { colorsObject } = useContext(ColorsContext);

  const columns = [
    {
      title: "Email name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => (
        <Paragraph
          className={"text-start"}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Email subject",
      dataIndex: "subject",
      key: "subject",
      align: "center",
      render: (text) => (
        <Paragraph
          className={"text-center"}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Sending",
      dataIndex: "sending",
      key: "sending",
      align: "center",
      render: (status) => (
        <ButtonComponent
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          borderRadius={5}
          paddingInline={39}
          controlHeight={30}
          className={"shadow-[#00000040]"}
        >
          {status ? "Active" : "Not active"}
        </ButtonComponent>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: () => (
        <div className="space-x-2">
          <IconComponent
            className={"text-2xl border border-indigo-600 rounded-lg pt-1 pl-1 pr-1"}
            icon={<TbEdit />}
          />
          <IconComponent
            className={"text-2xl border border-indigo-600 rounded-lg pt-1 pl-1 pr-1"}
            icon={<LuSmartphone />}
          />
          <IconComponent
            className={"text-2xl border border-indigo-600 rounded-lg pt-1 pl-1 pr-1"}
            icon={<AiOutlineEye />}
          />
          <IconComponent
            className={"text-2xl border border-indigo-600 rounded-lg pt-1 pl-1 pr-1"}
            icon={<IoTimeOutline />}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      name: "Billing payment Confirmation",
      subject: "Payment successful",
      sending: true,
    },
    {
      name: "Billing payment Confirmation",
      subject: "Payment successful",
      sending: true,
    },
    {
      name: "Billing payment Confirmation",
      subject: "Payment successful",
      sending: true,
    },
  ];

  return { columns, data };
};
