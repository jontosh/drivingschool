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

  return { PackageSelectionArray, ClassSelectionArray };
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
    !values.middle_name ||
    !values.address ||
    !values.zip ||
    !values.home_phone_1 ||
    !values.home_phone_2 ||
    !values.gender ||
    !values.preferred_pronoun ||
    !values.condition ||
    !values.driving_notes ||
    !values.permit ||
    !values.permit_expiration ||
    !values.permit_issued ||
    !values.scheduling ||
    !values.payment ||
    !values.date ||
    !values.parent_name ||
    !values.parent_phone ||
    !values.home_drop_off ||
    !values.student_notes ||
    !values.city
  ) {
    errors.error = "Input is empty";
  }

  return errors;
};
