import Title, { Paragraph } from "@/components/title/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const StudentResource = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Student - Resource</title>
      </Helmet>
      <section className={"px-3 sm:px-11 max-w-full w-full space-y-5"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Resources
        </Title>

        <div className={"space-x-5 border-b border-b-black"}>
          <NavLink to={"/student/resource/in-car"} className={setActiveNav}>
            IN CAR
          </NavLink>

          <NavLink to={"/student/resource/road-test"} className={setActiveNav}>
            ROAD TEST
          </NavLink>

          <NavLink to={"/student/resource/parents"} className={setActiveNav}>
            PARENTS
          </NavLink>
        </div>

        <div className="bg-white p-3 sm:p-5 rounded-xl">
          <div className="bg-[#FFB82F80] rounded-xl p-6">
            <Paragraph fontSize={"text-xl"}>
              After each in-car lesson, we provide students with a comprehensive
              training report to enhance their learning experience. This yellow
              sheet will include a detailed " What to Work On " section,
              specifically tailored to guide your practice sessions with your
              teen between lessons. It outlines the areas of improvement
              identified during their last session, offering clear and
              actionable advice for both the student and the guardian. This
              ensures that every moment spent behind the wheel is constructive
              and focused on developing the necessary skills. The report also
              summarizes the past lesson, highlighting achievements and areas
              for improvement, thereby creating a personalized roadmap to
              becoming a proficient and safe driver.
            </Paragraph>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentResource;
