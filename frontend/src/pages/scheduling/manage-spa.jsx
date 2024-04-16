import { useParams } from "react-router-dom";

export const ManageSpa = () => {
  const { title } = useParams();

  return (
    <section className={`px-11 space-y-5 max-w-full w-full`}>{title}</section>
  );
};
