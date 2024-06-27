import { DrivingItem } from "@/pages/scheduling/items/items.jsx";

export const StudentMySchedule = ({ ...props }) => {
  return (
    <div className={"grid grid-cols-4 gap-5"}>
      <DrivingItem />
      <DrivingItem />
      <DrivingItem />
      <DrivingItem />
      <DrivingItem />
      <DrivingItem />
      <DrivingItem />
    </div>
  );
};
