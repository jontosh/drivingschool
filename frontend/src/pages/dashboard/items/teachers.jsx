import { CustomInput } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import DashboardStyle from "@/pages/dashboard/dashboard.module.scss";
import { DashboardCalendar } from "@/pages/dashboard/items/calendar.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbAlertCircle } from "react-icons/tb";
import TeacherAvatar from "../../../assets/user/teacher.jpeg";

export const DashboardTeachers = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data = [] } = useRequestGetQuery({ path: "/instructor" });
  const [Instructors, setInstructors] = useState([]);
  const [Instructor, setInstructor] = useState({});
  const handleInstructor = (item) => setInstructor(item);

  const instructor = Instructors.map((instructor, index) => (
    <Fragment key={index}>
      {/*Teacher Avatar Start*/}
      <div
        className={`w-20 cursor-pointer`}
        onClick={() => handleInstructor(instructor)}
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
        <Title
          fontSize={"text-base"}
          className={"min-h-12"}
          level={5}
          fontWeightStrong={500}
        >
          {instructor.first_name}
        </Title>
      </div>
      {/*Teacher Avatar end*/}
    </Fragment>
  ));

  return (
    <Fragment>
      <Formik
        initialValues={{
          search: "",
        }}
        validate={(values) => {
          const errors = {};
          if (values.search === "") {
            errors.search = "Error input is empty";
            setInstructors([]);
            setInstructor({});
          }
          return errors;
        }}
        onSubmit={(values) => {
          const instructors = data.filter((instructor) =>
            instructor.first_name
              ?.toLowerCase()
              .includes(values.search?.toLowerCase()),
          );

          setInstructors(instructors);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          errors,
          touched,
        }) => {
          return (
            <form className={`mb-7`} onSubmit={handleSubmit}>
              <div className="flex">
                <Title
                  fontSize={"text-base"}
                  fontWeightStrong={500}
                  className={"w-24"}
                >
                  Teachers
                </Title>
                <div>
                  <label className={"relative"}>
                    <CustomInput
                      colorBorder={colorsObject.primary}
                      placeholder={"Search"}
                      className={`w-96 pl-12 pr-4 text-sm  ${errors.search && "border border-[#FF9D83]"}`}
                      value={values.search}
                      name={"search"}
                      onChange={handleChange}
                    />

                    <span
                      className={
                        "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                      }
                    >
                      <AiOutlineSearch />
                    </span>
                  </label>
                  {errors.search && touched.search && (
                    <IconComponent
                      vertical={"items-center"}
                      spaceIconX={2}
                      icon={<TbAlertCircle />}
                      className={`text-[#FF3932] text-xs flex items-center mt-2.5 cursor-text`}
                    >
                      {errors.search}
                    </IconComponent>
                  )}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>

      {instructor.length > 0 && (
        <Fragment>
          <div
            className={
              "flex items-center gap-x-[60px] overflow-x-hidden pb-[40px]"
            }
          >
            {instructor}
          </div>
          {Instructor.id && (
            <div className={"border-t border-t-gray-500 pt-4"}>
              <DashboardCalendar data={Instructor} />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
