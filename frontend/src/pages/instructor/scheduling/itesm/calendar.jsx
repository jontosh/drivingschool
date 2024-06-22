import ButtonComponent from "@/components/button/index.jsx";
import Title from "@/components/title/index.jsx";
import { formatPhoneNumber } from "@/modules/formatter.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";
import { useState, useEffect, Fragment, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlClock } from "react-icons/sl";

export const LineCalendar = ({ data, ...props }) => {
  const Time = new Date();
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  let EventsList = [
    {
      title: "Event Name",
      start: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        4,
        0,
        0,
      ),
      end: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        6,
        0,
        0,
      ),
      allDay: false,
    },
    {
      title: "Event Name",
      start: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        6,
        0,
        0,
      ),
      end: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        7,
        30,
        0,
      ),
      allDay: false,
    },
    {
      title: "Event Name",
      start: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        16,
        0,
        0,
      ),
      end: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        18,
        0,
        0,
      ),
      allDay: false,
    },
    {
      title: "Event Name",
      start: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        20,
        0,
        0,
      ),
      end: new Date(
        Time.getFullYear(),
        Time.getMonth(),
        Time.getDate(),
        22,
        30,
        0,
      ),
      allDay: false,
    },
  ];

  useEffect(() => {
    setEvents(EventsList);
  }, []);

  const handleSelect = (eventItem) => {
    const title = window.prompt("New Event name");
    if (title) {
      let data = { title: title, start: eventItem.start, end: eventItem.end };
      setEvents((events) => [...events, data]);
    }
  };

  const { formats, defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        timeGutterHeader: () => {
          return "";
        },

        toolbar: () => "",
      },
      defaultDate: new Date(),
      formats: {
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd DD", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "hh:mm", culture) +
          " " +
          localizer.format(end, "hh:mm", culture),
      },
      views: [Views.DAY],
      toolbar: true,
    };
  });

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event && {
        // For event config and classNames
        className: "text-[#2C5A41] bg-[#BDFFDB] border-[#8FDCB2]",
      }),
    }),
    [],
  );

  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).day() > -1 && {
        className: `bg-[#fff] ${CalendarStyle["rbc-header"]}`,
      }),
    }),
    [],
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 80,
      },
    }),
    [],
  );

  const slotPropGetter = useCallback(
    () => ({
      className: "px-2.5 pt-6 text-[#ADB8CC]",
    }),
    [],
  );

  const { formattedNumber } = formatPhoneNumber(
    data?.home_phone ?? data?.cell_phone,
  );

  return (
    <Fragment>
      <Calendar
        // To selection column and add events
        selectable
        localizer={localizer}
        events={events}
        // To scroll
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        // onSelectEvent={(event) => alert(event.title)}
        defaultView={Views.DAY}
        defaultDate={defaultDate}
        style={{ height: 810 }}
        views={views}
        formats={formats}
        // {/*Header toolbar*/}
        toolbar={toolbar}
        //{/*Event Item*/}
        eventPropGetter={eventPropGetter}
        //{/*Day column*/}
        dayPropGetter={dayPropGetter}
        showMultiDayTimes
        // Slot
        slotGroupPropGetter={slotGroupPropGetter}
        slotPropGetter={slotPropGetter}
        //compo
        components={components}
      />
    </Fragment>
  );
};
