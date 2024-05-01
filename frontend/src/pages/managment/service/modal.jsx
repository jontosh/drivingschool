import { CustomInput, CustomSelect, CustomTransfer } from "@/components/form/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { ConfigProvider, DatePicker } from "antd";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { StatusSelect } from "./index.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import ButtonComponent from "@/components/button/index.jsx";

const mockData = [
  { key: "0", title: "Title 0", description: "Sample Description 0" },
  { key: "1", title: "Title 1", description: "Sample Description 1" },
  { key: "2", title: "Title 2", description: "Sample Description 2" },
  { key: "3", title: "Title 3", description: "Sample Description 3" },
  { key: "4", title: "Title 4", description: "Sample Description 4" },
  { key: "5", title: "Title 5", description: "Sample Description 5" },
  { key: "6", title: "Title 0", description: "Sample Description 0" },
  { key: "7", title: "Title 1", description: "Sample Description 1" },
  { key: "8", title: "Title 2", description: "Sample Description 2" },
  { key: "9", title: "Title 3", description: "Sample Description 3" },
  { key: "10", title: "Title 4", description: "Sample Description 4" },
  { key: "11", title: "Title 5", description: "Sample Description 5" },
];

export const ProductModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <form className={classNames("pb-5  grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-10"
          }
          spanText={"Component name"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={"inline-flex gap-x-9 items-center flex-row-reverse gap-5 h-10"}
          spanText={"Item#/Code:"}
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-9 items-center gap-5`}>
          <span
            className={`w-40 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={"h-10"}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-10"
          }
          spanText={"Public Name:"}
          className={"w-60"}
          spanClassName={`max-w-46`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-8 items-center gap-5`}>
          <span
            className={`w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={"h-10 text-base"}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label className={`inline-flex gap-x-8 items-center gap-5`}>
          <span
            className={`w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Sub Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={"h-10"}
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
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-10"
          }
          spanText={"Free name"}
          fontSize="text-base"
          className={"w-60"}
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex gap-x-9 items-center gap-5`}>
          <span
            className={`w-[150px] text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 440, width: "100%" }}
            className={"h-10"}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-10"}
          spanText={"Public Name:"}
          className={"w-60"}
          fontSize="text-base"
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-10"}
          spanText={"Fee Amount:"}
          className={"w-60"}
          fontSize="text-base"
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
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <div className={`flex grid gap-y-5 justify-center`}>
          <CustomInput
            classNames={
              "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-10"
            }
            spanText={"Discount name"}
            className={"w-60"}
            fontSize="text-base"
            spanClassName={`max-w-46`}
            colorBorder={colorsObject.primary}
          />

          <label className={`inline-flex gap-x-7 items-center`}>
            <span
              className={`w-[190px] text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
            >
              Status:
            </span>

            <CustomSelect
              value={"Select status"}
              style={{ maxWidth: 440, width: "100%" }}
              className={"h-10"}
              options={StatusSelect}
              colorBorder={colorsObject.primary}
            />
          </label>

          <CustomInput
            classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-10"}
            spanText={`Discount code:`}
            className={"w-60"}
            fontSize="text-base"
            spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={"inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-10"}
            spanText={`Free Amount:`}
            className={"w-60"}
            fontSize="text-base"
            spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
            colorBorder={colorsObject.primary}
          />
        </div>

        <div className={`space-y-10`}>
          <div className={`flex items-center space-x-12`}>
            <Title level={2}>Eligible Service:*</Title>
            <CustomTransfer
              dataSource={mockData}
              listHeight={200}
              colorBorder={colorsObject.primary}
            />
          </div>

          <div className={`flex items-center space-x-10`}>
            <Title level={2}>Eligible Class(es):</Title>
            <CustomTransfer
              dataSource={mockData}
              listHeight={200}
              colorBorder={colorsObject.primary}
            />
          </div>

          <div className={`flex items-center space-x-11`}>
            <Title level={2}>Eligible Class(es):</Title>
            <CustomTransfer
              dataSource={mockData}
              listHeight={200}
              colorBorder={colorsObject.primary}
            />
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
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={"inline-flex items-center flex-row-reverse gap-7 h-10"}
          spanText={"Miscellaneous Item Name:"}
          fontSize="text-base"
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex justify-end gap-x-8 items-center`}>
          <span
            className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            className={"h-10"}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label className={`inline-flex justify-end gap-x-8 items-center`}>
          <span
            className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            className={"h-10"}
            colorBorder={colorsObject.primary}
          />
        </label>
      </form>
    </Fragment>
  );
};
