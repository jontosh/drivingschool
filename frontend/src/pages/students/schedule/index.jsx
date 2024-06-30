import IconComponent from "@/components/icons";
import { Paragraph } from "@/components/title/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { Subpages } from "@/modules/subpages.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";

const StudentSchedule = ({ className, children, ...props }) => {
  const { title } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Student - Schedule</title>
      </Helmet>

      <section className={"px-11 max-w-full w-full space-y-8"}>
        <div className="flex items-start gap-x-20">
          <Paragraph fontSize={"bg-[#FFB82F80] rounded-xl p-6 text-xl"}>
            You must cancel at least 24 hours before your appointment, or you
            will be charged a $75 fee. Make sure you have your permit and any
            assistive devices (glasses, contacts, etc.) that you need in order
            to drive.
          </Paragraph>

          <IconComponent
            icon={<IoSettingsOutline />}
            className={"border border-[#5F66E9] rounded-xl px-2.5 pt-2 pb-1"}
            iconWidth={"w-4"}
            iconClass={"text-[#5F66E9]"}
          />
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
