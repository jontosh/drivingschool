import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DashboardCalendar } from "@/pages/dashboard/items/calendar.jsx";
import { ChartDashboard } from "@/pages/dashboard/items/chart.jsx";
import TabItem from "@/pages/dashboard/items/tab-content.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { ConfigProvider, Form, Input, Statistic, Tabs } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { PiCheckSquare } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import Earning from "../../assets/icons/earning.svg";
import StudentStudying from "../../assets/icons/student-studying.svg";
import CountUp from "react-countup";
import StudentsRegistration from "../../assets/icons/student-registration.svg";
import Expenses from "../../assets/icons/expenses.svg";
import DiagramUpBold from "../../assets/icons/overview.svg";
import LinksIcon from "../../assets/icons/links.svg";
import InstructorAva from "@/assets/user/instructor.jpeg";
import DashboardStyle from "./dashboard.module.scss";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { search, pathname } = useLocation();
  const { data, isLoading } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const instructorId = useURLSearchParams("instructorId");
  const [form] = Form.useForm();
  const [Search, setSearch] = useState("");

  const { Data } = useFilterStatus({
    data,
    status: "ACTIVE",
    search: Search,
  });

  const teachers = useMemo(() => Data, [search, pathname]);

  const onFinish = (values) => {
    setSearch(values.search);
  };

  const teacherComponents = teachers?.map((teacher, index) => (
    <Link
      to={`/admin/dashboard?instructorId=${teacher?.id}&first_name=${teacher?.first_name}&last_name=${teacher?.last_name}&picture=${teacher?.picture}`}
      key={index}
      className="flex-shrink-0"
      onClick={() => {
        form.resetFields();
        setSearch("");
      }}
    >
      <div className="w-48 px-8 py-7 bg-white rounded-lg space-y-5 border">
        <Image
          className={"w-[60px] mx-auto overflow-hidden rounded-lg"}
          src={teacher?.picture ?? InstructorAva}
          srcSet={teacher?.picture ?? InstructorAva}
        />

        <Title
          level={4}
          fontSize={"text-xs"}
          className={"text-center min-h-10"}
        >
          {teacher.first_name} {teacher.last_name}
        </Title>

        <IconComponent
          icon={<PiCheckSquare />}
          iconWidth={"w-6"}
          vertical={"items-center justify-center"}
          className={`w-full rounded-lg border-2 pt-1.5 ${instructorId === teacher.id ? "border-[#F5F6F7] bg-[#3575FF]" : "border-[#F5F6F7] "}`}
          spaceIconX={2.5}
          iconClass={"text-[#C3CAD9] "}
          childrenClass={` ${instructorId === teacher.id ? "text-white" : "text-[#6B7A99]"}`}
        >
          Show on
        </IconComponent>
      </div>
    </Link>
  ));

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Dashboard
        </Title>

        <div className="space-y-5 sm:space-y-0 sm:gap-5 min-[1335px]:grid-cols-4 sm:grid-cols-2 sm:grid">
          <div className="bg-white flex items-center p-3 rounded-xl gap-5">
            <div className="bg-[#FFF5D9] rounded-full flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20">
              <Image className={"w-8"} src={Earning} alt="Earning" />
            </div>

            <Statistic
              title="Earning"
              value={198}
              suffix="k"
              prefix={"$"}
              formatter={formatter}
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>

          <div className="bg-white p-5 rounded-xl gap-5 flex items-center">
            <div className="bg-[#E7EDFF] rounded-full flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20">
              <Image
                className={"w-8"}
                src={StudentStudying}
                alt="Student Studying"
              />
            </div>

            <Statistic
              title="Student studying"
              value={24}
              formatter={formatter}
              suffix="k"
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>

          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#FFE0EB] rounded-full flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20">
              <Image
                className={"w-8"}
                src={StudentsRegistration}
                alt="Students Registration"
              />
            </div>

            <Statistic
              title="Students registration"
              value={200}
              formatter={formatter}
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>

          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#DCFAF8] rounded-full flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20">
              <Image className={"w-8"} src={Expenses} alt="Expenses" />
            </div>

            <Statistic
              title="Expenses"
              value={7920}
              formatter={formatter}
              prefix={"$"}
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>
        </div>

        <div className="space-y-5 md:space-y-0 md:flex md:gap-5 md:justify-between">
          <div className={classNames(DashboardStyle.Dashboard__overview)}>
            <div className="flex items-center gap-4">
              <Title level={4} fontSize={"text-xl"}>
                Overview
              </Title>
              <Image
                className={"w-6"}
                src={DiagramUpBold}
                alt="Diagram Up Bold"
              />
            </div>

            <div className="bg-white rounded-xl py-7 px-1.5 sm:px-10 mt-3">
              <ChartDashboard />
            </div>
          </div>
          <div className="w-auto md:w-[300px]">
            <div className="flex items-center gap-4">
              <Title level={4} fontSize={"text-xl"}>
                Quick links
              </Title>
              <Image className={"w-6"} src={LinksIcon} alt="Links Icon" />
            </div>
            <div className="bg-white rounded-xl py-7 px-2.5 sm:px-10 mt-3 space-y-5">
              <Link
                to={"/admin/student/account/profile/"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Student Account
              </Link>

              <Link
                to={"/admin/enrollment/"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Add new Student
              </Link>

              <Link
                to={"/admin/communication/student-resources/class"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Class list
              </Link>

              <Link
                to={"/admin/management/file"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                File Management
              </Link>

              <Link
                to={"/admin/scheduling/manage/appointment"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Built App editing
              </Link>
            </div>
          </div>
        </div>

        <div className={"space-y-5"}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name={"search"}
              rules={[
                {
                  required: true,
                  message: "Search is required!",
                },
              ]}
            >
              <Input
                className={"h-[50px]"}
                placeholder={"Search"}
                prefix={<AiOutlineSearch className={"text-xl"} />}
                allowClear
                enterButton="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Item>
          </Form>

          <div
            className={"flex gap-5 overflow-y-hidden overflow-x-scroll w-full"}
          >
            {isLoading ? (
              <Title level={4} fontSize={"text-lg"}>
                Loading...
              </Title>
            ) : teacherComponents?.length === 0 ? (
              "Empty..."
            ) : (
              teacherComponents
            )}
          </div>

          {search && <DashboardCalendar />}
        </div>

        <div className="bg-white px-5 lg:px-12 py-3.5 rounded-2xl shadow-xl">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  itemColor: colorsObject.secondary,
                  itemSelectedColor: colorsObject.primary,
                  itemHoverColor: colorsObject.primary,
                  titleFontSize: 16,
                  inkBarColor: "transparent",
                },
              },
            }}
          >
            <Tabs defaultActiveKey="1" items={TabItem()} />
          </ConfigProvider>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
