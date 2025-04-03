import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { TbEdit, TbClockFilled } from "react-icons/tb";
import { AlertEdit, AlertDelete } from "@/hooks/alert.jsx";
import { TiUser } from "react-icons/ti";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { message } from "antd";

export const DrivingItem = ({ item, className }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [isCancelled, setIsCancelled] = useState(false);

  const handleEdit = () => setIsOpen((prev) => !prev);
  
  const handleCancelLesson = () => {
    setShowCancelConfirm(true);
  };
  
  // Effect to handle the confirmation result
  const handleCancelConfirmation = () => {
    if (Confirm) {
      // Here you would make an API call to cancel the lesson
      setIsCancelled(true);
      message.success("Lesson cancelled successfully");
      setConfirm(false); // Reset confirmation state
    }
  };
  
  // Call the handler when Confirm changes
  if (Confirm) {
    handleCancelConfirmation();
  }

  return (
    <Fragment>
      <div
        className={classNames(
          "bg-gray-200 pt-8 pr-2 pl-5 pb-2 rounded-lg space-y-3",
          className,
          isCancelled && "opacity-60"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Title level={5} fontSize={"text-sm"} fontWeightStrong={600}>
              {isCancelled ? "CANCELLED" : "DRIVING"}
            </Title>
            {!isCancelled && (
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
                Change
              </ButtonComponent>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isCancelled && (
              <>
                <IconComponent
                  iconWidth={"w-[18px]"}
                  icon={<IoClose className={"text-lg"} />}
                  onClick={handleCancelLesson}
                  className="text-red-500 hover:text-red-700"
                />
                <IconComponent
                  iconWidth={"w-[18px]"}
                  icon={<TbEdit className={"text-lg"} />}
                  onClick={handleEdit}
                />
              </>
            )}
          </div>
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
              Monday & Wednesday
            </Paragraph>
          </li>

          <li className={"flex items-center gap-1.5"}>
            <IconComponent
              className={"cursor-default"}
              iconWidth={"w-[18px]"}
              icon={<TbClockFilled />}
            />

            <Paragraph fontSize={"text-xs"} fontWeightStrong={300}>
              9:00 AM - 10:30 AM
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

            {!isCancelled && (
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
            )}
            
            {isCancelled && (
              <span className="text-xs text-red-500 font-medium">
                Lesson cancelled
              </span>
            )}
          </li>
        </ul>
      </div>

      {IsOpen && <AlertEdit setIsOpen={setIsOpen} />}
      {showCancelConfirm && (
        <AlertDeleteComponent setIsOpen={setShowCancelConfirm} />
      )}
    </Fragment>
  );
};
