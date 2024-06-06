import InstructorAva from "@/assets/user/instructor.jpeg";
import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";
import { Calendar, Dropdown } from "antd";
import { momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import VehicleSidebarStyle from "./../scheduling.module.scss";

export const MultiSidebar = ({ ...props }) => {
  const Time = new Date();
  const { MonthName: Month } = useDate();
  const [MonthName, setMonthName] = useState("");
  const { colorsObject } = useContext(ColorsContext);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState(new Date().getDay());
  const [date, setDate] = useState(new Date().getDate());
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

  const { defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        toolbar: (e) => {
          console.log(e);
          return (
            <div className="flex items-center gap-8 justify-between pb-5">
              <IconComponent
                className={"text-indigo-600"}
                icon={<IoIosArrowBack />}
              />

              <Title fontSize={"text-[#6B7A99]"}>
                {Month(new Date(e.date).getMonth())}
              </Title>

              <IconComponent
                className={"text-indigo-600"}
                icon={<IoIosArrowForward />}
              />
            </div>
          );
        },
      },
      defaultDate: new Date(),
      formats: {
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd DD", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "hh:mm", culture) +
          " " +
          localizer.format(end, "hh:mm a", culture),
      },
      views: [Views.MONTH],
      toolbar: true,
    };
  });

  const dayPropGetter = useCallback((date) => {
    return {
      ...(moment(date).day() > -1 && {
        className: `bg-[#fff]`,
        style: {
          border: "none",
        },
      }),
    };
  }, []);

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
    (date) => ({
      className: "px-2.5 pt-6 text-[#ADB8CC]",
      // ...(moment(date).hour() < 8 && {
      //   style: {
      //     backgroundColor: "powderblue",
      //     color: "black",
      //   },
      // }),
      // ...(moment(date).hour() > 12 && {
      //   style: {
      //     backgroundColor: "darkgreen",
      //     color: "white",
      //   },
      // }),
    }),
    [],
  );

  // const { formattedNumber } = formatPhoneNumber(data?.home_phone);

  return (
    <div className={"border border-gray-400 p-5 rounded-xl"}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          console.log(value.clone().month(0));
          return (
            <Fragment>
              <div className="flex items-center gap-8 justify-between pb-5">
                <IconComponent
                  className={"text-indigo-600"}
                  icon={<IoIosArrowBack />}
                />

                <Title fontSize={"text-[#6B7A99]"}>
                  {months[value.month()]} {Time.getFullYear()}
                </Title>

                <IconComponent
                  className={"text-indigo-600"}
                  icon={<IoIosArrowForward />}
                />
              </div>
            </Fragment>
          );
        }}
      />
    </div>
  );
};
