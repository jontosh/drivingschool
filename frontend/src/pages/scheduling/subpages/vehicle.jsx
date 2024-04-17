import { BigCalendar } from "@/pages/scheduling/subpages/big-calendar.jsx";
import { VehicleSidebar } from "@/pages/scheduling/subpages/vehicle-sidebar.jsx";
import { Fragment } from "react";

export const Vehicle = () => {
  return (
    <Fragment>
      <div className={"flex bg-white"}>
        <div className={"w-64 flex-shrink-0"}>
          <VehicleSidebar />
        </div>
        <div>
          <BigCalendar />
        </div>
      </div>
    </Fragment>
  );
};
