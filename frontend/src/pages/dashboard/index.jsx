import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ChartDashboard } from "@/pages/dashboard/items/chart.jsx";
import TabItem from "@/pages/dashboard/items/tab-content.jsx";
import { DashboardTeachers } from "@/pages/dashboard/items/teachers.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { FilterStudent } from "@/redux/slice/find-student-slice.jsx";
import { Button, ConfigProvider, Dropdown, Tabs } from "antd";
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
import DollarIcon from "../../assets/icons/Dollar.svg";
import Studying from "../../assets/icons/User.svg";
import Register from "../../assets/icons/Profile.svg";

const DashboardFormik = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/student_account/student/" });
  const dispatch = useDispatch();
  const [SearchStudent, setSearchStudent] = useState("");
  const [ListStudents, setListStudents] = useState([]);
  const [ActiveStudent, setActiveStudent] = useState(false);
  const FindStudentState = useSelector((state) => state.findStudent.items);

  useEffect(() => {
    if (SearchStudent === "") {
      dispatch(FilterStudent({ data: [], SearchStudent, active: false }));
    }

    dispatch(
      FilterStudent({ data, search: SearchStudent, active: ActiveStudent }),
    );

    setListStudents(FindStudentState);
  }, [SearchStudent]);

  const student = ListStudents.map((student) => {
    return (
      <Link key={student.id} to={`/student/account/profile/${student.id}`}>
        {student.first_name}, {student.last_name}
      </Link>
    );
  });

  return (
    <Fragment>
      <Formik
        initialValues={{
          search: "",
          status: false,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.search) {
            errors.search = "Input is empty";
          }

          setSearchStudent(values.search);
          setActiveStudent(values.status);

          return errors;
        }}
      >
        {({ values, handleSubmit, handleChange, errors }) => {
          return (
            <form onSubmit={handleSubmit} className={"relative space-y-5"}>
              <label className={"relative shadow-xl w-full"}>
                <CustomInput
                  colorBorder={
                    (errors.search && colorsObject.danger) || colorsObject.main
                  }
                  placeholder={"Find student"}
                  className={`pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
                  classNames={"w-full"}
                  value={values.search}
                  onChange={handleChange}
                  name={"search"}
                />
                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </label>

              {FindStudentState?.length > 0 && (
                <div className={"bg-white"}>{student}</div>
              )}

              <CustomCheckBox name={"status"} onChange={handleChange}>
                Active students only
              </CustomCheckBox>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);

  const [ShowCalendar, setSowCalendar] = useState(false);

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section
        className={`${DashboardStyle["Dashboard"]} px-11 space-y-5 max-w-full w-full`}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
        >
          Dashboard
        </Title>

        <DashboardFormik />

        <div
          className={`${DashboardStyle["Dashboard__statistics"]} bg-white rounded-lg py-8 flex justify-evenly `}
        >
          {/*statistics start*/}
          <div
            className={`${DashboardStyle["Dashboard__statistics-item"]} relative items-center flex gap-6`}
          >
            <div
              className={`${DashboardStyle["Dashboard__statistics-item__icon"]} ${DashboardStyle["Dashboard__statistics-item__money"]} p-6 w-20 h-20 rounded-full`}
            >
              <Image src={DollarIcon} srcSet={DollarIcon} alt={"Dollar icon"} />
            </div>

            <div
              className={`${DashboardStyle["Dashboard__statistics-item__content"]} space-y-1`}
            >
              <Paragraph
                fontWeightStrong={400}
                fontSize={"text-sm text-stone-400"}
              >
                Earning
              </Paragraph>

              <Title level={3} fontSize={"text-3xl"}>
                $198k
              </Title>
            </div>
          </div>
          {/*statistics end*/}

          {/*statistics start*/}
          <div
            className={`${DashboardStyle["Dashboard__statistics-item"]} relative items-center flex gap-6`}
          >
            <div
              className={`${DashboardStyle["Dashboard__statistics-item__icon"]} ${DashboardStyle["Dashboard__statistics-item__studying"]} p-6 w-20 h-20 rounded-full`}
            >
              <Image src={Studying} srcSet={Studying} alt={"Dollar icon"} />
            </div>

            <div
              className={`${DashboardStyle["Dashboard__statistics-item__content"]} space-y-1`}
            >
              <Paragraph
                fontWeightStrong={400}
                fontSize={"text-sm text-stone-400"}
              >
                Student stadying
              </Paragraph>

              <Title level={3} fontSize={"text-3xl"}>
                2.4k
              </Title>
            </div>
          </div>
          {/*statistics end*/}

          {/*statistics start*/}
          <div
            className={`${DashboardStyle["Dashboard__statistics-item"]} relative items-center flex gap-6`}
          >
            <div
              className={`${DashboardStyle["Dashboard__statistics-item__icon"]} ${DashboardStyle["Dashboard__statistics-item__registration"]} p-6 w-20 h-20 rounded-full`}
            >
              <Image src={Register} srcSet={Register} alt={"Dollar icon"} />
            </div>

            <div
              className={`${DashboardStyle["Dashboard__statistics-item__content"]} space-y-1`}
            >
              <Paragraph
                fontWeightStrong={400}
                fontSize={"text-sm text-stone-400"}
              >
                Students registration
              </Paragraph>

              <Title level={3} fontSize={"text-3xl"}>
                200
              </Title>
            </div>
          </div>
          {/*statistics end*/}
        </div>

        <div className={`${DashboardStyle["Dashboard__extra"]} gap-11`}>
          <div
            className={`${DashboardStyle["Dashboard__overview"]} bg-white rounded-lg p-5 space-y-2.5`}
          >
            <div className={`flex gap-2.5 items-center`}>
              <div
                className={`${DashboardStyle["Dashboard__overview-icon"]} w-12 h-12 p-3 rounded-full`}
              >
                <VscGraph />
              </div>

              <div
                className={`${DashboardStyle["Dashboard__overview-titles"]}`}
              >
                <Title level={5} fontSize={"text-base"}>
                  Overview
                </Title>
                <Text>Week</Text>
              </div>
            </div>

            <div>
              <ChartDashboard />
            </div>
          </div>

          <div
            className={`rounded-lg bg-white p-5 ${DashboardStyle["Dashboard__links"]}`}
          >
            <div className={`flex gap-2.5 items-center mb-6`}>
              <div
                className={` w-12 h-12 p-3 ${DashboardStyle["Dashboard__overview-icon"]} bg-inherit `}
              >
                <FaRegListAlt />
              </div>

              <div
                className={`${DashboardStyle["Dashboard__overview-titles"]} `}
              >
                <Title level={5} fontSize={"text-base"}>
                  Quick links
                </Title>
              </div>
            </div>

            <ul
              className={`${DashboardStyle["Dashboard__links-list"]} space-y-3.5`}
            >
              <ButtonComponent
                href={"/enrollment/"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                className={"w-full"}
                controlHeight={40}
                paddingBlock={7}
                borderRadius={5}
              >
                New student
              </ButtonComponent>

              <ButtonComponent
                href={"/enrollment/"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                className={"w-full"}
                controlHeight={40}
                paddingBlock={7}
                borderRadius={5}
              >
                Add new student
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                className={"w-full"}
                controlHeight={40}
                paddingBlock={7}
                borderRadius={5}
              >
                Class list
              </ButtonComponent>

              <ButtonComponent
                href={"/management/file"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                className={"w-full"}
                controlHeight={40}
                paddingBlock={7}
                borderRadius={5}
              >
                File Management
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                className={"w-full"}
                controlHeight={40}
                paddingBlock={7}
                borderRadius={5}
              >
                Built App editing
              </ButtonComponent>
            </ul>
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
