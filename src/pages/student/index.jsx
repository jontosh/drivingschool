import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import classNames from "classnames";
import { Fragment, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { PiBookBookmarkFill, PiMoney } from "react-icons/pi";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import StudentAccountStyle from "./student-account.module.scss";

const StudentAccount = ({}) => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    navigate("/student/account/profile");
  }, []);

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

        <div className="mb-5 flex gap-5 items-center flex-wrap">
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

          {id && (
            <div className={" gap-x-5 flex items-center"}>
              <div className={`${StudentAccountStyle["Student__info"]}`}>
                <Title
                  level={4}
                  fontWeightStrong={600}
                  fontSize={"text-xl text-indigo-600"}
                  titleMarginBottom={7}
                >
                  Aminov Taminov
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
                icon={<PiBookBookmarkFill />}
                className={"text-3xl text-indigo-600"}
              />

              <IconComponent
                icon={<IoCarOutline />}
                className={"text-3xl text-indigo-600"}
              />

              <CustomSelect
                value={"Select"}
                options={[{ value: 1, label: 1 }]}
                colorBorder={colorsObject.primary}
                style={{ width: 120, height: 40 }}
              />

              <CustomSelect
                value={"Apply Payment"}
                options={[{ value: "Payme", label: "Payme" }]}
                colorBorder={colorsObject.primary}
                style={{ width: 145, height: 40 }}
              />
            </div>
          )}
        </div>

        <Outlet />
      </section>
    </Fragment>
  );
};

export default StudentAccount;
