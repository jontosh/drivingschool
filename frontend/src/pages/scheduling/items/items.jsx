import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";
import { TbEdit, TbClockFilled } from "react-icons/tb";
import { AlertEdit } from "@/hooks/alert.jsx";
import { TiUser } from "react-icons/ti";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

export const DrivingItem = ({ item }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);

  const handleEdit = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <div className={"bg-gray-300 pt-8 pr-2 pl-5 pb-2 rounded-lg space-y-3"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Title level={5} fontSize={"text-sm"} fontWeightStrong={600}>
              DRIVING
            </Title>
            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              defaultHoverBg={colorsObject.primaryHover}
              defaultBg={colorsObject.primary}
              controlHeight={20}
              paddingInline={9}
              borderRadius={5}
              fontSize={8}
            >
              CLASSES
            </ButtonComponent>
          </div>

          <IconComponent
            iconWidth={"w-[18px]"}
            icon={<TbEdit className={"text-lg"} />}
            onClick={handleEdit}
          />
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
              Instructor: Aminov
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<BsFillCalendarWeekFill />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              Instructor: Aminov
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<TbClockFilled />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              Instructor: Aminov
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
                Mason Location
              </Paragraph>
            </div>

            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              defaultHoverBg={colorsObject.successHover}
              defaultBg={colorsObject.success}
              controlHeight={20}
              paddingInline={9}
              borderRadius={5}
              fontSize={8}
            >
              Map & Direction
            </ButtonComponent>
          </li>
        </ul>
      </div>

      {IsOpen && <AlertEdit setIsOpen={setIsOpen} />}
    </Fragment>
  );
};
