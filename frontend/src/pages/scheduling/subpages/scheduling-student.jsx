import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SchedulingModule } from "@/modules/scheduling.jsx";
import { Calendar, Table } from "antd";
import { Formik } from "formik";
import { Fragment, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { PiCalendarThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const FormResult = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = SchedulingModule();
  return (
    <Fragment>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.search) {
            errors.search = "Input is empty";
          }

          return errors;
        }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          return (
            <Fragment>
              <form onSubmit={handleSubmit}>
                <label className={"relative w-full shadow-xl"}>
                  <CustomInput
                    colorBorder={colorsObject.primary}
                    placeholder={"Find student"}
                    className={`w-full pl-12 pr-4 py-2.5 text-sm `}
                    classNames={"w-full"}
                    name={"search"}
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>

                {!errors.search && (
                  <div className={`p-5 bg-white `}>
                    <ButtonComponent
                      defaultHoverBg={"transparent"}
                      defaultBg={colorsObject.main}
                      defaultColor={colorsObject.black}
                      defaultHoverColor={colorsObject.black}
                      paddingInline={24}
                      className={"w-full text-start"}
                      style={{
                        boxShadow: 'none'
                      }}
                    >
                      Aminov Makhsud, 2004, BMR RX6 Teacher, Adult
                    </ButtonComponent>
                  </div>
                )}
              </form>

              {(errors.search || touched.search) && (
                <div className={`text-red-600 p-5 bg-white relative z-10 `}>
                  {errors.search}
                </div>
              )}
            </Fragment>
          );
        }}
      </Formik>
      <div className="bg-white px-8 rounded-xl">
        <div className="space-x-7 -mx-8 px-8 border-b border-b-gray-400">
          <NavLink
            to={""}
            className={"hover:text-indigo-500 text-gray-500 text-xl py-8"}
          >
            Book my lessons
          </NavLink>
          <NavLink
            to={""}
            className={"hover:text-indigo-500 text-gray-500 text-xl py-8"}
          >
            My schedule
          </NavLink>
        </div>

        <div className="space-y-7">
          <div className="space-x-4">
            <NavLink
              to={""}
              className={
                "hover:text-indigo-500 text-gray-500 text-xl py-7 font-medium"
              }
            >
              Book my lesson
            </NavLink>
            <NavLink
              to={""}
              className={
                "hover:text-indigo-500 text-gray-500 text-xl py-7 font-medium"
              }
            >
              Aminov Makhsudjon
            </NavLink>
          </div>

          <ul className={"space-y-2.5"}>
            <li className={"cursor-pointer"}>
              <div className="bg-white shadow-xl py-3 px-8 hover:text-indigo-500 flex justify-between">
                <Paragraph
                  fontSize={"text-base text-inherit"}
                  className={"text-inherit"}
                >
                  Click here to view scheduled lessons
                </Paragraph>
                <span>+</span>
              </div>
            </li>
            <li className={"cursor-pointer"}>
              <div className="bg-white shadow-xl py-3 px-8 hover:text-indigo-500 flex justify-between">
                <Paragraph
                  fontSize={"text-base text-inherit"}
                  className={"text-inherit"}
                >
                  Click here to view scheduled lessons
                </Paragraph>
                <span>+</span>
              </div>
            </li>
          </ul>

          <div className={"grid grid-cols-2"}>
            <div className={"grid grid-cols-2 gap-5"}>
              <Calendar fullscreen={false} className={"shadow-xl"} />
              <Calendar fullscreen={false} className={"shadow-xl"} />
            </div>

            <div className={"flex flex-col gap-5 m-auto"}>
              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.info}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                className={"flex-shrink-0 flex-grow-0"}
                borderRadius={5}
                controlHeight={40}
                style={{
                  width: 210,
                }}
              >
                Refine search
              </ButtonComponent>
              <ButtonComponent
                defaultBg={colorsObject.secondary}
                defaultHoverBg={colorsObject.secondary}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                className={"flex-shrink-0 flex-grow-0"}
                borderRadius={5}
                controlHeight={40}
                style={{
                  width: 210,
                }}
              >
                Clear search
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>

      <div className={"bg-white p-8 rounded-xl"}>
        <div className="flex justify-between">
          <Title level={2} fontSize={"text-indigo-700 flex items-center gap-2"}>
            <IconComponent
              icon={<PiCalendarThin />}
              className={"cursor-text"}
            />
            <span>AVAILABLE OPEN SLOTS</span>
          </Title>

          <div className="space-x-5">
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              className={"flex-shrink-0 flex-grow-0"}
              borderRadius={5}
              controlHeight={40}
              paddingInline={50}
            >
              Refine search
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.secondary}
              defaultHoverBg={colorsObject.secondary}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              className={"flex-shrink-0 flex-grow-0"}
              borderRadius={5}
              controlHeight={40}
              paddingInline={53}
            >
              Clear search
            </ButtonComponent>
          </div>
        </div>

        <Table
          className={"pt-5"}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
    </Fragment>
  );
};

export const SchedulingStudent = () => {
  return (
    <div className={"space-y-5"}>
      <FormResult />
    </div>
  );
};
