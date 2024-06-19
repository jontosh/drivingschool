import ButtonComponent from "@/components/button/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
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
import { SlClock } from "react-icons/sl";

export const Single = () => {
  const { colorsObject } = useContext(ColorsContext);
  const localizer = momentLocalizer(moment);
  const [EventsList, setEventsList] = useState([]);
  const { data: TimeSlot } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const { data: TimeRange } = useRequestGetQuery({
    path: "/scheduling/time_range/",
  });
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

  const { formats, defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        timeGutterHeader: () => {
          return (
            <div className={"flex justify-center min-h-[62px]"}>
              <SlClock className={"w-7 text-[#C3CAD9]"} />
            </div>
          );
        },

        toolbar: (e) => {
          const GoTo = (value) => e.onNavigate(value);

          const handleMode = (value) => {
            e.onView(value);
          };

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

              <div className="flex border border-[#26334D08]">
                <ButtonComponent
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={20}
                  className={"uppercase"}
                  onClick={() => handleMode("month")}
                >
                  MONTH
                </ButtonComponent>

                <ButtonComponent
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={20}
                  className={"uppercase"}
                  onClick={() => handleMode("week")}
                >
                  WEEK
                </ButtonComponent>

                <ButtonComponent
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={20}
                  className={"uppercase"}
                  onClick={() => handleMode("day")}
                >
                  DAY
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
          localizer.format(date, "ddd DD", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "hh:mm", culture) +
          " " +
          localizer.format(end, "hh:mm", culture),
      },
      views: [Views.MONTH, Views.WEEK, Views.DAY],
      toolbar: true,
    };
  });

  return (
    <div className={"bg-white p-5 rounded-xl"}>
      @todo
      <Calendar
        // To selection column and add events
        // selectable
        localizer={localizer}
        events={EventsList}
        // To scroll
        startAccessor="start"
        endAccessor="end"
        // onSelectSlot={handleSelect}
        // onSelectEvent={(event) => alert(event.title)}
        defaultView={Views.WEEK}
        defaultDate={defaultDate}
        style={{ height: 850 }}
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
    </div>
  );
};
