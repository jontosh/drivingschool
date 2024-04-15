import { useParams } from "react-router-dom";

export const SchedulingSpa = () => {
  const { title } = useParams();
  return title;
};
