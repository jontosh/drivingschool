import Title from "@/components/title/index.jsx";
import { ConfigBase } from "@/pages/configuration/subpages/config-base.jsx";
import { useParams } from "react-router-dom";

const CheckSubpages = ({ title }) => {
  switch (title?.toLowerCase()) {
    case "company": {
      return <ConfigBase />;
    }
  }
};

const Configuration = () => {
  const { title } = useParams();
  return (
    <section className={`px-11 space-y-5 max-w-full w-full`}>
      <Title
        level={2}
        fontSize={"text-indigo-600 text-4xl"}
        fontWeightStrong={600}
        titleMarginBottom={40}
      >
        Configuration
      </Title>

      <CheckSubpages title={title} />
    </section>
  );
};

export default Configuration;
