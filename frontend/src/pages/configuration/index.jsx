import Title from "@/components/title/index.jsx";
import { ConfigBase } from "@/pages/configuration/subpages/config-base.jsx";
import { PolicySpa } from "@/pages/configuration/subpages/policy-spa.jsx";
import { useNavigate, useParams } from "react-router-dom";

const CheckSubpages = ({ title }) => {
  const navigation = useNavigate();
  switch (title?.toLowerCase()) {
    case "company": {
      return <ConfigBase />;
    }
    case "policies": {
      return <PolicySpa />;
    }

    default: {
      navigation("/configuration");
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
