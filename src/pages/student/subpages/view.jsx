import Profile from "@/pages/student/subpages/profile.jsx";
import { useParams } from "react-router-dom";

const StudentView = ({}) => {
  const { id, subpage } = useParams();
  switch (subpage.toLowerCase()) {
    case "profile":
      return <Profile />;
    default:
      throw new Error(`Unknown sub page ${page}`);
  }
};

export default StudentView;
