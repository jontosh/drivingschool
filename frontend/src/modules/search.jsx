import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";

export const SearchModule = () => {
  const { colorsObject } = useContext(ColorsContext);

  const columns = [
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <Paragraph
          fontSize={"text-base"}
          className={"text-gray-400"}
          fontWeightStrong={500}
        >
          {name}
        </Paragraph>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      align: "center",
      render: (city) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"text-gray-400"}
        >
          {city}
        </Paragraph>
      ),
    },
    {
      title: "High school",
      dataIndex: "school",
      key: "school",
      align: "center",
      render: (school) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"text-gray-400"}
        >
          {school}
        </Paragraph>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      render: (balance) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"text-gray-400"}
        >
          {balance}$
        </Paragraph>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"text-gray-400"}
        >
          {type}
        </Paragraph>
      ),
    },
    {
      title: "App Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <ButtonComponent
          className={"w-[107px] shadow-2xl"}
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          fontSize={16}
          borderRadius={5}
        >
          {status ? "activated" : "not activated"}
        </ButtonComponent>
      ),
    },

    {
      title: "DL/Permit number",
      dataIndex: "number",
      key: "number",
      align: "center",
      render: (number) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"text-gray-400"}
        >
          {number}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      name: "Aaron Frommeyer",
      city: "Mason",
      school: "Mason high school",
      balance: 0,
      type: "teen",
      status: true,
      number: "VL439475",
    },
    {
      name: "Aaron Frommeyer",
      city: "Mason",
      school: "Mason high school",
      balance: 0,
      type: "teen",
      status: false,
      number: "VL439475",
    },
  ];
  return { columns, data };
};
