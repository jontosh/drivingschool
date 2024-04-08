import { useParams } from "react-router-dom";

const StudentView = ({}) => {
  const { id } = useParams();
  return id;
};

export default StudentView;
