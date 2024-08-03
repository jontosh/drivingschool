import Title from "@/components/title/index.jsx";
import { CommunicationSpa } from "@/pages/communication/subpage/communication-spa.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Communication = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Communication</title>
      </Helmet>

      <section className={`px-3 sm:px-11 space-y-5 max-w-full w-full`}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={40}
        >
          Communication
        </Title>

        <div className={"bg-white rounded-2xl px-5 shadow-2xl"}>
          <CommunicationSpa />
        </div>
      </section>
    </Fragment>
  );
};

export default Communication;
