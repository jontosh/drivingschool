import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker, Table } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";

export const QuizReport = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [filter, setFilter] = useState(false);

  const handleStartDate = (date) => setStartDate(date);
  const handleEndDate = (date) => setEndDate(date);
  const handleStudentName = (e) => setStudentName(e.target.value);
  const handleQuizType = (value) => setQuizType(value);
  const handleFilter = () => setFilter(true);
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setStudentName("");
    setQuizType("");
    setFilter(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {date}
        </Paragraph>
      ),
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (name) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {name}
        </Paragraph>
      ),
    },
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
      render: (name) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {name}
        </Paragraph>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      render: (score) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {score}%
        </Paragraph>
      ),
    },
    {
      title: "Result",
      dataIndex: "passed",
      key: "passed",
      render: (passed) => (
        <ButtonComponent
          defaultBg={passed ? "#24C18F" : colorsObject.danger}
          defaultHoverBg={passed ? "#24C18F" : colorsObject.danger}
          defaultColor={colorsObject.main}
          controlHeight={30}
          borderRadius={5}
          style={{ width: 94 }}
        >
          {passed ? "Passed" : "Failed"}
        </ButtonComponent>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      date: '04/07/2025',
      studentName: 'John Doe',
      quizName: 'Road Traffic Rules Test',
      score: 85,
      passed: true,
    },
    {
      key: '2',
      date: '04/07/2025',
      studentName: 'Jane Smith',
      quizName: 'Road Traffic Rules Test',
      score: 65,
      passed: false,
    },
  ];

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to view student quiz results and performance data based on the filtering options below.
      </Paragraph>

      <div className="bg-white p-5 sm:p-10">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <div className={"inline-flex w-full items-center gap-10"}>
              <span className={"flex-shrink-0 w-20 text-right"}>Start date</span>
              <DatePicker
                selected={startDate}
                onChange={handleStartDate}
                className="w-full h-[50px] shadow-xl rounded-lg px-4 border border-gray-200 focus:outline-none focus:border-blue-500"
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
              />
            </div>

            <div className={"inline-flex w-full items-center gap-10"}>
              <span className={"flex-shrink-0 w-20 text-right"}>End date</span>
              <DatePicker
                selected={endDate}
                onChange={handleEndDate}
                className="w-full h-[50px] shadow-xl rounded-lg px-4 border border-gray-200 focus:outline-none focus:border-blue-500"
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                minDate={startDate}
              />
            </div>
          </div>

          <div className={"space-y-5 flex-grow"}>
            <label className={"inline-flex w-full items-center gap-10"}>
              <span className={"flex-shrink-0 w-20 text-right"}>Quiz Type</span>
              <CustomSelect
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: "traffic_rules",
                    label: "Traffic Rules",
                  },
                  {
                    value: "safety",
                    label: "Safety",
                  },
                  {
                    value: "regulations",
                    label: "Regulations",
                  },
                ]}
                onChange={handleQuizType}
                value={quizType}
                placeholder="Select Quiz Type"
              />
            </label>

            <label className={"inline-flex w-full items-center gap-10"}>
              <span className={"flex-shrink-0 w-20 text-right"}>Student</span>
              <div className="relative w-full">
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Search by student name"}
                  className={"w-full pl-12 pr-4 h-[50px] shadow-xl"}
                  value={studentName}
                  onChange={handleStudentName}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <AiOutlineSearch />
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex max-[500px]:flex-col justify-center gap-5 pt-5">
          <ButtonComponent
            defaultHoverBg={"#24C18F"}
            defaultBg={"#24C18F"}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            borderRadius={5}
            controlHeight={40}
            paddingInline={98}
            onClick={handleFilter}
          >
            Filter
          </ButtonComponent>
          <ButtonComponent
            defaultHoverBg={colorsObject.secondary}
            defaultBg={colorsObject.secondary}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            borderRadius={5}
            controlHeight={40}
            paddingInline={98}
            onClick={handleClear}
          >
            Clear
          </ButtonComponent>
        </div>
      </div>

      {filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <div className={"flex justify-between items-center"}>
            <Title level={4} fontSize={"text-xl"} fontWeightStrong={500}>
              Quiz Results
            </Title>

            <ButtonComponent
              controlHeight={39}
              defaultBg="#24C18F"
              defaultHoverBg="#24C18F"
              borderRadius={5}
              className={"w-[200px]"}
              onClick={() => {
                // Handle export functionality
                console.log('Exporting to Excel...');
              }}
            >
              Export to Excel
            </ButtonComponent>
          </div>

          <div className={"-mx-5 pt-5"}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      )}
    </Fragment>
  );
};