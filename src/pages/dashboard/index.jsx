import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Button, Checkbox, ConfigProvider } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineCloudUpload,
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineSolution,
} from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaBars, FaRegListAlt } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import DashboardStyle from "./dashboard.module.scss";
import DollarIcon from "../../assets/icons/Dollar.svg";
import Studying from "../../assets/icons/User.svg";
import Register from "../../assets/icons/Profile.svg";
import TeacherAvatar from "../../assets/user/teacher.jpeg";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverviewChart = ({ data, options }) => {
  return (
    <Fragment>
      <Bar data={data} options={options}></Bar>
    </Fragment>
  );
};

const DashboardFormik = () => (
  <Formik
    initialValues={{
      search: "",
    }}
    validate={(values) => {
      const errors = {};
      if (values.search === "") {
        errors.search = "Error input is empty";
      }
      return errors;
    }}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({ values, handleBlur, handleSubmit, handleChange, errors, touched }) => {
      return (
        <form
          className={`${DashboardStyle["Dashboard__form"]}`}
          onSubmit={handleSubmit}
        >
          <label className={`relative w-full mb-5`}>
            <input
              value={values.search}
              type={"text"}
              name={"search"}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Find student"}
              className={`${DashboardStyle["Dashboard__form-input"]} rounded-lg inline-block w-full outline-0 px-12 py-2.5 bg-white border-2 ${errors.search && touched.search && "border-red-600 "}`}
            />

            <span
              className={`absolute w-4 h-4 left-4 ${DashboardStyle["Dashboard__form-search"]}`}
            >
              <AiOutlineSearch />
            </span>
          </label>

          {errors.search && touched.search && (
            <div className={`text-red-600 mb-5`}>{errors.search}</div>
          )}

          <Checkbox.Group>
            <Checkbox name={"checkbox"}>Active students only</Checkbox>
          </Checkbox.Group>
        </form>
      );
    }}
  </Formik>
);

const DashboardTeachers = () => {
  return (
    <Formik
      initialValues={{
        search: "",
      }}
      validate={(values) => {
        const errors = {};
        if (values.search === "") {
          errors.search = "Error input is empty";
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleBlur, handleChange, errors, touched }) => {
        return (
          <form
            className={`${DashboardStyle["Dashboard__teachers-form"]} mb-7`}
          >
            <div className="flex items-center">
              <Title
                fontSize={"text-base"}
                fontWeightStrong={500}
                className={"w-24"}
              >
                Teachers
              </Title>
              <label className={`relative`}>
                <input
                  value={values.search}
                  type={"text"}
                  name={"search"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={"Find teacher"}
                  className={`${DashboardStyle["Dashboard__form-input"]} rounded-lg inline-block outline-0 px-12 py-2.5 bg-white border-2 ${errors.search && touched.search && "border-red-600 "}`}
                />

                <span
                  className={`absolute w-4 h-4 left-4 ${DashboardStyle["Dashboard__form-search"]}`}
                >
                  <AiOutlineSearch />
                </span>
              </label>
            </div>
            {errors.search && touched.search && (
              <div className={`text-red-600`}>{errors.search}</div>
            )}
          </form>
        );
      }}
    </Formik>
  );
};

const Dashboard = () => {
  const date = new Date();
  const { colorsObject } = useContext(ColorsContext);

  const [ShowCalendar, setSowCalendar] = useState(false);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"],
    datasets: [
      {
        label: "Sign ups per day",
        data: [5, 7, 6, 8, 7, 5, 7],
        backgroundColor: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"].map(
          (item, index) => {
            index += 1;

            return index === date.getDay() ? "#5F66E973" : "#D2D2D2BF";
          },
        ),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 600,
          },
          color: "#000",
        },
        align: "start",
      },
    },
  };

  const handleClickTeacher = () => setSowCalendar((prev) => !prev);

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
              <OverviewChart data={data} options={options} />
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
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                className={"w-full"}
                controlHeight={44}
                paddingBlock={9}
              >
                New student
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                className={"w-full"}
                controlHeight={44}
                paddingBlock={9}
              >
                Add new student
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                className={"w-full"}
                controlHeight={44}
                paddingBlock={9}
              >
                Class list
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                className={"w-full"}
                controlHeight={44}
                paddingBlock={9}
              >
                File Managment
              </ButtonComponent>

              <ButtonComponent
                href={"/NotFound"}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                className={"w-full"}
                controlHeight={44}
                paddingBlock={9}
              >
                Built App editing
              </ButtonComponent>
            </ul>
          </div>
        </div>
        <div>
          <div
            className={`${DashboardStyle["Dashboard__teachers"]} p-5 bg-white rounded-lg`}
          >
            <DashboardTeachers />
            <div
              className={`${DashboardStyle["Dashboard__teachers-list"]} px-6 grid grid-cols-9 gap-x-14`}
            >
              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}

              {/*Teacher Avatar Start*/}
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
                onClick={handleClickTeacher}
              >
                <div
                  className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
                >
                  <Image
                    src={TeacherAvatar}
                    srcSet={TeacherAvatar}
                    alt={"Teacher Avatar"}
                  />
                </div>
                <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                  Kate Park
                </Title>
              </div>
              {/*Teacher Avatar end*/}
            </div>
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
                          "inline-flex p-2 gap-x-4 bg-[#0C41FF] text-white"
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

        <div
          className={`${DashboardStyle["Dashboard__data"]} rounded-lg px-12 py-3 bg-white`}
        >
          <div
            className={`${DashboardStyle["Dashboard__data-tabs"]} space-x-9`}
          >
            <IconComponent
              defaultHoverColor={colorsObject.info}
              defaultColor={colorsObject.info}
              className={`space-x-2.5 text-base ${DashboardStyle["Dashboard__data-tab"]} `}
              icon={<AiOutlineCloudUpload className={"text-base"} />}
            >
              Upload files 0
            </IconComponent>

            <IconComponent
              className={`space-x-2.5 text-gray-500 text-base ${DashboardStyle["Dashboard__data-tab"]} `}
              icon={<AiOutlineCloudUpload className={"text-base"} />}
              defaultHoverColor={colorsObject.info}
            >
              Task <span className={"text-red-600"}>18</span>
            </IconComponent>

            <IconComponent
              defaultHoverColor={colorsObject.info}
              className={`space-x-2.5 text-gray-500 text-base ${DashboardStyle["Dashboard__data-tab"]} `}
              icon={<AiOutlineMessage className={"text-base"} />}
            >
              Text message <span className={"text-red-600"}>18</span>
            </IconComponent>

            <IconComponent
              defaultHoverColor={colorsObject.info}
              className={`space-x-2.5 text-gray-500 text-base ${DashboardStyle["Dashboard__data-tab"]} `}
              icon={<AiOutlineSolution className={"text-base"} />}
            >
              Website enrollments <span className={"text-red-600"}>18</span>
            </IconComponent>
          </div>

          <div
            className={`${DashboardStyle["Dashboard__data-result"]} flex-col text-center flex justify-center pt-12 pb-20`}
          >
            <div className={"space-y-4"}>
              <span className={`text-7xl text-[#7D83ED]`}>
                <AiOutlineCloudUpload />
              </span>

              <Title level={4} fontSize={"text-base"} fontWeightStrong={500}>
                There are 0 documents uploaded within last 24 hours.
              </Title>

              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                controlHeight={32}
                paddingInline={15}
                paddingBlock={4}
              >
                Button Title
              </ButtonComponent>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
