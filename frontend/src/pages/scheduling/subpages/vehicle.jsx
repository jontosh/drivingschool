import { BigCalendar } from "@/pages/scheduling/calendar/big-calendar.jsx";
import { VehicleSidebar } from "@/pages/scheduling/calendar/vehicle-sidebar.jsx";
import { Fragment, useState } from "react";

export const Vehicle = () => {
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
          <VehicleSidebar />
        </div>
        <div>
          <BigCalendar handleBurger={handleBurger} />
        </div>
      </div>
    </Fragment>
  );
};
