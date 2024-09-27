import Title from "@/components/title/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, Outlet, useParams } from "react-router-dom";

const Quiz = () => {
  return <Outlet />;
};

export const QuizView = () => {
  const { studentId } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>Student - Exams</title>
      </Helmet>
      <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          Exams
        </Title>
        <div className="bg-white p-5 rounded-xl space-y-5">
          <div className="flex flex-wrap gap-x-5 px-5 -mt-5 -mx-5 border-b border-b-gray-400">
            <NavLink
              to={`/student/resource/quiz/${studentId ?? 0}/view/exams`}
              className={setActiveNav}
            >
              Exams
            </NavLink>
            <NavLink
              to={`/student/resource/quiz/${studentId ?? 0}/view/results`}
              className={setActiveNav}
            >
              Test Results
            </NavLink>
          </div>

          <Outlet />
        </div>
      </section>
    </Fragment>
  );
};

export default Quiz;
