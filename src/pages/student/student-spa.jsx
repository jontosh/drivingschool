import { useParams } from "react-router-dom";

const StudentSpa = ({}) => {
  const { title } = useParams();
  return title;
};

export default StudentSpa;
