import { CustomInput } from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import StudentAccountStyle from "./student-account.module.scss";

const StudentAccount = ({}) => {
  const { colorsObject } = useContext(ColorsContext);
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
        <Title
          level={3}
          fontSize={"text-indigo-600 text-2xl"}
          fontWeightStrong={500}
          titleMarginBottom={20}
        >
          Quick search
        </Title>

        <div className="mb-5">
          <form>
            <label className={"relative shadow-xl"}>
              <CustomInput
                colorBorder={colorsObject.primary}
                placeholder={"Find student"}
                className={`w-96 pl-12 pr-4 text-sm inline-flex flex-row-reverse`}
              />

              <span
                className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
              >
                <AiOutlineSearch />
              </span>
            </label>
          </form>
        </div>

        <div className="bg-white rounded-xl px-5 pb-5">
          <div className="-mx-5 px-5 border-b-2 border-b-gray-400 space-x-12">
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Profile
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Enrollment/Billing
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Appointments
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Files
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Messages
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Quiz/Tests
            </Link>
            <Link className={"text-gray-600 hover:text-indigo-600 py-5"}>
              Activity Log
            </Link>
          </div>

          <div className="pt-6">@todo</div>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentAccount;
