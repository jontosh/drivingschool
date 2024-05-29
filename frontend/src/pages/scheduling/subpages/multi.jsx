import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form";
import IconComponent from "@/components/icons";
import Title from "@/components/title/index.jsx";
import { BigCalendar } from "@/pages/scheduling/calendar/big-calendar.jsx";
import { MultiSidebar } from "@/pages/scheduling/calendar/multi-sidebar.jsx";
import { MultiTable } from "@/pages/scheduling/calendar/multi-table-calendar.jsx";
import { VehicleSidebar } from "@/pages/scheduling/calendar/vehicle-sidebar.jsx";
import { Fragment, useState } from "react";
import { LuSettings } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export const Multi = () => {
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
            <MultiSidebar />

            <div className="flex flex-col gap-y-5">
              <label className="flex flex-col gap-y-1.5">
                <span className="text-gray-500 text-base">Select Vehicle:</span>

                <CustomSelect
                  placeholder={"SELECT"}
                  className={"w-full h-[50px]"}
                  colorBorder="rgba(222, 226, 230, 1)"
                  colorText="rgba(152, 162, 179, 1)"
                  options={[
                    {
                      label: 'UZB',
                      value: 'UZB'
                    },
                    {
                      label: 'USA',
                      value: 'USA'
                    },
                  ]}
                />
              </label>

              <CustomInput
                placeholder={"SEARCH STUDENT"}
                classNames={"w-full"}
                colorBorder="rgba(222, 226, 230, 1)"
              />

              <div className="flex flex-col gap-y-5 border border-gray-300 rounded p-5">
                <ButtonComponent
                  defaultBg="rgba(36, 193, 143, 1)"
                  defaultHoverBg="rgba(60, 227, 174, 1)"
                  controlHeight={40}
                  borderRadius={5}
                  className={"w-full"}
                >
                  GET SCHEDULE
                </ButtonComponent>

                <ButtonComponent
                  defaultBg="rgba(0, 0, 0, 0.25)"
                  defaultHoverBg="rgba(95, 95, 95, 0.25)"
                  controlHeight={40}
                  borderRadius={5}
                  className={"w-full"}
                >
                  GET SCHEDULE
                </ButtonComponent>

                <div className="w-[50px] h-[50px] bg-[#24C18F] rounded text-center m-auto cursor-pointer">
                  <IconComponent
                    icon={<LuSettings />}
                    iconWidth={"w-[24px]"}
                    className={"text-white pt-3"}
                  />
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-grow border border-gray-400 rounded-xl overflow-hidden">
            <MultiTable setLabel={setLabel} setViews={setViews} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
