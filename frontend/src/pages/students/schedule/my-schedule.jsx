import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { useRequestIdQuery } from "@/redux/query/index.jsx";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export const StudentMySchedule = () => {
  const { studentId } = useParams();
  const { data } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });

  const timeSlots = useMemo(() => {
    return data?.appointments?.map((item) => {
      return {
        start: item?.time_slot?.slots?.[0]?.start,
        end: item?.time_slot?.slots?.[0]?.end,
        title: item?.time_slot?.slots?.[0]?.name,
        staff: item?.time_slot?.staff?.first_name,
        location: item?.time_slot?.location?.name,
      };
    });
  }, [data]);
  const timeSlot = timeSlots?.map((item, index) => (
    <DrivingItem key={index} item={item} />
  ));
  return (
    <div
      className={
        "grid grid-cols-4 gap-5 max-[1400px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1"
      }
    >
      {timeSlot}
    </div>
  );
};
