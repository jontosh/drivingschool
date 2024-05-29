import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Dropdown } from "antd";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  Fragment,
} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { BsPersonFillGear } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlClock } from "react-icons/sl";
import CalendarStyle from "../dashboard.module.scss";
import InstructorAva from "../../../assets/user/instructor.jpeg";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Edit Information
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Time Log
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Add Time off
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Add Slots
      </a>
    ),
  },
];

export const DashboardCalendar = ({ data }) => {
  const Time = new Date();
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
          return (
            <div className={"flex justify-center min-h-[62px]"}>
              <SlClock className={"w-7 text-[#C3CAD9]"} />
            </div>
          );
        },

        toolbar: (e) => {
          console.log(e);
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
                >
                  <MdKeyboardArrowRight />
                </ButtonComponent>
              </div>

              <div className="flex border border-[#26334D08]">
                {e.views.map((item, key) => (
                  <Fragment key={key}>
                    <ButtonComponent
                      defaultBorderColor={"#F5F6F7"}
                      defaultHoverBorderColor={"#F5F6F7"}
                      defaultColor={"#6B7A99"}
                      defaultHoverColor={"#6B7A99"}
                      controlHeight={40}
                      paddingInline={20}
                      className={"uppercase"}
                      onClick={e.onView}
                    >
                      {item}
                    </ButtonComponent>
                  </Fragment>
                ))}
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
          localizer.format(end, "hh:mm a", culture),
      },
      views: [Views.MONTH, Views.WEEK, Views.DAY],
      toolbar: true,
    };
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
      // ...((moment(date).day() === 6 || moment(date).day() === 0) && {
      //   className: "bg-[#F2F2F2]",
      // }),
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
    <Fragment>
      <div className={"flex justify-between items-center"}>
        <div className="flex items-center gap-5">
          <Image
            className={"w-16 h-16 overflow-hidden rounded-full"}
            src={data?.picture ?? InstructorAva}
            srcSet={data?.picture ?? InstructorAva}
          />

          <Title level={2} fontSize={"text-2xl"}>
            {data?.first_name} {data?.last_name}
          </Title>
        </div>

        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <IconComponent
            className={"w-6"}
            icon={<BsPersonFillGear className={"text-xl"} />}
          />
        </Dropdown>
      </div>
      <div className={"overflow-hidden rounded-xl"}>
        <div className="bg-white -mx-1">
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
            style={{ height: 564 }}
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
      </div>
    </Fragment>
  );
};
