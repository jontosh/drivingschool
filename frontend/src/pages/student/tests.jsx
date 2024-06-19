import ButtonComponent from "@/components/button/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
// import { Table } from "antd";
import TableComponent from "@/components/table/index.jsx";
import { useContext } from "react";

export const Tests = () => {
  const { colorsObject } = useContext(ColorsContext);
  const columns = [
    {
      title: "Name test",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => (
        <Paragraph className={"text-center"} fontSize={"text-base"} fontWeightStrong={400}>
          {date}
        </Paragraph>
      ),
    },
    {
      title: "Course name",
      dataIndex: "course",
      key: "course",
      align: "center",
      render: (course) => (
        <Paragraph className={"text-center"} fontSize={"text-base"} fontWeightStrong={400}>
          {course}
        </Paragraph>
      ),
    },
    {
      title: "Overall ball",
      dataIndex: "score",
      key: "score",
      align: "center",
      render: (score) => (
        <Paragraph className={"text-center"} fontSize={"text-base"} fontWeightStrong={400}>
          {score}
        </Paragraph>
      ),
    },
    {
      title: "Results",
      dataIndex: "results",
      key: "results",
      align: "center",
      render: (results) => (
        <ButtonComponent
          defaultBg={results ? "#24C18F" : colorsObject.danger}
          defaultHoverBg={results ? "#24C18F" : colorsObject.danger}
          defaultColor={colorsObject.main}
          // controlHeight={30}
          borderRadius={5}
          className={"w-[144px]"}
        >
          {results ? "Passed" : "Failed"}
        </ButtonComponent>
      ),
    },
  ];

  const data = [
    {
      name: "Drive test",
      date: "21.03.2024",
      course: "Drive course",
      score: 45,
      results: true,
    },
    {
      name: "Drive test",
      date: "21.03.2024",
      course: "Drive course",
      score: 45,
      results: false,
    },
  ];
  return (
    <div>
      <Title
        titleMarginBottom={20}
        level={2}
        fontSize={"text-indigo-700 text-xl"}
      >
        Quiz/Tests
      </Title>

      <div className={"-mx-5"}>
        <TableComponent columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};
