import { Paragraph } from "@/components/title/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { Subpages } from "@/modules/subpages.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";

const StudentSchedule = ({ className, children, ...props }) => {
  const { title } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Student - Schedule</title>
      </Helmet>

      <section className={"px-11 max-w-full w-full space-y-8"}>
        <div className="bg-[#FFB82F80] rounded-xl p-6">
          <Paragraph fontSize={"text-xl"}>
            You must cancel at least 24 hours before your appointment, or you
            will be charged a $75 fee. Make sure you have your permit and any
            assistive devices (glasses, contacts, etc.) that you need in order
            to drive.
          </Paragraph>
        </div>
        <div className={"space-x-5 border-b border-b-black"}>
          <NavLink
            to={"/student/schedule/my-schedule"}
            className={setActiveNav}
          >
            My Schedule
          </NavLink>

          <NavLink
            to={"/student/schedule/book-lessons"}
            className={setActiveNav}
          >
            Book my lessons
          </NavLink>
        </div>

        <div className="bg-white p-5 rounded-xl">
          <Subpages page={title} />
        </div>
      </section>
    </Fragment>
  );
};

export default StudentSchedule;
