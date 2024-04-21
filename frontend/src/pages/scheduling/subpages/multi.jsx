import { MultiTableCalendar } from "@/pages/scheduling/calendar/multi-table-calendar.jsx";
import { SingleMultiSidebar } from "@/pages/scheduling/calendar/single-multi-sidebar.jsx";
import { Fragment, useState } from "react";

export const Multi = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const handleBurger = () => setIsOpen((prev) => !prev);
  return (
    <Fragment>
      <div
        className={
          "flex bg-white rounded-xl border border-gray-400 overflow-hidden"
        }
      >
        <div
          className={"w-64 flex-shrink-0 border-r border-r-gray-400"}
          hidden={!IsOpen}
        >
          <SingleMultiSidebar />
        </div>
        <div className={"flex-grow"}>
          <MultiTableCalendar />
        </div>
      </div>
    </Fragment>
  );
};
