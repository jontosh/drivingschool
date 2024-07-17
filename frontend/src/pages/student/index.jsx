import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { MoneyModule, ShoppingCartModule } from "@/modules/student-account.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { BookOutlined } from "@ant-design/icons";
import { Form, Tooltip } from "antd";
import classNames from "classnames";
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
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext);
  const { title, studentId, subtitle } = useParams();
  const { columns: ShoppingCartColumns, data: ShoppingCartData } =
    ShoppingCartModule();
  const { columns: MoneyColumns, data: MoneyData } = MoneyModule();
  const { data } = useRequestGetQuery({ path: "/student_account/student/" });
  const { data: StudentById, isLoading } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId ?? 0,
  });
  const [Search, setSearch] = useState(null);
  const [Student, setStudent] = useState(null);
  const { Data } = useFilterStatus({ data, status: null, search: Search });
  const [IsRequired, setIsRequired] = useState(true);

  useEffect(() => {
    setStudent(StudentById);
  }, [studentId, isLoading]);

  const onFinish = (values) => setSearch(values["search"]);

  const searchItem = Data?.map((item, index) => {
    return (
      <li key={index} className={"cursor-pointer"}>
        <NavLink
          to={`/admin/student/account/profile/${item?.id}`}
          className={setActiveNav}
          onClick={() => {
            setStudent(item);
            setSearch(null);
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
      {/* <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}> */}
      <section className={classNames(StudentAccountStyle["Student"], "px-3 sm:px-11")}>
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
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="search"
              className={"mb-0"}
              rules={[
                {
                  required: IsRequired,
                  message: "Please input data",
                },
              ]}
            >
              <CustomInput
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"search"}
                classNames={"w-full"}
                className={"pl-10"}
              >
                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </CustomInput>
            </Form.Item>

            {Search && (
              <ul className={"w-full p-5 bg-white rounded-b-2xl"}>
                {searchItem?.length === 0 ? "Empty..." : searchItem}
              </ul>
            )}
          </Form>

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

                <Tooltip
                  title={
                    <div className={"p-4 space-y-4"}>
                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>

                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>
                    </div>
                  }
                  color={colorsObject.main}
                >
                  <IconComponent
                    icon={<AiOutlineInfoCircle />}
                    className={"text-3xl text-indigo-600"}
                  />
                </Tooltip>

                <Tooltip
                  title={
                    <Fragment>
                      <TableComponent
                        columns={ShoppingCartColumns}
                        data={ShoppingCartData}
                      />
                    </Fragment>
                  }
                  color={colorsObject.main}
                >
                  <IconComponent
                    icon={<AiOutlineShoppingCart />}
                    className={"text-3xl text-indigo-600"}
                  />
                </Tooltip>

                <Tooltip
                  title={
                    <Fragment>
                      <TableComponent columns={MoneyColumns} data={MoneyData} />
                    </Fragment>
                  }
                  color={colorsObject.main}
                >
                  <IconComponent
                    icon={<PiMoney />}
                    className={"text-3xl text-indigo-600"}
                  />
                </Tooltip>

                <Tooltip
                  title={<Paragraph fontSize={"text-black"}>Empty</Paragraph>}
                  color={colorsObject.main}
                >
                  <IconComponent
                    icon={<BookOutlined />}
                    className={"text-3xl text-indigo-600"}
                  />
                </Tooltip>

                <Tooltip
                  title={
                    <div className={"p-4 space-y-4"}>
                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>

                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>

                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>

                      <Paragraph fontSize={"text-black"}>
                        <b>BTW Balance:</b> 8:00 Hours
                      </Paragraph>
                    </div>
                  }
                  color={colorsObject.main}
                >
                  <IconComponent
                    icon={<IoCarOutline />}
                    className={"text-3xl text-indigo-600"}
                  />
                </Tooltip>

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
