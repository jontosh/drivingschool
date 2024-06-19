import { Subpages } from "@/modules/subpages.jsx";
import { useParams } from "react-router-dom";

const ManagementSpaIndex = () => {
  const { subpage } = useParams();

  return <Subpages page={subpage} />;
};

export default ManagementSpaIndex;
