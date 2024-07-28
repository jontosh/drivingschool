import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Dropdown } from "antd";
import classNames from "classnames";
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
  const { colorsObject } = useContext(ColorsContext);
  const localizer = momentLocalizer(moment);
  const [eventsList, setEventsList] = useState([]);
  const { data: timeSlot } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const { data: timeRange } = useRequestGetQuery({
    path: "/scheduling/time_range/",
  });

  useEffect(() => {
    if (timeSlot && timeRange && data?.id) {
      const rangeTimes = [];
      const rangeTime = [];

      timeSlot.forEach((item) => {
        if (data?.id === item.staff) {
          timeRange.forEach((item2) => {
            if (item.slots.includes(item2.id)) {
              rangeTimes.push(item2);
            }
          });
        }
      });

      rangeTimes.forEach((item) => {
        rangeTime.push({
          title: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          allDay: false,
        });
      });

      setEventsList(rangeTime);
    }
  }, [timeSlot, timeRange, data?.id]);

  const { formats, defaultDate, views, toolbar, components } = useMemo(() => {
    return {
      components: {
        timeGutterHeader: () => (
          <div className="flex justify-center min-h-[62px]">
            <SlClock className="w-7 text-[#C3CAD9]" />
          </div>
        ),
        toolbar: (e) => {
          const goTo = (value) => e.onNavigate(value);
          const handleMode = (value) => e.onView(value);

          return (
            <div className="flex items-center justify-between p-7">
              <ButtonComponent
                borderRadius={20}
                defaultBorderColor="#F5F6F7"
                defaultHoverBorderColor="#F5F6F7"
                defaultColor="#6B7A99"
                defaultHoverColor="#6B7A99"
                controlHeight={40}
                paddingInline={20}
                onClick={() => goTo("TODAY")}
              >
                Today
              </ButtonComponent>

              <div className="flex items-center gap-8">
                <ButtonComponent
                  borderRadius={20}
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={12}
                  onClick={() => goTo("PREV")}
                >
                  <MdKeyboardArrowLeft />
                </ButtonComponent>

                <Title fontSize="text-[#6B7A99]">{e.label}</Title>

                <ButtonComponent
                  borderRadius={20}
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={12}
                  onClick={() => goTo("NEXT")}
                >
                  <MdKeyboardArrowRight />
                </ButtonComponent>
              </div>

              <div className="flex border border-[#26334D08]">
                <ButtonComponent
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={20}
                  className="uppercase"
                  onClick={() => handleMode("month")}
                >
                  MONTH
                </ButtonComponent>

                <ButtonComponent
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={20}
                  className="uppercase"
                  onClick={() => handleMode("week")}
                >
                  WEEK
                </ButtonComponent>

                <ButtonComponent
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={20}
                  className="uppercase"
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
  }, []);

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      className: `text-[#2C5A41] bg-[#29CC390D] ${isSelected ? "text-white" : ""}`,
      style: {
        border: "1px solid #29CC39",
      },
    }),
    [],
  );

  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).day() > -1 && {
        className: classNames("bg-white", CalendarStyle["rbc-header"]),
      }),
    }),
    [],
  );

  const slotGroupPropGetter = useCallback(
    () => ({ style: { minHeight: 80 } }),
    [],
  );

  const slotPropGetter = useCallback(
    () => ({ className: "px-2.5 pt-6 text-[#ADB8CC]" }),
    [],
  );

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Image
            className="w-16 h-16 overflow-hidden rounded-full"
            src={data?.picture ?? InstructorAva}
            srcSet={data?.picture ?? InstructorAva}
          />
          <Title level={2} fontSize="text-2xl">
            {data?.first_name} {data?.last_name}
          </Title>
        </div>

        <Dropdown menu={{ items }} placement="bottomRight">
          <IconComponent
            className="w-6"
            icon={<BsPersonFillGear className="text-xl" />}
          />
        </Dropdown>
      </div>
      <div className="overflow-hidden rounded-xl bg-white flex justify-between gap-5">
        <div className="-mx-1 flex-grow pl-1">
          <Calendar
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            defaultDate={defaultDate}
            style={{ height: 850 }}
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

        <div className="space-y-12 pr-5 pt-7 w-[230px]">
          <div className="space-y-3">
            <Title level={2} fontSize="text-base text-[#6B7A99]">
              Action
            </Title>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className="w-full"
            >
              Add slot 1 h
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className="w-full"
            >
              Add slot 2h
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Turn off
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Trash
            </ButtonComponent>
          </div>

          <div className="space-y-3">
            <Title level={2} fontSize={"text-base text-[#6B7A99]"}>
              Menu
            </Title>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Print
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Export
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Create Appointment
            </ButtonComponent>
          </div>

          <div className="space-y-3">
            <Title level={2} fontSize={"text-base text-[#6B7A99]"}>
              Location
            </Title>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Mason
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              Ohio
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
              className={"w-full"}
            >
              New York
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
