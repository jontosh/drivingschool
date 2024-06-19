import Title from "@/components/title/index.jsx";
import { ManageSpa } from "@/pages/scheduling/manage-spa.jsx";
import { useParams } from "react-router-dom";

const Manage = () => {
  const { title } = useParams();

  if (title) {
    return (
      <section className={`px-11 space-y-5 max-w-full w-full`}>
        <div className="space-y-5">
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
          >
            Scheduling
          </Title>

          <Title level={3} fontSize={"text-xl"} fontWeightStrong={500}>
            Manage time slot
          </Title>

          <ManageSpa />
        </div>
      </section>
    );
  }
};

export default Manage;
