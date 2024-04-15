import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Pagination, Table } from "antd";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Corporate = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

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
          paddingInline={39}
          controlHeight={30}
          borderRadius={5}
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
  return (
    <div className={"bg-white p-5 rounded-2xl"}>
      <Title
        level={3}
        fontSize={"text-xl"}
        fontWeightStrong={500}
        titleMarginBottom={33}
      >
        Corporate time off
      </Title>

      <div className={"flex justify-between items-center"}>
        <form className={"flex gap-5"}>
          <label className={"relative shadow-xl"}>
            <CustomInput
              colorBorder={colorsObject.primary}
              placeholder={"Find student"}
              className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
            />
            <span
              className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
            >
              <AiOutlineSearch />
            </span>
          </label>
        </form>

        <Pagination
          total={10}
          pageSize={1}
          current={CurrentPagination}
          onChange={handleChangePagination}
        />
      </div>

      <div className={"pt-5"}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};
