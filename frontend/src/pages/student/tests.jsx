import ButtonComponent from "@/components/button/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import TableComponent from "@/components/table/index.jsx";
import { useContext, useState } from "react";
import CreateTestModal from "./create-test-modal";

export const Tests = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTest = (testData) => {
    console.log('New test data:', testData);
    // API call to save test
  };

  const columns = [
    {
      title: "Test Name",
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
      title: "Course Name",
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
      title: "Overall Score",
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
      name: "Road Traffic Rules Test",
      date: "21.03.2024",
      course: "Road Traffic Rules",
      score: 20,
      results: true,
    },
    {
      name: "Road Traffic Rules Test",
      date: "21.03.2024",
      course: "Road Traffic Rules",
      score: 20,
      results: false,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title
          titleMarginBottom={0}
          level={2}
          fontSize={"text-indigo-700 text-xl"}
        >
          Quiz/Tests
        </Title>

        <ButtonComponent
          onClick={() => setIsModalOpen(true)}
          defaultBg={colorsObject.primary}
          defaultHoverBg={colorsObject.primary}
          defaultColor={colorsObject.main}
          borderRadius={5}
          className="px-4"
        >
          Create New Test
        </ButtonComponent>
      </div>

      <div className={"-mx-5"}>
        <TableComponent columns={columns} dataSource={data} pagination={false} />
      </div>

      <CreateTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTest}
      />
    </div>
  );
};
