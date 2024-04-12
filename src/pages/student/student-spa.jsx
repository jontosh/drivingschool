import { Billing } from "@/pages/student/billing.jsx";
import Profile from "@/pages/student/profile.jsx";
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

    default: {
      navigate("/student/account/");
    }
  }
};

export default StudentSpa;
