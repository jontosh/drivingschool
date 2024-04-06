import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { ConfigProvider, DatePicker } from "antd";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { StatusSelect } from "./index.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss"
export const ProductModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <form className={classNames("pb-5  grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
          }
          spanText={"Component name"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={"inline-flex gap-x-9 items-center flex-row-reverse gap-5"}
          spanText={"Item#/Code:"}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-9 items-center gap-5`}>
          <span
            className={`w-40 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
          }
          spanText={"Public Name:"}
          className={"w-60"}
          spanClassName={`max-w-46 `}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-8 items-center gap-5`}>
          <span
            className={`w-full max-w-28 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label className={`inline-flex gap-x-8 items-center gap-5`}>
          <span
            className={`w-full max-w-28 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Sub Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>
      </form>
    </Fragment>
  );
};

export const FeesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <form className={classNames("pb-5  grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
          }
          spanText={"Free name"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-9 items-center gap-5`}>
          <span
            className={`w-32 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 440, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5"}
          spanText={"Public Name:"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5"}
          spanText={"Fee Amount:"}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />
      </form>
    </Fragment>
  );
};

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Fragment>
      <form className={classNames("pb-5  grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
          }
          spanText={"Discount name"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-8 items-center`}>
          <span
            className={`w-40 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 440, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5"}
          spanText={`Discount code:`}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5"}
          spanText={`Free Amount:`}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <div className={`overflow-scroll`}>
          <div className={`flex items-center gap-7`}>
            <Title level={2}>Eligible Service: *</Title>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Click to select</span>
              <textarea
                className={`p-3 text-lg ${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Click to select</span>
              <textarea
                className={`${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
          </div>

          <div className={`flex items-center gap-7`}>
            <Title level={2}>Eligible Class(es):</Title>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Click to select</span>
              <textarea
                className={`p-3 text-lg ${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Click to select</span>
              <textarea
                className={`${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
          </div>

          <div className={`flex items-center gap-7`}>
            <Title level={2}>Eligible Class(es):</Title>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Eligible Class(es):</span>
              <textarea
                className={`p-3 text-lg ${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
            <div className={`flex flex-col gap-5 items-center`}>
              <span>Click to select</span>
              <textarea
                className={`${ManagementStyle["Modal__textarea"]}`}
              ></textarea>
            </div>
          </div>
        </div>

        <label className={"text-center space-x-5"}>
          <Text fontSize={"text-base"} fontWeightStrong={400}>
            Discount Expiration:
          </Text>
          <>
            <ConfigProvider
              theme={{
                token: {
                  colorBorder: colorsObject.primary,
                },
              }}
            >
              <DatePicker onChange={onChange} />
            </ConfigProvider>
          </>
        </label>
      </form>
    </Fragment>
  );
};

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Fragment>
      <form className={classNames("pb-5  grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={"inline-flex items-center flex-row-reverse gap-7"}
          spanText={"Miscellaneous Item Name:"}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex justify-end gap-x-8 items-center`}>
          <span
            className={`max-w-40 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label className={`inline-flex justify-end gap-x-8 items-center`}>
          <span
            className={`max-w-40 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>
      </form>
    </Fragment>
  );
};
