import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";

export const CorporateTimeOff = () => {
  const { colorsObject } = useContext(ColorsContext);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {name}
        </Paragraph>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (year) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {year}
        </Paragraph>
      ),
    },
    {
      title: "Start date/End date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {date}
        </Paragraph>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {time}
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
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {type}
        </Paragraph>
      ),
    },
    {
      title: "Apply to",
      dataIndex: "apply",
      key: "apply",
      align: "center",
      render: (apply) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {apply}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <ButtonComponent
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverColor={colorsObject.main}
          defaultColor={colorsObject.main}
          borderRadius={5}
          style={{ width: 94 }}
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
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          Dance
        </Paragraph>
      ),
    },
  ];

  const data = [
    {
      name: "Magnificent",
      year: 2024,
      date: "03/24  04/24",
      time: "15:00",
      type: "Party",
      apply: "Aminov.M",
      status: true,
    },
    {
      name: "Magnificent",
      year: 2024,
      date: "03/24  04/24",
      time: "15:00",
      type: "Party",
      apply: "Aminov.M",
      status: false,
    },
  ];

  return { columns, data };
};
