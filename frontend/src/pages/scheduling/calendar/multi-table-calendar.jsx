import Title from "@/components/title/index.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useRequestGetQuery } from "@/redux/query/index.jsx";

export const MultiTable = ({ instructor, student, date }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const { data: Appointments } = useRequestGetQuery({
    path: "/scheduling/appointment/",
  });
  const { data: TimeSlot } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });

  const EventsList = useMemo(() => {
    if (!Appointments || !TimeSlot) return [];

    return Appointments.flatMap((appointment) =>
      appointment.student.includes(student)
        ? TimeSlot.filter(
            (timeSlot) => timeSlot.id === appointment.time_slot,
          ).flatMap((timeSlot) =>
            timeSlot.slots.map((item) => ({
              title: item.name,
              start: new Date(item.start),
              end: new Date(item.end),
            })),
          )
        : [],
    );
  }, [Appointments, TimeSlot, student]);

  useEffect(() => {
    setEvents(EventsList);
  }, [EventsList]);

  const { formats, defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        toolbar: () => (
          <Title
            level={2}
            className={"text-center p-7"}
            fontSize={"text-[#6B7A99]"}
          >
            {instructor?.first_name} {instructor?.last_name}
          </Title>
        ),
      },
      defaultDate: new Date(),
      formats: {
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          `${localizer.format(start, "hh:mm", culture)} - ${localizer.format(
            end,
            "hh:mm",
            culture,
          )}`,
      },
      views: [Views.DAY],
      toolbar: true,
    };
  }, [instructor]);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      className: `text-[#2C5A41] bg-[#29CC390D] ${
        isSelected ? "text-white" : ""
      }`,
      style: { border: "1px solid #29CC39" },
    }),
    [],
  );

  const dayPropGetter = useCallback(
    (date) => ({
      className: `bg-[#fff] ${CalendarStyle["rbc-header"]}`,
    }),
    [],
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: { minHeight: 80 },
    }),
    [],
  );

  const slotPropGetter = useCallback(
    () => ({
      className: "px-2.5 pt-6 text-[#ADB8CC]",
    }),
    [],
  );

  return (
    <div className="min-w-64 w-full">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.DAY}
        defaultDate={defaultDate}
        date={date}
        views={views}
        formats={formats}
        toolbar={toolbar}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
        showMultiDayTimes
        slotGroupPropGetter={slotGroupPropGetter}
        slotPropGetter={slotPropGetter}
        components={components}
      />
    </div>
  );
};
