import { DrivingItem } from "@/pages/scheduling/items/items.jsx";

export const StudentMySchedule = ({ ...props }) => {
  return (
    <div className={"grid grid-cols-4 gap-5 max-[1400px]:grid-cols-3 max-[1200px]:grid-cols-2 max-[960px]:grid-cols-1"}>
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
