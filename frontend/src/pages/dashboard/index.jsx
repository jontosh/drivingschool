import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ChartDashboard } from "@/pages/dashboard/items/chart.jsx";
import TabItem from "@/pages/dashboard/items/tab-content.jsx";
import { DashboardTeachers } from "@/pages/dashboard/items/teachers.jsx";
import { Button, Checkbox, ConfigProvider, Statistic, Tabs } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaBars, FaRegListAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardStyle from "./dashboard.module.scss";
import { FormError } from "@/modules/errors.jsx";
import Earning from "../../assets/icons/earning.svg";
import StudentStudying from "../../assets/icons/student-studying.svg";
import CountUp from "react-countup";
import StudentsRegistration from "../../assets/icons/student-registration.svg";
import Expenses from "../../assets/icons/expenses.svg";
import DiagramUpBold from "../../assets/icons/overview.svg";
import LinksIcon from "../../assets/icons/links.svg";

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);

  const [ShowCalendar, setSowCalendar] = useState(false);

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className={`px-11 space-y-5 max-w-full w-full`}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Dashboard
        </Title>

        <div className="grid grid-cols-4 gap-7">
          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#FFF5D9] w-20 h-20 rounded-full flex items-center justify-center">
              <Image className={"w-8"} src={Earning} srcSet={Earning} />
            </div>

            <Statistic
              title="Earning"
              value={198}
              suffix="k"
              prefix={"$"}
              formatter={formatter}
            />
          </div>

          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#E7EDFF] w-20 h-20 rounded-full flex items-center justify-center">
              <Image
                className={"w-8"}
                src={StudentStudying}
                srcSet={StudentStudying}
              />
            </div>

            <Statistic
              title="Student stadying"
              value={24}
              formatter={formatter}
              suffix="k"
            />
          </div>

          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#FFE0EB] w-20 h-20 rounded-full flex items-center justify-center">
              <Image
                className={"w-8"}
                src={StudentsRegistration}
                srcSet={StudentsRegistration}
              />
            </div>

            <Statistic
              title="Students registration"
              value={200}
              formatter={formatter}
            />
          </div>

          <div className="bg-white flex items-center p-5 rounded-xl gap-5">
            <div className="bg-[#DCFAF8] w-20 h-20 rounded-full flex items-center justify-center">
              <Image className={"w-8"} src={Expenses} srcSet={Expenses} />
            </div>

            <Statistic
              title="Expenses"
              value={7920}
              formatter={formatter}
              prefix={"$"}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-grow">
            <div className="flex items-center gap-4">
              <Title level={4} fontSize={"text-xl"}>
                Overview
              </Title>

              <Image
                className={"w-6"}
                src={DiagramUpBold}
                srcSet={DiagramUpBold}
              />
            </div>

            <div className="bg-white rounded-xl py-7 px-10 mt-3">
              <ChartDashboard />
            </div>
          </div>
          <div className="w-[300px]">
            <div className="flex items-center gap-4">
              <Title level={4} fontSize={"text-xl"}>
                Quick links
              </Title>

              <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
            </div>
            <div className="bg-white px-6 py-8 rounded-xl space-y-6 mt-3">
              <Link
                to={"/student/account/profile/"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Student Account
              </Link>

              <Link
                to={"/enrollment/"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Add new Student
              </Link>

              <Link
                to={"/"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Class list
              </Link>

              <Link
                to={"/management/file"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                File Managment
              </Link>

              <Link
                to={"/enrollment"}
                className={
                  "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                }
              >
                Built App editing
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`${DashboardStyle["Dashboard__teachers"]} shadow-xl p-5 bg-white rounded-lg`}
          >
            <DashboardTeachers />
          </div>
          {/*Result*/}
          {ShowCalendar && (
            <Fragment>
              <div
                className={`${DashboardStyle["Dashboard__teachers-result"]} px-7 py-8 bg-white -mt-1.5`}
              >
                <div className="flex justify-between mb-9">
                  <div className={`gap-4 flex items-center`}>
                    <Title level={3} fontSize={"text-3xl"}>
                      Katie Park
                    </Title>

                    <Paragraph fontSize={`text-xl text-gray-600`}>
                      +8800 555 35 35
                    </Paragraph>

                    <Paragraph
                      fontWeightStrong={500}
                      fontSize={`text-xl text-black`}
                    >
                      120h on week
                    </Paragraph>
                  </div>

                  <div className={`flex gap-x-8`}>
                    <ButtonComponent
                      controlHeight={32}
                      defaultBg={`#24C18F`}
                      defaultHoverBg={`#24C18F`}
                      fontSize={"text-xs"}
                      paddingBlock={4}
                      paddingInline={4}
                      borderRadius={5}
                    >
                      Edit information
                    </ButtonComponent>

                    <ButtonComponent
                      controlHeight={32}
                      defaultBg={`#24C18F`}
                      defaultHoverBg={`#24C18F`}
                      fontSize={"text-xs"}
                      paddingBlock={4}
                      paddingInline={25}
                      borderRadius={5}
                    >
                      Time log
                    </ButtonComponent>

                    <ButtonComponent
                      controlHeight={32}
                      defaultBg={`#24C18F`}
                      defaultHoverBg={`#24C18F`}
                      fontSize={"text-xs"}
                      paddingBlock={4}
                      paddingInline={13}
                      borderRadius={5}
                    >
                      Add time off
                    </ButtonComponent>

                    <ButtonComponent
                      controlHeight={32}
                      defaultBg={`#24C18F`}
                      defaultHoverBg={`#24C18F`}
                      fontSize={"text-xs"}
                      paddingBlock={4}
                      paddingInline={24}
                      borderRadius={5}
                    >
                      Add Slots
                    </ButtonComponent>
                  </div>
                </div>

                <div
                  className={`${DashboardStyle["Dashboard__teachers-result__calendar"]} border-2 border-sky-500 rounded-lg px-4 py-3`}
                >
                  <div
                    className={`${DashboardStyle["Dashboard__teachers-result__calendar-top"]} flex px-7 justify-between `}
                  >
                    <div className="flex gap-4 items-center ">
                      <button className={`p-3`}>
                        <FaBars />
                      </button>

                      <Title
                        level={4}
                        fontSize={"text-lg text-stone-900"}
                        fontWeightStrong={500}
                      >
                        01-07 January 2024
                      </Title>

                      <div>Select</div>
                    </div>

                    <div className={"gap-x-4 inline-flex items-center"}>
                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              defaultBg: "#F5F5F5",
                              defaultHoverBg: "#F5F5F5",
                            },
                          },
                        }}
                      >
                        <Button shape={"circle"} icon={<AiOutlineSearch />} />
                      </ConfigProvider>

                      <button
                        className={
                          "inline-flex p-2 gap-x-4 bg-[#0C41FF] text-white items-center"
                        }
                      >
                        <Text
                          fontWeightStrong={500}
                          fontSize={12}
                          className={"text-white"}
                        >
                          Add event
                        </Text>{" "}
                        <BsPlusCircleFill className={"w-4"} />
                      </button>
                    </div>
                  </div>

                  <div>@todo Calendar</div>
                </div>
              </div>
            </Fragment>
          )}
          {/*Result*/}
        </div>

        <div className="bg-white px-12 py-3.5 rounded-2xl shadow-xl">
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
