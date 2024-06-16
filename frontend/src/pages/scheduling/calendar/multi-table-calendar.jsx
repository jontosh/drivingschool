import ButtonComponent from "@/components/button/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";

import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const MultiTable = ({ setLabel, setViews, ...props }) => {
  const Time = new Date();
  const [MonthName, setMonthName] = useState("");
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

  const { formats, defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        resourceHeader: () => {
          return <Fragment>ok</Fragment>;
        },

        toolbar: (e) => {
          console.log(e);

          const GoTo = (value) => e.onNavigate(value);

          setLabel(e.label);

          return (
            <div className={"flex items-center justify-between p-7"}>
              <ButtonComponent
                borderRadius={20}
                defaultBorderColor={"#F5F6F7"}
                defaultHoverBorderColor={"#F5F6F7"}
                defaultColor={"#6B7A99"}
                defaultHoverColor={"#6B7A99"}
                controlHeight={40}
                paddingInline={20}
                onClick={() => GoTo("TODAY")}
              >
                Today
              </ButtonComponent>

              <div className="flex items-center gap-8">
                <ButtonComponent
                  borderRadius={20}
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={12}
                  onClick={() => GoTo("PREV")}
                >
                  <MdKeyboardArrowLeft />
                </ButtonComponent>

                <Title fontSize={"text-[#6B7A99]"}>{e.label}</Title>

                <ButtonComponent
                  borderRadius={20}
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={12}
                  onClick={() => GoTo("NEXT")}
                >
                  <MdKeyboardArrowRight />
                </ButtonComponent>
              </div>
            </div>
          );
        },
      },
      defaultDate: new Date(),
      formats: {
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "hh:mm", culture) +
          " " +
          localizer.format(end, "hh:mm", culture),
      },
      views: [Views.WEEK, Views.MONTH, Views.DAY],
      toolbar: true,
    };
  });

  useEffect(() => {
    setViews(views);
  }, []);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event && {
        // For event config and classNames
        className: `text-[#2C5A41] bg-[#29CC390D] `,
        style: {
          border: "1px solid #29CC39",
        },
      }),

      ...(isSelected && {
        className: "text-white",
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

  const months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });

  useEffect(() => {
    months.map((month, index) => {
      if (index === Time.getMonth()) {
        setMonthName(month.value);
      }
    });
  }, [MonthName]);

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

  return (
    <Fragment>
      <Calendar
        // To selection column and add events
        // selectable
        localizer={localizer}
        events={events}
        // To scroll
        startAccessor="start"
        endAccessor="end"
        // onSelectSlot={handleSelect}
        // onSelectEvent={(event) => alert(event.title)}
        defaultView={Views.WEEK}
        defaultDate={defaultDate}
        //style={{ height: 564 }}
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
