import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import BillingStyle from "@/pages/student/student-account.module.scss";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { useContext, useMemo } from "react";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const StudentAccountModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const studentId = useURLSearchParams("studentId");

  const { data: StudentAPI } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "data",
      key: "data",
      align: "center",
      render: (text) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {price}
        </Paragraph>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (price) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {price}
        </Paragraph>
      ),
    },
    {
      title: "Database Id",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {id}
        </Paragraph>
      ),
    },
    {
      title: "Accepted by staff",
      dataIndex: "staff",
      key: "staff",
      align: "center",
      render: (by) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {by}
        </Paragraph>
      ),
    },
    {
      title: "Payment note",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (notes) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {notes}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <div className={"text-center"}>
          <CustomSelect
            selectorBg={colorsObject.info}
            className={`${BillingStyle["Billing__select"]}`}
            colorBorder={colorsObject.info}
            placeholder={"Status"}
            options={[
              {
                value: "Edit",
                label: "Edit",
              },
              {
                value: "Delete",
                label: "Delete",
              },
              {
                value: "Print",
                label: "Print",
              },
              {
                value: "Email",
                label: "Email",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return { data: StudentAPI?.bills, columns };
};

export const StudentAccountEnrollmentModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const studentId = useURLSearchParams("studentId");

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: StudentAPI } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });

  const enrolments = useMemo(() => {
    if (!StudentAPI || !Instructors) return [];

    const newEnrolments = [];
    StudentAPI?.enrolments?.forEach((enrolment) => {
      enrolment?.package?.forEach((pkg) => {
        const staff = Instructors?.find(
          (instructor) => instructor?.id === enrolment?.by,
        );
        newEnrolments.push({
          ...enrolment,
          package: pkg?.name,
          by: `${staff?.first_name} ${staff?.last_name}`,
        });
      });
    });
    return newEnrolments;
  }, [StudentAPI, Instructors]);

  const columns = [
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      align: "center",
      render: (text) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (code) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {code}
        </Paragraph>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          ${price}
        </Paragraph>
      ),
    },
    {
      title: "Database Id",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (code) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {code}
        </Paragraph>
      ),
    },
    {
      title: "Date enrolled",
      dataIndex: "data",
      key: "data",
      align: "center",
      render: (time) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {time}
        </Paragraph>
      ),
    },
    {
      title: "Enrolled by",
      dataIndex: "by",
      key: "by",
      align: "center",
      render: (by) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {by}
        </Paragraph>
      ),
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (notes) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {notes}
        </Paragraph>
      ),
    },
    {
      render: (_, record) => (
        <div className={"text-center"}>
          <CustomSelect
            selectorBg={colorsObject.info}
            className={`${BillingStyle["Billing__select"]}`}
            colorBorder={colorsObject.info}
            placeholder={"Status"}
            options={[
              {
                value: "ACTIVE",
                label: "ACTIVE",
              },
              {
                value: "DELETED",
                label: "DELETED",
              },
              {
                value: "INACTIVE",
                label: "INACTIVE",
              },
              {
                value: "PENDING",
                label: "PENDING",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return { data: enrolments, columns };
};

export const AccountActivitiesModule = () => {
  const columns = [
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      render: (date) => <Paragraph fontSize={"text-base"}>{date}</Paragraph>,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      align: "center",
      render: (activity) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {activity}
        </Paragraph>
      ),
    },
    {
      title: "Browser",
      dataIndex: "browser",
      key: "browser",
      align: "center",
      render: (browser) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {browser}
        </Paragraph>
      ),
    },
    {
      title: "From IP",
      dataIndex: "IP",
      key: "IP",
      align: "center",
      render: (IP) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {IP}
        </Paragraph>
      ),
    },
  ];

  const data = [
    {
      date: "Mar 14, 2024 @ 1:29 pm EST",
      activity: "Student LogOut",
      browser: "Chrome",
      IP: "109.207.249.165:38314",
    },
    {
      date: "Mar 14, 2024 @ 1:29 pm EST",
      activity: "Student LogOut",
      browser: "Chrome",
      IP: "109.207.249.165:38314",
    },
  ];

  return { data, columns };
};

export const ShoppingCartModule = () => {
  const columns = [
    {
      title: "Enrolled ",
      dataIndex: "enrolled",
      key: "enrolled",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Price ",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          ${text}
        </Paragraph>
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "CR Date",
      dataIndex: "cr",
      key: "cr",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {text}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      enrolled: "03/09/2024",
      price: 649.99,
      package: "8h in car instruction",
    },
  ];

  return { columns, data };
};

export const MoneyModule = () => {
  const columns = [
    {
      title: "Enrolled ",
      dataIndex: "enrolled",
      key: "enrolled",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Price ",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          ${text}
        </Paragraph>
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      align: "center",
      render: (text) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {text}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      enrolled: "03/09/2024",
      price: 649.99,
      package: "8h in car instruction",
    },
  ];

  return { columns, data };
};
