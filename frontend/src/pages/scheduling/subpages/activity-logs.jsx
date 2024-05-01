import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Alert } from "antd";
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
        <form>
          <div className={"flex flex-col gap-y-5"}>
            <label className={"inline-flex items-center gap-5 m-auto"}>
              <span className={"text-base flex-shrink-0 w-40 text-right"}>
                Appointment type:
              </span>
              <CustomSelect
                colorBorder={colorsObject.primary}
                className={`h-10 shadow-xl ${ActivityLogsStyle["ActivityLogs__input"]}`}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <CustomInput
              spanText={"Select date"}
              placeholder={`MM/DD/YYYY - MM/DD/YYYY`}
              spanClassName={"flex-shrink-0 w-40 text-right"}
              fontSize="text-base"
              className={`flex-grow border border-indigo-700 shadow-xl ${ActivityLogsStyle["ActivityLogs__input"]}`}
              classNames={
                "inline-flex h-10 flex-row-reverse items-center gap-5 m-auto"
              }
            />
          </div>

          <div className="text-center space-x-3 pt-6">
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
        </form>
      </div>
    </Fragment>
  );
};
