import Title from "@/components/title/index.jsx";
import { Calendar } from "antd";
import { Fragment } from "react";

export const VehicleSidebar = () => {
  return (
    <div className={"px-4"}>
      <Calendar
        headerRender={() => {
          return (
            <div className={"py-2.5"}>
              <Title level={2} fontSize={"text-lg"} fontWeightStrong={500}>
                January
              </Title>
            </div>
          );
        }}
        fullscreen={false}
      />
      @todo
    </div>
  );
};
