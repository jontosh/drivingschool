import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { useContext, useMemo, useState } from "react";
import { WeeklyCalendar } from "@/components/calendar/index.jsx";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { useRequestIdQuery } from "@/redux/query/index.jsx";
import dayjs from "dayjs";

export const MySchedule = () => {
  const studentId = useURLSearchParams("studentId");
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentDay, setCurrentDay] = useState(new Date());
  const { data } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });

  const schedules = useMemo(() => {
    if (!data) return [];

    const schedules = data?.appointments
      ?.map((appointment) => {
        return appointment?.time_slot?.slots?.reduce((_, currentValue) => {
          const staff = appointment?.time_slot?.staff;
          return {
            staff: `${staff?.first_name} ${staff?.last_name}`,
            location: appointment?.time_slot?.pu_location,
            start: currentValue?.start,
            end: currentValue?.end,
            week_range: currentValue?.week_range,
            title: currentValue?.name,
            date: dayjs(currentValue?.start).format("YYYY-MM-DD"),
          };
        }, 0);
      })
      .filter(Boolean);

    return schedules;
  }, [data]);

  const schedule = schedules?.map((item, key) => (
    <DrivingItem key={key} item={item} />
  ));

  return (
    <>
      <div className="space-y-5">
        <WeeklyCalendar day={setCurrentDay} />

        <div className="flex items-center gap-2.5">
          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            CLASSES
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            IN-CAR
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            TESTING
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            SHOW CALENDAR
          </ButtonComponent>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4 gap-5">
          {schedule}
        </div>
      </div>
    </>
  );
};
