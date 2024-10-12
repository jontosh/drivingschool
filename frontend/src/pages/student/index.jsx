import Title, { Paragraph } from "@/components/title/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { Form, Input, Tooltip, Select, Descriptions } from "antd";
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
import dayjs from "dayjs";
import TableComponent from "@/components/table/index.jsx";

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

const Enrolled = () => {
  const studentId = useURLSearchParams("studentId");
  const { data: StudentAPI } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });
  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });

  const data = useMemo(() => {
    if (!StudentAPI || !Instructors) return [];

    const newEnrollments = [];

    StudentAPI?.enrolments?.forEach((enrolment) => {
      enrolment?.package?.forEach((pkg) => {
        newEnrollments.push({
          ...enrolment,
          package: pkg?.name,
          cr: enrolment?.cr?.date,
        });
      });
    });

    return newEnrollments;
  }, [StudentAPI, Instructors]);

  const columns = [
    {
      title: "Enrolled",
      key: "data",
      dataIndex: "data",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Package",
      key: "package",
      dataIndex: "package",
    },
    {
      title: "CR date",
      key: "cr",
      dataIndex: "cr",
    },
  ];

  return <TableComponent columns={columns} data={data} />;
};

const items = [
  {
    key: "1",
    label: "BTW Balance:",
    children: "8:00 Hours",
  },
  {
    key: "2",
    label: "Driwing",
    children: "8:00 Hours",
  },
  {
    key: "3",
    label: "Web",
    children: "8:00 Hours",
  },
  {
    key: "4",
    label: "Confirmed",
    children: "8:00 Hours",
  },
  {
    key: "5",
    label: "Complete",
    children: "8:00 Hours",
  },
  {
    key: "6",
    label: "Pending",
    children: "8:00 Hours",
  },
  {
    key: "7",
    label: "Total purchased",
    children: "8:00 Hours",
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

              <Tooltip
                className={"w-9"}
                title={
                  <div className="space-y-2.5">
                    <p>
                      Account created:{" "}
                      {dayjs(GetStudentData?.date_joined).format(
                        "MM/DD/YYYY [at] h:mm A",
                      )}
                    </p>
                    <p>
                      Last login:{" "}
                      {dayjs(GetStudentData?.last_login).format(
                        "MM/DD/YYYY [at] h:mm A",
                      )}
                    </p>
                  </div>
                }
                overlayInnerStyle={{ width: 270 }}
              >
                <AiOutlineInfoCircle className={"text-indigo-600"} />
              </Tooltip>

              <Tooltip
                className={"w-9"}
                title={<Enrolled />}
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
                  <Descriptions
                    column={1}
                    className={"bg-white"}
                    items={items}
                  />
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
