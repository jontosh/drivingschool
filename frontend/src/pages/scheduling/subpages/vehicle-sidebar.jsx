import BadgeComponent from "@/components/badge/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Calendar } from "antd";
import { useContext, useEffect, useState } from "react";
import AirPlaneIcon from "../../../assets/icons/airplane-icon.png";

export const VehicleSidebar = () => {
  const Time = new Date();
  const { colorsObject } = useContext(ColorsContext);
  const [MonthName, setMonthName] = useState("");
  const months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });

  useEffect(() => {
    months.map((month, index) => {
      if (index === Time.getMonth()) {
        setMonthName(month.value);
      }
    });
  }, [MonthName]);
  return (
    <div className={"p-4  space-y-5"}>
      <Calendar
        headerRender={() => {
          return (
            <div>
              <Title level={2} fontSize={"text-lg"} fontWeightStrong={500}>
                {MonthName}
              </Title>
            </div>
          );
        }}
        fullscreen={false}
      />

      <div className={"-mr-3.5"}>
        <label className={"space-y-2.5 w-full"}>
          <span className={"font-medium"}>Select vehicle</span>
          <CustomSelect
            colorBorder={colorsObject.primary}
            style={{ width: "100%" }}
            options={[
              {
                value: 1,
                label: 1,
              },
            ]}
          />
        </label>
      </div>

      <time className={"w-full space-y-5"}>
        <div className="day space-y-2.5">
          <Title level={3} fontSize={"text-base"}>
            &#128467; Today
          </Title>

          <ul className={"space-y-2.5 -mr-3.5"}>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"success"}
                text={"Web Team Progress Update"}
                style={{
                  color: "#3BA86E",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <time className={"text-[#333333]"}>08:00</time>
            </li>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"error"}
                text={"Web Team Progress Update"}
                style={{
                  color: colorsObject.danger,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                }}
              />

              <time className={"text-[#333333]"}>09:00</time>
            </li>

            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"success"}
                text={"Web Team Progress Update"}
                style={{
                  color: "#3BA86E",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <time className={"text-[#333333]"}>10:00</time>
            </li>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"error"}
                text={"Web Team Progress Update"}
                style={{
                  color: colorsObject.danger,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                }}
              />

              <time className={"text-[#333333]"}>11:00</time>
            </li>
          </ul>
        </div>

        {/*  -------------- */}

        <div className="day space-y-2.5">
          <Title level={3} fontSize={"text-base"}>
            &#128467; Tomorrow
          </Title>

          <ul className={"space-y-2.5 -mr-3.5"}>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"success"}
                text={"Web Team Progress Update"}
                style={{
                  color: "#3BA86E",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <time className={"text-[#333333]"}>08:00</time>
            </li>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"error"}
                text={"Web Team Progress Update"}
                style={{
                  color: colorsObject.danger,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                }}
              />

              <time className={"text-[#333333]"}>09:00</time>
            </li>

            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"success"}
                text={"Web Team Progress Update"}
                style={{
                  color: "#3BA86E",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <time className={"text-[#333333]"}>10:00</time>
            </li>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"error"}
                text={"Web Team Progress Update"}
                style={{
                  color: colorsObject.danger,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "10px",
                }}
              />

              <time className={"text-[#333333]"}>11:00</time>
            </li>
          </ul>
        </div>

        {/*  -------------- */}

        <div className="day space-y-2.5">
          <Title level={3} fontSize={"text-base flex gap-2 items-center"}>
            <Image
              src={AirPlaneIcon}
              srcSet={AirPlaneIcon}
              className={"w-4 cursor-text"}
            />{" "}
            Vacations
          </Title>

          <ul className={"space-y-2.5 -mr-3.5"}>
            <li className={"flex justify-between items-center"}>
              <BadgeComponent
                status={"success"}
                text={"Web Team Progress Update"}
                style={{
                  color: "#3BA86E",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <time className={"text-[#333333]"}>08:00</time>
            </li>
          </ul>
        </div>
      </time>
    </div>
  );
};
