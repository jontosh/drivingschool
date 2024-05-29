import ButtonComponent from "@/components/button/index.jsx";
import Title from "@/components/title/index.jsx";
import { BigCalendar } from "@/pages/scheduling/calendar/big-calendar.jsx";
import { VehicleSidebar } from "@/pages/scheduling/calendar/vehicle-sidebar.jsx";
import { Fragment, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const Vehicle = () => {
  const [Label, setLabel] = useState("");
  const [Views, setViews] = useState([]);

  return (
    <Fragment>
      <div className="p-7 bg-white rounded-xl">
        <div className={"flex items-center justify-between p-7"}>
          <ButtonComponent
            borderRadius={20}
            defaultBorderColor={"#F5F6F7"}
            defaultHoverBorderColor={"#F5F6F7"}
            defaultColor={"#6B7A99"}
            defaultHoverColor={"#6B7A99"}
            controlHeight={40}
            paddingInline={20}
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
            >
              <MdKeyboardArrowLeft />
            </ButtonComponent>

            <Title fontSize={"text-[#6B7A99]"}>{Label}</Title>

            <ButtonComponent
              borderRadius={20}
              defaultBorderColor={"#F5F6F7"}
              defaultHoverBorderColor={"#F5F6F7"}
              defaultColor={"#6B7A99"}
              defaultHoverColor={"#6B7A99"}
              controlHeight={40}
              paddingInline={12}
            >
              <MdKeyboardArrowRight />
            </ButtonComponent>
          </div>

          <div className="flex border border-[#26334D08]">
            {Views.map((item, key) => (
              <Fragment key={key}>
                <ButtonComponent
                  defaultBorderColor={"#F5F6F7"}
                  defaultHoverBorderColor={"#F5F6F7"}
                  defaultColor={"#6B7A99"}
                  defaultHoverColor={"#6B7A99"}
                  controlHeight={40}
                  paddingInline={20}
                  className={"uppercase"}
                >
                  {item}
                </ButtonComponent>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex gap-5">
          <aside className={"w-96"}>
            <VehicleSidebar />

            <div>@todo</div>
          </aside>
          <div className="flex-grow border border-gray-400 rounded-xl overflow-hidden">
            <BigCalendar setLabel={setLabel} setViews={setViews} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
