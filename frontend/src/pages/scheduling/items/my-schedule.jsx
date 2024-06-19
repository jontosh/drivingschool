import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Fragment, useContext } from "react";

export const MySchedule = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <div className="space-y-5">
        <div>calendar</div>

        <div className="flex items-center gap-2.5">
          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            CLASSES
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            IN-CAR
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            TESTING
          </ButtonComponent>

          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={colorsObject.primaryHover}
            defaultBg={colorsObject.primary}
            controlHeight={35}
            paddingInline={25}
            borderRadius={5}
          >
            SHOW CALENDAR
          </ButtonComponent>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <DrivingItem />
          <DrivingItem />
          <DrivingItem />
          <DrivingItem />
        </div>
      </div>
    </Fragment>
  );
};
