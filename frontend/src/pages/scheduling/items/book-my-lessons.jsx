import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SchedulingModule } from "@/modules/scheduling.jsx";
import { useContext, useState, useCallback, useEffect } from "react";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import "@natscale/react-calendar/dist/main.css";
import { Calendar } from "@natscale/react-calendar";
import MediaQuery from "react-responsive";

dayjs.extend(dayLocaleData);

export const BookMyLessons = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [value, setValue] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [calendar, setCalendar] = useState(0);
  const onClear = () => {
    setValue([]);
  };

  const isDisabled = useCallback((date) => {
    return date < new Date();
  }, []);

  const onChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const { columns, data } = SchedulingModule(value);

  useEffect(() => {
    const handleResize = (event) => {
      setInnerWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (innerWidth >= 720) {
      setCalendar(500);
    } else if (innerWidth >= 545) {
      setCalendar(400);
    } else if (innerWidth >= 400) {
      setCalendar(250);
    } else if (innerWidth >= 300) {
      setCalendar(225);
    }
  }, [innerWidth]);

  return (
    <>
      <div className="flex max-xl:flex-col gap-5">
        <div className="space-y-5 max-w-[550px] w-full">
          <div className="border border-gray-500 px-6 py-4 rounded-lg space-y-5">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize="text-base text-gray-500 uppercase"
                fontWeightStrong={500}
              >
                FILTER BY DATE
              </Title>
              <IconComponent
                className="cursor-text text-gray-500"
                iconWidth="w-[18px]"
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <hr className="border border-gray-400" />

            <MediaQuery minWidth={0}>
              <Calendar
                value={value}
                onChange={onChange}
                hideAdjacentDates
                size={calendar}
                isMultiSelector
                isDisabled={isDisabled}
              />
            </MediaQuery>

            <Paragraph className="text-gray-500">
              Available Booked or currently unavailable (Call for assistance if
              you don't see availability) Date unavailable or slots are not
              created
            </Paragraph>
          </div>

          <div className="text-center">
            <ButtonComponent
              defaultColor={colorsObject.black}
              defaultHoverColor={colorsObject.black}
              defaultHoverBg={colorsObject.main}
              defaultBg={colorsObject.main}
              defaultBorderColor={colorsObject.primary}
              defaultHoverBorderColor={colorsObject.primaryHover}
              controlHeight={40}
              paddingInline={43}
              borderRadius={5}
              fontSize={16}
              onClick={onClear}
            >
              CLEAR SEARCH
            </ButtonComponent>
          </div>
        </div>

        <div className="flex-grow">
          <aside className="border border-gray-500 px-6 py-4 rounded-lg">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize="text-base text-gray-500 uppercase"
                fontWeightStrong={500}
              >
                AVAILABLE OPEN SLOT
              </Title>
              <IconComponent
                className="cursor-text text-gray-500"
                iconWidth="w-[18px]"
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <TableComponent
              cellPaddingInline={0}
              data={data}
              columns={columns}
            />
          </aside>
        </div>
      </div>
    </>
  );
};
