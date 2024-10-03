import { Appointments } from "@/pages/student/appointments.jsx";
import { Billing } from "@/pages/student/billing.jsx";
import { Files } from "@/pages/student/files.jsx";
import { StudentLog } from "@/pages/student/log.jsx";
import { Messages } from "@/pages/student/messages.jsx";
import Profile from "@/pages/student/profile.jsx";
import { Tests } from "@/pages/student/tests.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

const StudentSpa = ({}) => {
  const { title } = useParams();
  const navigate = useNavigate();
  switch (title.toLowerCase()) {
    case "profile": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Profile</title>
          </Helmet>
          <Profile />
        </Fragment>
      );
    }
    case "billing": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Enrollment/Billing</title>
          </Helmet>
          <Billing />
        </Fragment>
      );
    }
    case "appointments": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Appointments</title>
          </Helmet>
          <Appointments />
        </Fragment>
      );
    }
    case "files": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Files</title>
          </Helmet>
          <Files />
        </Fragment>
      );
    }
    case "tests": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Tests</title>
          </Helmet>
          <Tests />
        </Fragment>
      );
    }
    case "messages": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Messages</title>
          </Helmet>
          <Messages />
        </Fragment>
      );
    }
    case "log": {
      return (
        <Fragment>
          <Helmet>
            <title>Student Account - Activity Log</title>
          </Helmet>
          <StudentLog />
        </Fragment>
      );
    }

    default: {
      navigate(`/admin/student/account/profile`);
    }
  }
};

export default StudentSpa;
