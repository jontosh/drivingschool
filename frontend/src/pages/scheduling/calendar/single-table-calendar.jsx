import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Button, ConfigProvider } from "antd";
import {
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
  useContext,
} from "react";
import "./single-table-calendar.scss";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
// import DayPicker from "react-day-picker";
// import { formatDate } from "react-day-picker/moment";
export const SingleTableCalendar = () => {
  const Time = new Date();
  const [MonthName, setMonthName] = useState("");
  const { colorsObject } = useContext(ColorsContext);
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

  return (
    <Fragment>
      <Fragment>
        <div className="p-4 flex justify-between items-center border-b border-b-gray-300">
          <div className={"flex items-center gap-4"}>
            <IconComponent
              className={"flex-shrink-0 text-3xl pt-2"}
              icon={<FaBars />}
              // onClick={handleBurger}
            />

            <Title level={2} fontSize={"text-3xl"}>
              <span>{MonthName}</span> &nbsp;
              <span className={"font-normal"}> {Time.getFullYear()}</span>
            </Title>

            <CustomSelect
              colorBorder={colorsObject.primary}
              placeholder={"Months"}
              colorText={colorsObject.primary}
              options={months}
              className={"h-[50px]"}
            />
          </div>

          <div className={"gap-x-4 inline-flex items-center"}>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#F5F5F5",
                    defaultHoverBg: "#F5F5F5",
                  },
                },
              }}
            >
              <Button shape={"circle"} icon={<AiOutlineSearch />} />
            </ConfigProvider>

            <ButtonComponent
              defaultBg={"#0C41FF"}
              defaultHoverBg={"#0C41FF"}
              borderRadius={5}
              paddingInline={8}
              controlHeight={30}
            >
              <div className={"inline-flex gap-x-4 text-white items-center"}>
                <Text
                  fontWeightStrong={500}
                  fontSize={12}
                  className={"text-white"}
                >
                  Add event
                </Text>
                &nbsp;
                <BsPlusCircleFill className={"w-4"} />
              </div>
            </ButtonComponent>
          </div>
        </div>
      </Fragment>
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
