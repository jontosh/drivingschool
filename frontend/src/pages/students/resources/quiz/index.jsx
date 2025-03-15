import { setActiveNav } from "@/modules/active-nav.jsx";
import { NavLink, Outlet, useParams } from "react-router-dom";

const Quiz = () => {
  return <Outlet />;
};

export const QuizView = () => {
  const { studentId } = useParams();

  return (
    <div className="bg-white p-5 rounded-xl space-y-5">
      <div className="flex flex-wrap gap-x-5 px-5 -mt-5 -mx-5 border-b border-b-gray-400">
        <NavLink
          to={`/student/resource/quiz/${studentId}/view/exams`}
          className={setActiveNav}
        >
          Exams
        </NavLink>
        <NavLink
          to={`/student/resource/quiz/${studentId}/view/results`}
          className={setActiveNav}
        >
          Test Results
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default Quiz;
