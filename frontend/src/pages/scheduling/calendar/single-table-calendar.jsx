import InstructorAva from '@/assets/user/instructor.jpeg'
import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from '@/components/image/index.jsx'
import Title  from '@/components/title/index.jsx'
import { formatPhoneNumber } from '@/modules/formatter.jsx'
import CalendarStyle from '@/pages/dashboard/dashboard.module.scss'
import {
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import "./single-table-calendar.scss";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { MdKeyboardArrowLeft , MdKeyboardArrowRight } from 'react-icons/md'
import { SlClock } from 'react-icons/sl';

export const SingleTableCalendar = ({data}) => {
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
  
  const {formattedNumber} = formatPhoneNumber(data?.home_phone ?? data?.cell_phone)

  return (
    <Fragment>
      
      {data && (<div className='flex items-center gap-5'>
        <Image
          className={ 'w-16 h-16 overflow-hidden rounded-full' }
          src={ data?.picture ?? InstructorAva }
          srcSet={ data?.picture ?? InstructorAva }
        />
        
        <Title level={ 2 } fontSize={ 'text-2xl' }>
          { data?.first_name } { data?.last_name }
        </Title>
        
        <a href={"tel:+" + (data?.home_phone ?? data?.cell_phone)} target={"_blank"}>+{ formattedNumber }</a>
      </div>) }
      
      <Calendar
        // To selection column and add events
        selectable
        localizer={ localizer }
        events={ events }
        // To scroll
        startAccessor='start'
        endAccessor='end'
        onSelectSlot={ handleSelect }
        // onSelectEvent={(event) => alert(event.title)}
        defaultView={ Views.WEEK }
        defaultDate={ defaultDate }
        style={ { height: 810 } }
        views={ views }
        formats={ formats }
        // {/*Header toolbar*/}
        toolbar={ toolbar }
        //{/*Event Item*/}
        eventPropGetter={ eventPropGetter }
        //{/*Day column*/}
        dayPropGetter={ dayPropGetter }
        showMultiDayTimes
        // Slot
        slotGroupPropGetter={ slotGroupPropGetter }
        slotPropGetter={ slotPropGetter }
        //compo
        components={ components }
      />
    </Fragment>
  );
};
