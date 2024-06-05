import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import BillingStyle from "@/pages/student/student-account.module.scss";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { useContext } from "react";

export const StudentAccountModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/student_account/bill/" });

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
      render: (code) => (
        <Paragraph
          fontWeightStrong={500}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {code}
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
      dataIndex: "acceptedBy",
      key: "acceptedBy",
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
      title: "",
      key: "",
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

  return { data, columns };
};

export const StudentAccountEnrollmentModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/student_account/enrollment/" });
  // /account_management/services/service/
  // /student_account/instructor/

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
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-base"}
          className={"text-center"}
        >
          {id}
        </Paragraph>
      ),
    },
    {
      title: "Data enrolled",
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

  return { data, columns };
};
