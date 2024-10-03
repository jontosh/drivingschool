import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SchedulingModule } from "@/modules/scheduling.jsx";
import { Fragment, useContext, useState, useCallback } from "react";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import "@natscale/react-calendar/dist/main.css";
import { Calendar } from "@natscale/react-calendar";

dayjs.extend(dayLocaleData);

export const BookMyLessons = ({ ...props }) => {
  const Time = new Date();
  const { colorsObject } = useContext(ColorsContext);

  const [value, setValue] = useState([
    new Date(Time.getFullYear(), Time.getMonth(), 1),
    new Date(Time.getFullYear(), Time.getMonth() + 1, 5),
  ]);

  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue],
  );

  const { columns, data } = SchedulingModule();

  return (
    <Fragment>
      <div className="flex gap-5">
        <div className={"flex-grow space-y-5"}>
          <div className=" border border-gray-500 px-6 py-4 rounded-lg space-y-5">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize={"text-base text-gray-500 uppercase"}
                fontWeightStrong={500}
              >
                FILTER BY DATE
              </Title>
              <IconComponent
                className={"cursor-text text-gray-500"}
                iconWidth={"w-[18px]"}
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <hr className={"border border-gray-400"} />

            <div>
              <Calendar
                showDualCalendar
                isRangeSelector
                value={value}
                onChange={onChange}
                hideAdjacentDates
                className={"w-full"}
                size={500}
              />
            </div>

            <Paragraph className={"text-gray-500"}>
              Available Booked or currently unavailable (Call for assistance if
              you don't see availability) Date unavailable or slots are not
              created
            </Paragraph>
          </div>

          <div className="text-center space-x-4">
            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              defaultHoverBg={colorsObject.primaryHover}
              defaultBg={colorsObject.primary}
              controlHeight={40}
              paddingInline={43}
              borderRadius={5}
              fontSize={16}
            >
              REFINE SEARCH
            </ButtonComponent>

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
            >
              CLEAR SEARCH
            </ButtonComponent>
          </div>
        </div>

        <div>
          <aside
            className={
              "w-96 border border-gray-500 px-6 py-4 rounded-lg flex-shrink-0"
            }
          >
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize={"text-base text-gray-500 uppercase"}
                fontWeightStrong={500}
              >
                AVAILABLE OPEN SLOT
              </Title>
              <IconComponent
                className={"cursor-text text-gray-500"}
                iconWidth={"w-[18px]"}
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
    </Fragment>
  );
};
