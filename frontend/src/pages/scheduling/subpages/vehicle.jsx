import { BigCalendar } from "@/pages/scheduling/subpages/big-calendar.jsx";
import { VehicleSidebar } from "@/pages/scheduling/subpages/vehicle-sidebar.jsx";
import { Fragment, useState } from "react";

export const Vehicle = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const handleBurger = () => setIsOpen((prev) => !prev);
  return (
    <Fragment>
      <div className={"flex bg-white"}>
        <div className={"w-64 flex-shrink-0"} hidden={!IsOpen}>
          <VehicleSidebar />
        </div>
        <div>
          <BigCalendar handleBurger={handleBurger} />
        </div>
      </div>
    </Fragment>
  );
};
