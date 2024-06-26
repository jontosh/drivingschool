import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { FormError } from "@/modules/errors.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { BookOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";
import { NavLink, Outlet, useParams } from "react-router-dom";
import StudentAccountStyle from "./student-account.module.scss";

const StudentAccount = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { title, studentId, subtitle } = useParams();
  const { data } = useRequestGetQuery({ path: "/student_account/student/" });
  const { data: StudentById } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
  });
  const [Search, setSearch] = useState("");
  const [Student, setStudent] = useState(null);
  const { Data } = useFilterStatus({ data, status: null, search: Search });

  useEffect(() => {
    setStudent(StudentById);
  }, [studentId, title, data]);

  const searchItem = Data?.map((item, index) => {
    return (
      <li key={index} className={"cursor-pointer"}>
        <NavLink
          to={`/admin/student/account/profile/${item?.id}`}
          className={setActiveNav}
          onClick={() => {
            setStudent(item);
          }}
        >
          {item.first_name} {item.last_name}, {item.birth}
        </NavLink>
      </li>
    );
  });

  return (
    <Fragment>
      <Helmet>
        <title>Student Account</title>
      </Helmet>
      <section className={classNames(StudentAccountStyle["Student"], "px-11")}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Student Account
        </Title>

        {title && (
          <Title
            level={3}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={500}
            titleMarginBottom={20}
          >
            Quick search
          </Title>
        )}

        <div className="mb-5 flex gap-5 flex-wrap">
          <Formik
            initialValues={{
              search: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.search) {
                errors.search = "Search is empty";
                setStudent(null);
              } else {
                setSearch(values.search);
              }

              return errors;
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className={"flex-grow"}>
                  <label className={"relative w-full"}>
                    <CustomInput
                      colorBorder={colorsObject.main}
                      fontSize="text-base"
                      placeholder={"Find teacher"}
                      classNames={
                        "inline-flex flex-row-reverse items-center gap-5 w-full"
                      }
                      className={`pl-12 pr-4 py-2.5  h-10 text-sm inline-flex flex-row-reverse shadow-xl`}
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
                  {errors.search && (
                    <FormError className={"pl-5 mt-5"}>
                      {errors.search}
                    </FormError>
                  )}
                  {values.search && !Student && (
                    <ul className={"w-full p-5 bg-white rounded-b-2xl"}>
                      {searchItem}
                    </ul>
                  )}
                </div>
              </form>
            )}
          </Formik>

          {studentId && (
            <div>
              <div className={"gap-x-5 flex items-center flex-grow-0"}>
                <div>
                  <Title
                    level={4}
                    fontWeightStrong={600}
                    fontSize={"text-xl text-indigo-600"}
                    titleMarginBottom={7}
                  >
                    {Student?.first_name} {Student?.last_name}
                  </Title>
                  <Paragraph
                    fontSize={"text-xl text-black"}
                    fontWeightStrong={400}
                  >
                    Balance <span className={"text-green-500"}>$699</span>
                  </Paragraph>
                </div>
                <IconComponent
                  icon={<AiOutlineInfoCircle />}
                  className={"text-3xl text-indigo-600"}
                />
                <IconComponent
                  icon={<AiOutlineShoppingCart />}
                  className={"text-3xl text-indigo-600"}
                />
                <IconComponent
                  icon={<PiMoney />}
                  className={"text-3xl text-indigo-600"}
                />

                <IconComponent
                  icon={<BookOutlined />}
                  className={"text-3xl text-indigo-600"}
                />
                <IconComponent
                  icon={<IoCarOutline />}
                  className={"text-3xl text-indigo-600"}
                />
                <CustomSelect
                  placeholder={"Select"}
                  options={[{ value: 1, label: 1 }]}
                  colorBorder={colorsObject.primary}
                  className={"w-[120px] h-[50px]"}
                />
                <CustomSelect
                  placeholder={"Apply Payment"}
                  options={[{ value: "Payme", label: "Payme" }]}
                  colorBorder={colorsObject.primary}
                  className={"w-33 h-[50px]"}
                />
              </div>
            </div>
          )}
        </div>

        <div className={"p-5 bg-white rounded-3xl"}>
          <div
            className={"space-x-6 px-5 -mt-5 -mx-5 border-b border-b-gray-400"}
          >
            <NavLink
              to={`/admin/student/account/profile/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Profile
            </NavLink>

            <NavLink
              to={`/admin/student/account/billing/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Enrollment/Billing
            </NavLink>

            <NavLink
              to={`/admin/student/account/appointments/${studentId ?? "notfound"}/${subtitle ?? "wheel"}`}
              className={setActiveNav}
            >
              Appointments
            </NavLink>

            <NavLink
              to={`/admin/student/account/files/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Files
            </NavLink>

            <NavLink
              to={`/admin/student/account/messages/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Messages
            </NavLink>

            <NavLink
              to={`/admin/student/account/tests/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Quiz/Tests
            </NavLink>

            <NavLink
              to={`/admin/student/account/log/${studentId ?? ""}`}
              className={setActiveNav}
            >
              Activity Log
            </NavLink>
          </div>

          {studentId && (
            <div className="pt-6">
              <Outlet />
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default StudentAccount;
