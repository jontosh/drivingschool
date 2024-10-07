import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
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
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { formatPhoneNumber } from "@/modules/formatter.jsx";

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

export const DashboardCalendar = () => {
  const { colorsObject } = useContext(ColorsContext);
  const instructorId = useURLSearchParams("instructorId");
  const firstName = useURLSearchParams("first_name");
  const lastName = useURLSearchParams("last_name");
  const picture = JSON.parse(useURLSearchParams("picture"));
  const { data } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  const EventsList = useMemo(() => {
    return data?.filter((timeSlot) => timeSlot?.staff === instructorId);
  }, [data, instructorId]);

  useEffect(() => {
    setEvents([
      {
        title: "Test",
        start: new Date(),
        end: new Date(),
      },
    ]);
  }, [EventsList]);

  const { formats, defaultDate, views, toolbar, components } = useMemo(
    () => ({
      components: {
        timeGutterHeader: () => (
          <div className="flex justify-center min-h-[62px]">
            <SlClock className="w-7 text-[#C3CAD9]" />
          </div>
        ),
        toolbar: (props) => (
          <div className="flex max-[830px]:flex-col max-[830px]:space-y-2 items-center justify-between p-7">
            <ButtonComponent
              borderRadius={20}
              defaultBorderColor="#F5F6F7"
              defaultHoverBorderColor="#F5F6F7"
              defaultColor="#6B7A99"
              defaultHoverColor="#6B7A99"
              controlHeight={40}
              paddingInline={20}
              onClick={() => props.onNavigate("TODAY")}
            >
              Today
            </ButtonComponent>

            <div className="flex items-center gap-4 sm:gap-8">
              <ButtonComponent
                borderRadius={20}
                defaultBorderColor="#F5F6F7"
                defaultHoverBorderColor="#F5F6F7"
                defaultColor="#6B7A99"
                defaultHoverColor="#6B7A99"
                controlHeight={40}
                paddingInline={12}
                onClick={() => props.onNavigate("PREV")}
              >
                <MdKeyboardArrowLeft />
              </ButtonComponent>

              <Title fontSize="text-[#6B7A99]">{props.label}</Title>

              <ButtonComponent
                borderRadius={20}
                defaultBorderColor="#F5F6F7"
                defaultHoverBorderColor="#F5F6F7"
                defaultColor="#6B7A99"
                defaultHoverColor="#6B7A99"
                controlHeight={40}
                paddingInline={12}
                onClick={() => props.onNavigate("NEXT")}
              >
                <MdKeyboardArrowRight />
              </ButtonComponent>
            </div>

            <div className="flex border border-[#26334D08]">
              {["month", "week", "day"].map((view) => (
                <ButtonComponent
                  key={view}
                  defaultBorderColor="#F5F6F7"
                  defaultHoverBorderColor="#F5F6F7"
                  defaultColor="#6B7A99"
                  defaultHoverColor="#6B7A99"
                  controlHeight={40}
                  paddingInline={20}
                  className="uppercase"
                  onClick={() => props.onView(view)}
                >
                  {view.toUpperCase()}
                </ButtonComponent>
              ))}
            </div>
          </div>
        ),
      },
      defaultDate: new Date(),
      formats: {
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, "hh:mm", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd DD", culture),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          `${localizer.format(start, "hh:mm", culture)} - ${localizer.format(
            end,
            "hh:mm",
            culture,
          )}`,
      },
      views: [Views.MONTH, Views.WEEK, Views.DAY],
      toolbar: true,
    }),
    [],
  );

  const eventPropGetter = useCallback(
    () => ({
      className: "text-[#2C5A41] bg-[#BDFFDB] border-[#8FDCB2]",
    }),
    [],
  );

  const dayPropGetter = useCallback(
    () => ({
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
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Image
            className="w-16 h-16 overflow-hidden rounded-full"
            src={picture ?? InstructorAva}
            srcSet={picture ?? InstructorAva}
          />
          <Title level={2} fontSize="text-2xl">
            {firstName} {lastName}
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
            selectable
            localizer={localizer}
            events={events}
            defaultView={Views.WEEK}
            defaultDate={defaultDate}
            style={{ height: 810 }}
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
