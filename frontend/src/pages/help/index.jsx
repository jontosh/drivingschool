import Title from "@/components/title/index.jsx";
import { Table } from "antd";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Help = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Help and Onboarding</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
        >
          Help and Onboarding
        </Title>

        <div className="grid grid-cols-2 gap-9">
          <div className="border border-indigo-600 rounded-xl bg-white py-4 px-5">
            @todo
          </div>
          <div className="border border-indigo-600 rounded-xl bg-white py-4 px-5">
            @todo
          </div>
        </div>

        <div className="border border-indigo-600 rounded-xl bg-white py-4 px-5">
          <div>@todo</div>

          <div className="-mx-5">
            <Table />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Help;
