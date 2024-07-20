import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker, Form, Pagination, Table } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Process = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
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
      title: "Seating",
      dataIndex: "seating",
      key: "seating",
      align: "center",
      render: (seating) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {seating}
        </Paragraph>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
      render: (instructor) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {instructor}
        </Paragraph>
      ),
    },
    {
      title: "Student cell",
      dataIndex: "studentCell",
      key: "studentCell",
      align: "center",
      render: (cell) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {cell}
        </Paragraph>
      ),
    },
    {
      title: "Account balance",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      render: (balance) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          ${balance}
        </Paragraph>
      ),
    },
    {
      title: "Confirm/Complete",
      dataIndex: "confirm",
      key: "confirm",
      align: "center",
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <CustomCheckBox />
          <CustomCheckBox />
        </div>
      ),
    },
  ];

  const data = [
    {
      studentName: "Magnificent",
      date: "03/24  04/24",
      seating: "Drive",
      instructor: "Williams, Mary",
      studentCell: "(513)394-0137",
      balance: 149.99,
    },
    {
      studentName: "Magnificent",
      date: "03/24  04/24",
      seating: "Drive",
      instructor: "Williams, Mary",
      studentCell: "(513)394-0137",
      balance: 149.99,
    },
  ];

  const handleFilter = () => setFilter((prev) => !prev);
  return (
    <Fragment>
      <div className="bg-white py-5 px-5 sm:px-9">
        <Form layout="vertical">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <Form.Item label="Appointment type">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Select date">
                <DatePicker className="w-full h-[50px] border-[#667085]" />
              </Form.Item>
            </div>

            <div className="space-y-5">
              <Form.Item label="Location">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Status",
                      label: "Status",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Instructor" className="w-full m-0">
                <CustomSelect
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Khaetbek",
                      label: "Khaetbek",
                    }
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex max-[600px]:flex-col justify-center gap-5 pt-5">
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
            >
              Clear
            </ButtonComponent>
          </div>
        </Form>
      </div>

      {Filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <div className={"flex justify-between items-center"}>
            <form className={"flex gap-5"}>
              <label className={"relative shadow-xl"}>
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Find student"}
                  className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
                  classNames={"h-[50px]"}
                />
                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
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

          <div className={"-mx-5 pt-5"}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      )}
    </Fragment>
  );
};
