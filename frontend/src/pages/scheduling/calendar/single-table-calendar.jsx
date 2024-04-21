import { useState, useEffect, Fragment, useMemo, useCallback } from "react";
import "./single-table-calendar.scss";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
// import DayPicker from "react-day-picker";
// import { formatDate } from "react-day-picker/moment";
export const SingleTableCalendar = () => {
  const Time = new Date();
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState(new Date().getDay());
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

  const { formats, views, toolbar } = useMemo(() => {
    return {
      formats: {
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "hh:mm a", culture),
        // " - " +
        // localizer.format(end, "hh:mm a", culture),
      },
      views: [Views.WEEK],
      toolbar: false,
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
      ...((moment(date).day() === 6 || moment(date).day() === 0) && {
        className: "bg-[#F2F2F2]",
      }),
      ...(moment(date).day() > 0 &&
        moment(date).day() < 5 && {
          className: "bg-[#fff]",
        }),
    }),
    [],
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
        defaultView={Views.WEEK}
        defaultDate={new Date()}
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
      />
    </Fragment>
  );
};
