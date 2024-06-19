import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { FormOutlined } from "@ant-design/icons";
import { Pagination, Table } from "antd";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Appointments = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleFilter = () => setFilter((prev) => !prev);

  const CheckStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "canceled":
        return (
          <ButtonComponent
            defaultBg={"#24C18F"}
            defaultHoverBg={"#24C18F"}
            defaultHoverColor={colorsObject.main}
            paddingInline={25}
            controlHeight={30}
            borderRadius={5}
            style={{ width: 128 }}
          >
            Canceled
          </ButtonComponent>
        );
      case "open":
        return (
          <ButtonComponent
            defaultBg={"#E57E55"}
            defaultHoverBg={"#E57E55"}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            controlHeight={30}
            borderRadius={5}
            style={{ width: 128 }}
          >
            Open
          </ButtonComponent>
        );
      case "processed":
        return (
          <ButtonComponent
            borderRadius={5}
            defaultBg={colorsObject.info}
            defaultHoverBg={colorsObject.info}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            controlHeight={30}
            style={{ width: 128 }}
          >
            Processed
          </ButtonComponent>
        );
      default:
        return <span>Not found {status}</span>;
    }
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
      title: "Start",
      dataIndex: "start",
      key: "start",
      render: (start) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {start}
        </Paragraph>
      ),
    },
    {
      title: "End",
      dataIndex: "end",
      key: "end",
      render: (end) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {end}
        </Paragraph>
      ),
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
      render: (staff) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {staff}
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
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {seating}
        </Paragraph>
      ),
    },
    {
      title: "BTW Subtype",
      dataIndex: "subtype",
      key: "subtype",
      align: "center",
      render: (seating) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {seating}
        </Paragraph>
      ),
    },
    {
      title: "Student name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
      render: (seating) => (
        <Paragraph
          colorText={colorsObject.secondary}
          fontSize={"text-base"}
          fontWeightStrong={400}
        >
          {seating}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => CheckStatus(status),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: () => (
        <IconComponent
          className={"text-xl text-indigo-700 border border-indigo-600 "}
          icon={<FormOutlined />}
          style={{
            borderRadius: 5,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        />
      ),
    },
  ];

  const data = [
    {
      date: "03/02/2024",
      start: "10:15 pm",
      end: "12:15am",
      staff: "William ",
      seating: "Driving",
      subtype: "Teen BTW",
      studentName: "Martin, Kalie ",
      status: "Canceled",
    },
    {
      date: "03/02/2024",
      start: "10:15 pm",
      end: "12:15am",
      staff: "William ",
      seating: "Driving",
      subtype: "Teen BTW",
      studentName: "Martin, Kalie ",
      status: "Open",
    },
    {
      date: "03/02/2024",
      start: "10:15 pm",
      end: "12:15am",
      staff: "William ",
      seating: "Driving",
      subtype: "Teen BTW",
      studentName: "Martin, Kalie ",
      status: "Processed",
    },
  ];
  return (
    <section className={"space-y-5"}>
      <Title level={3} fontSize={"text-xl"} fontWeightStrong={500}>
        Staff appointment list
      </Title>

      <form className="bg-white py-7 px-14 shadow-xl rounded-2xl flex justify-center gap-5 flex-wrap">
        <div className="grid grid-cols-2 gap-5">
          <div className={"space-y-5 flex-grow"}>
            <CustomInput
              spanClassName={`flex-shrink-0 relative w-20 text-right ${EnrollmentStyle["Enrollment__heavy"]}`}
              spanText={"Start date"}
              className={"w-full shadow-xl"}
              placeholder={"MM/DD/YYYY"}
              classNames={
                "inline-flex w-full h-[50px] flex-row-reverse items-center gap-10"
              }
            />
            <CustomInput
              spanClassName={`flex-shrink-0 relative w-20 text-right ${EnrollmentStyle["Enrollment__heavy"]}`}
              spanText={"End date"}
              className={"w-full border shadow-xl"}
              placeholder={"MM/DD/YYYY"}
              classNames={
                "inline-flex w-full h-[50px] flex-row-reverse items-center gap-10"
              }
            />
            <label className={"inline-flex w-full items-center gap-10"}>
              <span
                className={`flex-shrink-0 relative w-20 text-right ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type
              </span>

              <CustomSelect
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>
          </div>

          <div className={"space-y-5 flex-grow"}>
            <label className={"inline-flex w-full items-center gap-10"}>
              <span className={`flex-shrink-0 w-20 text-right`}>Status</span>

              <CustomSelect
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: "Active",
                    label: "Active",
                  },
                  {
                    value: "Not Active",
                    label: "Not Active",
                  },
                ]}
              />
            </label>

            <label className={"inline-flex w-full items-center gap-10"}>
              <span className={`flex-shrink-0 w-20 text-right`}>Instructor</span>

              <CustomSelect
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <label className={"inline-flex w-full items-center gap-10"}>
              <span className={`flex-shrink-0 w-20 text-right`}>Location</span>

              <CustomSelect
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>
          </div>
        </div>
        <div className={"w-full flex-grow text-center"}>
          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultBg={"#24C18F"}
            defaultHoverBg={"#24C18F"}
            borderRadius={5}
            controlHeight={40}
            paddingInline={98}
            onClick={handleFilter}
          >
            Filter
          </ButtonComponent>
        </div>
      </form>

      {Filter && (
        <div className={"bg-white shadow-xl rounded-2xl px-5 py-6"}>
          <div className="flex justify-between">
            <form>
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

          <div className="pt-5 -mx-5">
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      )}
    </section>
  );
};
