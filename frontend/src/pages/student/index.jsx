import Title, { Paragraph } from "@/components/title/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { Form, Input, Tooltip, Select } from "antd";
import { Fragment, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiFillCar,
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlineMoneyCollect,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

const HeaderLinks = [
  {
    link: "/admin/student/account/profile",
    label: "Profile",
  },
  {
    link: "/admin/student/account/billing/",
    label: "Enrollment/Billing",
  },
  {
    link: "/admin/student/account/appointments",
    label: "Appointments",
  },
  {
    link: "/admin/student/account/files",
    label: "Files",
  },
  {
    link: "/admin/student/account/messages",
    label: "Messages",
  },
  {
    link: "/admin/student/account/tests",
    label: "Quiz/Tests",
  },
  {
    link: "/admin/student/account/log",
    label: "Activity Log",
  },
];

const StudentAccount = () => {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const studentId = useURLSearchParams("studentId");

  const { data: StudentData } = useRequestGetQuery({
    path: "/student_account/student/",
  });
  const { data: GetStudentData } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
  });
  const [Search, setSearch] = useState("");

  const { Data: filteredData } = useFilterStatus({
    data: StudentData,
    status: null,
    search: Search,
  });

  const onFinish = (values) => setSearch(values.search);

  const students = useMemo(
    () => (Search.trim() !== "" ? filteredData : []),
    [Search],
  );

  const studentData = students.map((item, index) => (
    <li
      key={index}
      onClick={() => {
        setSearch("");
        form.resetFields();
      }}
    >
      <Link to={`/admin/student/account/profile?studentId=${item.id}`}>
        {item?.first_name} {item?.last_name}
      </Link>
    </li>
  ));

  const headersLink = HeaderLinks.map((item, index) => (
    <NavLink to={item.link + search} key={index} className={setActiveNav}>
      {item.label}
    </NavLink>
  ));

  return (
    <Fragment>
      <Helmet>
        <title>Student Account</title>
      </Helmet>

      <section className="px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full">
        <Title
          level={2}
          fontSize="text-indigo-600 text-4xl"
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Student Account
        </Title>

        <Title
          level={3}
          fontSize="text-indigo-600 text-2xl"
          fontWeightStrong={500}
          titleMarginBottom={20}
        >
          Quick search
        </Title>

        <div className="mb-5 flex gap-5 flex-wrap">
          <Form form={form} onFinish={onFinish} className={"flex-grow"}>
            <Form.Item
              name={"search"}
              className={"mb-0"}
              rules={[
                {
                  required: true,
                  message: "Search is required",
                },
              ]}
            >
              <Input
                className={"h-[50px]"}
                placeholder={"Search"}
                prefix={<AiOutlineSearch className={"text-xl"} />}
                onChange={(event) => setSearch(event.target.value)}
                allowClear
                enterButton="Search"
              />
            </Form.Item>

            {studentData.length !== 0 && (
              <ul className={"p-5 bg-white "}>{studentData}</ul>
            )}
          </Form>

          {studentId && (
            <div className={"flex-grow flex items-center gap-5"}>
              <div className="space-y-2">
                <Title level={2} fontSize={"text-indigo-600 text-xl"}>
                  {GetStudentData?.first_name} {GetStudentData?.last_name}
                </Title>

                <Paragraph fontSize={"text-xl"} fontWeightStrong={500}>
                  Balance <span className={"text-emerald-600"}>$699</span>
                </Paragraph>
              </div>

              <Tooltip className={"w-9"}
                title={
                  <div className="space-y-2.5">
                    <p>Account created: 09/13/2023 at 1:37 pm</p>
                    <p>Last modifled: 09/13/2023 at 1:37 pm</p>
                  </div>
                }
                overlayInnerStyle={{ width: 270 }}
              >
                <AiOutlineInfoCircle className={"text-indigo-600"} />
              </Tooltip>

              <Tooltip
                className={"w-9"}
                title={
                  <table>
                    <thead className="flex gap-12">
                      <th>
                        <tr>Enrolled</tr>
                      </th>
                      <th>
                        <tr>Price</tr>
                      </th>
                      <th>
                        <tr>Package</tr>
                      </th>
                      <th>
                        <tr>CR Date</tr>
                      </th>
                    </thead>
                    <tbody className="flex gap-8">
                      <th className="font-normal">
                        <tr>03/09/2024</tr>
                      </th>
                      <th className="font-normal">
                        <tr>$649.99</tr>
                      </th>
                      <th className="font-normal">
                        <tr>8h in car instruction</tr>
                      </th>
                    </tbody>
                  </table>
                }
                overlayInnerStyle={{ width: 400 }}
              >
                <AiOutlineShoppingCart className={"text-indigo-600"} />
              </Tooltip>

              <Tooltip
                className={"w-9"}
                title={
                  <div className="flex space-x-5">
                    <p>Enrolled</p>
                    <p>Price</p>
                    <p>Package</p>
                  </div>
                }
              >
                <AiOutlineMoneyCollect className={"text-indigo-600"} />
              </Tooltip>

              <Tooltip
                className={"w-9"}
                title={
                  <div className="space-y-5">
                    <p className="font-bold text-sm">BTW Balance: <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Driwing <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Web <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Confirmed <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Complete <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Pending <span className="font-normal">8:00 Hours</span></p>
                    <p className="font-bold text-sm">Total purchased <span className="font-normal">8:00 Hours</span></p>
                  </div>
                }
              >
                <AiOutlineBook className={"text-indigo-600"} />
              </Tooltip>

              <Tooltip
                className={"w-9"}
                title={
                  <div className="space-y-2">
                    <p>Activated</p>
                    <p>Not Activated</p>
                    <p>Completed</p>
                    <p>Potential</p>
                    <p>Web Signup</p>
                    <p>Pending</p>
                  </div>
                }
              >
                <AiFillCar className={"text-indigo-600"} />
              </Tooltip>

              <Select
                className={"w-48 h-[50px]"}
                placeholder={"Select"}
                size={"large"}
                value={"Apply Payment"}
                options={[
                  { value: "CARD", label: "Card" },
                  { value: "CARD", label: "Card" },
                  { value: "CARD", label: "Card" },
                ]}
              />
            </div>
          )}
        </div>

        {studentId && (
          <div className="bg-white rounded-2xl">
            <div className="px-5 border-b flex gap-5">{headersLink}</div>

            <div className="p-5">
              <Outlet />
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default StudentAccount;
