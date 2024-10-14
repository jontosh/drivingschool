import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import classNames from "classnames";
import { useContext } from "react";
import { TbEdit, TbClockFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import dayjs from "dayjs";

export const DrivingItem = ({ item, className, editable, onClick }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <>
      <div
        className={classNames(
          "bg-gray-200 pt-8 pr-2 pl-5 pb-2 rounded-lg space-y-3",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <Title level={5} fontSize={"text-sm"} fontWeightStrong={600}>
            {item?.title ?? "Title"}
          </Title>

          {editable && (
            <IconComponent
              iconWidth={"w-[18px]"}
              icon={<TbEdit className={"text-lg"} />}
              onClick={onClick}
            />
          )}
        </div>

        <hr className={"border border-gray-500"} />

        <ul className={"space-y-2.5"}>
          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<TiUser />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              Instructor: {item?.staff ?? "Not found"}
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<BsFillCalendarWeekFill />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              {item?.week_range
                ? item?.week_range?.join(" | ")
                : dayjs(item?.start).format("YYYY-MM-DD")}
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<TbClockFilled />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              {item?.start ? dayjs(item?.start).format("hh:mm A") : "Not found"}{" "}
              - {item?.end ? dayjs(item?.end).format("hh:mm A") : "Not Found"}
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5 justify-between"}>
            <div className="flex items-center gap-1.5">
              <IconComponent
                className={"cursor-default"}
                iconWidth={"w-[18px]"}
                icon={<HiLocationMarker />}
              />

              <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
                {item?.location ?? "Not Found"}
              </Paragraph>
            </div>

            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              defaultHoverBg={colorsObject.successHover}
              defaultBg={colorsObject.success}
              controlHeight={20}
              paddingInline={9}
              borderRadius={10}
              fontSize={8}
            >
              Map & Direction
            </ButtonComponent>
          </li>
        </ul>
      </div>
    </>
  );
};
