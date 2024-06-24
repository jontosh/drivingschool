import { Appointments } from "@/pages/students/account/items/appointments.jsx";
import { EnrollmentAndBilling } from "@/pages/students/account/items/enrollment-and-billing.jsx";
import { Files } from "@/pages/students/account/items/files.jsx";
import { Profile } from "@/pages/students/account/items/profile.jsx";

export const TabItems = () => {
  return [
    {
      key: "1",
      label: <span>Profile</span>,
      children: <Profile />,
    },
    {
      key: "2",
      label: <span>Enrollment/Billing</span>,
      children: <EnrollmentAndBilling />,
    },
    {
      key: "3",
      label: <span>Appointments</span>,
      children: <Appointments />,
    },
    {
      key: "4",
      label: <span>Files</span>,
      children: <Files />,
    },
  ].map((item) => {
    return { ...item };
  });
};
