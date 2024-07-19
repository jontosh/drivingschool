import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Alert, DatePicker, Form } from "antd";
import { Fragment, useContext, useState } from "react";
import ActivityLogsStyle from "../scheduling.module.scss"

export const ActivityLogs = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsExport, setIsExport] = useState(false);

  const handleExport = () => {
    setIsExport(true);

    setTimeout(() => {
      setIsExport(false);
    }, 1000);
  };

  return (
    <Fragment>
      <div className={"bg-white py-5 px-9"}>
        {IsExport && (
          <Alert
            message="Success Export"
            className={"mb-5"}
            type="success"
            banner
            showIcon
          />
        )}
        <Form layout="vertical">
          <div className="flex flex-col space-y-5">
            <Form.Item label="Log type" className="w-[50%] m-auto">
              <CustomSelect
                placeholder={"Select"}
                options={[
                  {
                    value: "Select",
                    label: "Select",
                  }
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item label="Select date" className="w-[50%] m-auto">
              <DatePicker className="w-full h-[50px] border-[#667085]" />
            </Form.Item>
          </div>

          <div className="text-center space-x-3 pt-10">
            <ButtonComponent
              defaultHoverBg={"#24C18F"}
              defaultBg={"#24C18F"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
              onClick={handleExport}
            >
              Export
            </ButtonComponent>
            <ButtonComponent
              defaultHoverBg={colorsObject.secondary}
              defaultBg={colorsObject.secondary}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
            >
              Clear
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};
