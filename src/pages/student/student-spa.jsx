import Profile from "@/pages/student/profile.jsx";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentSpa = ({}) => {
  const { title } = useParams();
  const navigate = useNavigate();
  switch (title.toLowerCase()) {
    case "profile": {
      return (
        <Fragment>
          <Profile />
        </Fragment>
      );
    }

    default: {
      navigate("/student/account/");
    }
  }
};

export default StudentSpa;
