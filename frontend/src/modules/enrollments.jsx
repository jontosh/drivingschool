import { Paragraph } from "@/components/title/index.jsx";

export const EnrollmentsSelections = () => {
  const PackageSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      hours: 74,
      price: 169,
      value: 1,
    },
    {
      id: 2,
      label: "10h in car instruction",
      hours: 74,
      price: 209,
      value: 2,
    },
    {
      id: 3,
      label: "3h in car instruction",
      hours: 15,
      price: 103,
      value: 3,
    },
  ];

  const ClassSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      value: 1,
      price: 169,
    },
    {
      id: 2,
      label: "10h in car instruction",
      value: 2,
      price: 209,
    },
    {
      id: 3,
      label: "3h in car instruction",
      value: 3,
      price: 103,
    },
  ];

  const StudentInfoTypeOptions = [
    { value: "TEEN", label: "TEEN" },
    { value: "ADULT", label: "ADULT" },
    { value: "KNOWLEDGE", label: "KNOWLEDGE" },
    { value: "ROAD TEST", label: "ROAD TEST" },
  ];

  return { PackageSelectionArray, ClassSelectionArray, StudentInfoTypeOptions };
};

export const FormValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.parent_email) {
    errors.email = "Email is empty";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.parent_email)
  ) {
    errors.email = "Invalid email address";
  }

  if (
    !values.studentId ||
    !values.first_name ||
    !values.last_name ||
    !values.mid_name ||
    !values.address ||
    !values.zip ||
    !values.home_phone ||
    !values.cell_phone ||
    !values.gender ||
    !values.dl_permit ||
    // !values.scheduling ||
    // !values.payment ||
    !values.parent_name ||
    !values.parent_phone ||
    // !values.home_drop_off ||
    !values.read_and_agreed ||
    !values.city
  ) {
    errors.error = "Input is empty";
  }

  return errors;
};

export const StudentAccountEnrollment = () => {
  const column = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          ${text}
        </Paragraph>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Database Id",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      date: "4/2/2024",
      amount: 649.99,
      type: "Visa",
      id: 162,
    },
  ];

  return { column, data };
};

export const StudentAccountBilling = () => {
  const column = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          ${text}
        </Paragraph>
      ),
    },
    {
      title: "Assept by stuff",
      dataIndex: "stuff",
      key: "stuff",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Payment Note",
      dataIndex: "note",
      key: "note",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Card Type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Credit card Number",
      dataIndex: "card_number",
      key: "card_number",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
  ];
  const data = [];

  return { column, data };
};
