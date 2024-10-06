import InstructorAva from "@/assets/user/instructor.jpeg";
import ButtonComponent from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import { formatPhoneNumber } from "@/modules/formatter.jsx";
import CalendarStyle from "@/pages/dashboard/dashboard.module.scss";
import { useState, useEffect, Fragment, useMemo, useCallback } from "react";
import "./single-table-calendar.scss";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlClock } from "react-icons/sl";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const SingleTableCalendar = () => {
  const instructorId = useURLSearchParams("instructorId");
  const { data: TimeSlot } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const { data: instructorData } = useRequestIdQuery({
    path: "/student_account/instructor",
    id: instructorId,
  });

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  const EventsList = useMemo(() => {
    return (
      TimeSlot?.filter(({ staff }) => staff === instructorId)?.flatMap(
        ({ slots }) =>
          slots.map(({ name, start, end }) => ({
            title: name,
            start: new Date(start),
            end: new Date(end),
          })),
      ) || []
    );
  }, [TimeSlot, instructorId]);

  useEffect(() => {
    if (EventsList.length > 0) {
      setEvents(EventsList);
    }
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

  const { formattedNumber } = formatPhoneNumber(
    instructorData?.home_phone ?? instructorData?.cell_phone,
  );

  return (
    <Fragment>
      {instructorData && (
        <div className="flex max-[600px]:flex-col items-center gap-5">
          <div className="flex items-center gap-5">
            <Image
              className="w-16 h-16 overflow-hidden rounded-full"
              src={instructorData?.picture ?? InstructorAva}
            />
            <Title level={2} fontSize="text-2xl">
              {instructorData?.first_name} {instructorData?.last_name}
            </Title>
          </div>
          <a
            className="text-[#6B7A99] text-base font-medium"
            href={`tel:+${formattedNumber}`}
            target="_blank"
          >
            +{formattedNumber}
          </a>
        </div>
      )}

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
    </Fragment>
  );
};
