import { Appointments } from "@/pages/scheduling/subpages/appointments.jsx";
import { Corporate } from "@/pages/scheduling/subpages/corporate.jsx";
import { SchedulingStudent } from "@/pages/scheduling/subpages/scheduling-student.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

export const SchedulingSpa = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  switch (title?.toLowerCase()) {
    case "corporate": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Corporate time off</title>
          </Helmet>
          <Corporate />
        </Fragment>
      );
    }
    case "appointments": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Staff appointment list</title>
          </Helmet>
          <Appointments />
        </Fragment>
      );
    }
    case "student": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Student</title>
          </Helmet>
          <SchedulingStudent />
        </Fragment>
      );
    }
    default:
      navigate(-1);
  }
};
