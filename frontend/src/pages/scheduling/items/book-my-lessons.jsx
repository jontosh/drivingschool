import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SchedulingModule } from "@/modules/scheduling.jsx";
import { Calendar } from "antd";
import { Fragment, useContext } from "react";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);

export const BookMyLessons = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { columns, data } = SchedulingModule();

  return (
    <Fragment>
      <div className="flex gap-5">
        <div className={"flex-grow space-y-5"}>
          <div className=" border border-gray-500 px-6 py-4 rounded-lg space-y-5">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize={"text-base text-gray-600 uppercase"}
                fontWeightStrong={500}
              >
                filter by
              </Title>
              <IconComponent
                className={"cursor-text"}
                iconWidth={"w-[18px]"}
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <hr className={"border border-gray-400"} />

            <div className="flex">
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
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
                fontSize={"text-base text-gray-600 uppercase"}
                fontWeightStrong={500}
              >
                filter by
              </Title>
              <IconComponent
                className={"cursor-text"}
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
