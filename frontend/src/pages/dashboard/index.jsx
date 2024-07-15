import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DashboardCalendar } from "@/pages/dashboard/items/calendar.jsx";
import { ChartDashboard } from "@/pages/dashboard/items/chart.jsx";
import TabItem from "@/pages/dashboard/items/tab-content.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { filteredTeachers } from "@/redux/slice/filter-slice.jsx";
import { ConfigProvider, Statistic, Tabs } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { PiCheckSquare } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Earning from "../../assets/icons/earning.svg";
import StudentStudying from "../../assets/icons/student-studying.svg";
import CountUp from "react-countup";
import StudentsRegistration from "../../assets/icons/student-registration.svg";
import Expenses from "../../assets/icons/expenses.svg";
import DiagramUpBold from "../../assets/icons/overview.svg";
import LinksIcon from "../../assets/icons/links.svg";
import InstructorAva from "@/assets/user/instructor.jpeg";

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: ListOfTeachersData, isLoading } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const dispatch = useDispatch();
  const FilteredTeachersState = useSelector(
    (state) => state.filter.filteredTeachers,
  );

  const [ActiveTeacherCart, setActiveTeacherCart] = useState(-1);
  const [SearchTeacher, setSearchTeacher] = useState("");
  const [Teachers, setTeachers] = useState([]);

  useEffect(() => {
    setTeachers(ListOfTeachersData);
  }, [ListOfTeachersData?.length]);

  useEffect(() => {
    dispatch(
      filteredTeachers({ search: SearchTeacher, data: ListOfTeachersData }),
    );

    setTeachers(FilteredTeachersState);
  }, [Teachers?.length, SearchTeacher]);

  const handleClickTeacherCart = (id) => setActiveTeacherCart(id);
  const handleViewAll = () => {
    setTeachers(ListOfTeachersData);
    setActiveTeacherCart(-1);
    setSearchTeacher("");
  };

  const teacher = Teachers?.map((teacher, index) => {
    return (
      <Fragment key={index}>
        <div
          className="w-48 px-8 py-7 bg-white rounded-lg space-y-5"
          onClick={() => handleClickTeacherCart(index)}
        >
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
            className={`w-full rounded-lg border-2 pt-1.5 ${ActiveTeacherCart === index ? "border-[#F5F6F7] bg-[#3575FF]" : "border-[#F5F6F7] "}`}
            spaceIconX={2.5}
            iconClass={"text-[#C3CAD9] "}
            childrenClass={` ${ActiveTeacherCart === index ? "text-white" : "text-[#6B7A99]"}`}
          >
            Show on
          </IconComponent>
        </div>
      </Fragment>
    );
  });

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Dashboard
        </Title>

        <div className="gap-5 min-[1335px]:grid-cols-4 md:grid-cols-2 md:grid">
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
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>

          <div className="bg-white p-5 rounded-xl gap-5 flex items-center">
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
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
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
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
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
              valueStyle={{ fontWeight: 600 }}
              className={"flex-grow"}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
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
          <div className="w-auto md:w-[300px]">
            <div className="flex items-center gap-4">
              <Title level={4} fontSize={"text-xl"}>
                Quick links
              </Title>

              <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
            </div>
            <div className="bg-white px-6 py-8 rounded-xl space-y-6 mt-3">
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
                to={"/admin/class-list/notfound"}
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
          <Formik
            initialValues={{
              search: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.search) {
                errors.search = "Is not valid value";
              } else {
                setSearchTeacher(values.search);
              }

              return errors;
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <form
                className={"flex gap-5 justify-between"}
                onSubmit={handleSubmit}
              >
                <label className={"relative"}>
                  <CustomInput
                    colorBorder={colorsObject.main}
                    spanText={"Teacher"}
                    spanClassName={"font-medium"}
                    fontSize="text-base"
                    placeholder={"Find teacher"}
                    classNames={
                      "inline-flex flex-row-reverse items-center gap-5"
                    }
                    className={`w-96 pl-12 pr-4 py-2.5  h-10 text-sm inline-flex flex-row-reverse shadow-xl`}
                    value={values.search}
                    onChange={handleChange}
                    name={"search"}
                  />
                  <span
                    className={
                      "absolute left-24 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>

                <ButtonComponent
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  onClick={handleViewAll}
                  fontSize={"text-base"}
                  className={"font-medium"}
                >
                  View All
                </ButtonComponent>
              </form>
            )}
          </Formik>

          <div className={"flex gap-5 overflow-hidden w-full"}>
            {isLoading ? (
              <Title level={4} fontSize={"text-lg"}>
                Loading...
              </Title>
            ) : (
              teacher
            )}
          </div>

          {ActiveTeacherCart > -1 && teacher.length > 0 && (
            <DashboardCalendar data={Teachers[ActiveTeacherCart]} />
          )}
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
