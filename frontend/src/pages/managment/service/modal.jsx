import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
  CustomTransfer,
} from "@/components/form/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import FileStyle from "@/pages/managment/management.module.scss";
import { ColorPicker, ConfigProvider, DatePicker, Switch } from "antd";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);
  return (
    <Fragment>
      <form className={classNames("space-y-5")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
          }
          spanText={"Component name"}
          placeholder={"Component name"}
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          spanClassName={`w-40 text-right`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
          }
          spanText={"Item#/Code:"}
          placeholder={"Item#/Code"}
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          spanClassName={`w-40 text-right relative flex-shrink-0 after:left-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <label
          className={`inline-flex items-center gap-10 w-full justify-center`}
        >
          <span
            className={`w-40 text-right after:left-24 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            placeholder={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
          }
          spanText={"Public Name:"}
          placeholder={"Public Name"}
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          spanClassName={`w-40 text-right`}
          fontSize="text-base"
          colorBorder={colorsObject.primary}
        />

        <label
          className={`inline-flex items-center gap-10 w-full justify-center`}
        >
          <span
            className={`w-40 text-right after:left-24 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            placeholder={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label
          className={`inline-flex items-center gap-10 w-full justify-center`}
        >
          <span
            className={`w-40 text-right after:left-16 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Sub Type:
          </span>

          <CustomSelect
            placeholder={"Select status"}
            style={{ width: 240 }}
            className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const FeesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);
  return (
    <Fragment>
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
          }
          spanText={"Free name"}
          fontSize="text-base"
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          spanClassName={`max-w-46 text-right`}
          colorBorder={colorsObject.primary}
        />

        <label
          className={`inline-flex items-center gap-10 w-full justify-center`}
        >
          <span
            className={`w-40 text-right after:left-16 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            placeholder={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={StatusSelect}
            colorBorder={colorsObject.primary}
          />
        </label>

        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
          }
          spanText={"Public Name:"}
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          fontSize="text-base"
          spanClassName={`max-w-46`}
          colorBorder={colorsObject.primary}
        />

        <CustomInput
          classNames={
            "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
          }
          spanText={"Fee Amount:"}
          className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          fontSize="text-base"
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Fragment>
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <div className={`flex grid gap-y-5 justify-center`}>
          <CustomInput
            classNames={
              "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-[50px]"
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
              className={"h-[50px]"}
              options={StatusSelect}
              colorBorder={colorsObject.primary}
            />
          </label>

          <CustomInput
            classNames={
              "inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-[50px]"
            }
            spanText={`Discount code:`}
            className={"w-60"}
            fontSize="text-base"
            spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-[50px]"
            }
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
                  controlHeight: 40
                },
              }}
            >
              <DatePicker onChange={onChange} />
            </ConfigProvider>
          </>
        </label>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={classNames("pb-5 grid gap-y-5 justify-center")}>
        <CustomInput
          classNames={
            "inline-flex items-center flex-row-reverse gap-10 h-[50px]"
          }
          spanText={"Miscellaneous Item Name:"}
          fontSize="text-base"
          className={"w-60"}
          spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          colorBorder={colorsObject.primary}
        />

        <label className={`inline-flex justify-end gap-x-10 items-center`}>
          <span
            className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Status:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            className={"h-[50px]"}
            colorBorder={colorsObject.primary}
          />
        </label>

        <label className={`inline-flex justify-end gap-x-10 items-center`}>
          <span
            className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
          >
            Type:
          </span>

          <CustomSelect
            value={"Select status"}
            style={{ maxWidth: 240, width: "100%" }}
            options={StatusSelect}
            className={"h-[50px]"}
            colorBorder={colorsObject.primary}
          />
        </label>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const AddServiceModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-x-10 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              placeholder={"Service Name: *"}
              className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              classNames={
                "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
              }
              spanText={"Service Name:"}
              spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            />
            <CustomInput
              placeholder={"Service Code: *"}
              className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              classNames={
                "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
              }
              spanText={"Service Code:"}
              spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            />
            <CustomInput
              placeholder={"Service Status: *"}
              className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              classNames={
                "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
              }
              spanText={"Service Status:"}
              spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            />
            <label
              className={`inline-flex items-center w-full justify-between gap-10`}
            >
              <span
                className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Service Status:
              </span>
              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded h-[50px]`}
                placeholder={"Service Status: *"}
                options={[
                  {
                    value: "Active",
                    label: "Active",
                  },
                ]}
              />
            </label>
            <div className={`space-y-5`}>
              <div className={`flex items-center gap-10`}>
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Assign Locations:
                </span>
                <label className={`flex flex-col gap-5 items-center`}>
                  <span>Click to select</span>
                  <CustomTransfer
                    dataSource={mockData}
                    listHeight={200}
                    colorBorder={colorsObject.primary}
                  />
                </label>
              </div>

              <div className={`flex items-center gap-10`}>
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Service Items:
                </span>
                <label className={`flex flex-col gap-5 items-center`}>
                  <span>Click to select</span>
                  <CustomTransfer
                    dataSource={mockData}
                    listHeight={200}
                    colorBorder={colorsObject.primary}
                  />
                </label>
              </div>
            </div>
            <CustomCheckBox
              className={"gap-x-2.5 pl-[185px]"}
            >
              Is Service Taxable
            </CustomCheckBox>
            <CustomInput
              placeholder={"Service Price: *"}
              className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              classNames={
                "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse "
              }
              spanText={"Service Price:"}
              spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            />
            <CustomInput
              placeholder={"Web Name:"}
              className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              classNames={
                "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
              }
              spanText={"Web Name:"}
              spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            />
            <label
              className={`inline-flex items-center w-full justify-between gap-10`}
            >
              <span
                className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Web description
              </span>
              <textarea
                className={`w-full p-3 ${ManagementStyle["CheckModal__form-element__shadow"]} ${ManagementStyle["CheckModal__thrid-textarea"]}`}
              ></textarea>
            </label>
            <label
              className={`inline-flex items-center w-full justify-between gap-10`}
            >
              <span
                className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Enrollment Email Content:
              </span>
              <textarea
                className={`w-full p-3 ${ManagementStyle["CheckModal__form-element__shadow"]} ${ManagementStyle["CheckModal__thrid-textarea"]}`}
              ></textarea>
            </label>
          </div>
          {/*------------*/}
          <div className={`space-y-5`}>
            <label className={"inline-flex items-center w-full gap-10"}>
              <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                Allow Web Purchase:
              </span>
              <div className={"space-x-5"}>
                <CustomRadio
                  classNames={"inline-flex items-center gap-x-2.5"}
                  name={"web"}
                >
                  <span className={"text-sm font-medium"}>Yes</span>
                </CustomRadio>

                <CustomRadio
                  classNames={"inline-flex items-center gap-x-2.5"}
                  name={"web"}
                >
                  <span className={"text-sm font-medium"}>None</span>
                </CustomRadio>
              </div>
            </label>
            <label className={"inline-flex items-center w-full gap-10"}>
              <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                Allow Portal Purchase:
              </span>
              <div className={"space-x-5"}>
                <CustomRadio
                  classNames={"inline-flex items-center gap-x-2.5"}
                  name={"portal"}
                >
                  <span className={"text-sm font-medium"}>Yes</span>
                </CustomRadio>

                <CustomRadio
                  classNames={"inline-flex items-center gap-x-2.5"}
                  name={"portal"}
                >
                  <span className={"text-sm font-medium"}>None</span>
                </CustomRadio>
              </div>
            </label>
            <div className={`space-y-5`}>
              <div className={`flex items-center gap-10`}>
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Assign Locations:
                </span>
                <label className={`flex flex-col gap-5 items-center`}>
                  <span>Click to select</span>
                  <CustomTransfer
                    dataSource={mockData}
                    listHeight={200}
                    colorBorder={colorsObject.primary}
                  />
                </label>
              </div>

              <div className={`flex items-center gap-10`}>
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Service Items:
                </span>
                <label className={`flex flex-col gap-5 items-center`}>
                  <span>Click to select</span>
                  <CustomTransfer
                    dataSource={mockData}
                    listHeight={200}
                    colorBorder={colorsObject.primary}
                  />
                </label>
              </div>
            </div>
            <label
              className={`inline-flex items-center w-full justify-between gap-10`}
            >
              <span
                className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Associate Contract From OE:
              </span>
              <CustomSelect
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded h-[50px]`}
                placeholder={"Service Status: *"}
                options={[
                  {
                    value: "Active",
                    label: "Active",
                  },
                ]}
              />
            </label>
            <label
              className={`inline-flex items-center w-full justify-between gap-10`}
            >
              <span
                className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Service Notes:
              </span>
              <textarea
                className={`w-full p-3 ${ManagementStyle["CheckModal__form-element__shadow"]} ${ManagementStyle["CheckModal__thrid-textarea"]}`}
              ></textarea>
            </label>
          </div>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const FileCategoryModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <form className="flex gap-5 flex-col px-5">
      <CustomInput
        className={"border-indigo-700 border w-60"}
        classNames={
          "inline-flex justify-center h-[50px] items-center flex-row-reverse gap-5"
        }
        spanText={"Category name"}
        spanClassName={"font-semibold flex-shrink-0"}
        fontSize={"text-base"}
        placeholder={"Category name"}
      />

      <label className={"inline-flex justify-center items-center gap-5"}>
        <span className={"font-semibold text-end w-32 flex-shrink-0 text-base"}>
          File status
        </span>

        <div className={"w-60"}>
          <CustomSelect
            placeholder={"Select"}
            style={{ width: "100%" }}
            colorBorder={colorsObject.primary}
            className={"h-[50px]"}
            options={[
              {
                value: "active",
                label: "active",
              },
            ]}
          />
        </div>
      </label>

      <label className={"inline-flex justify-center items-center gap-5"}>
        <span className={"font-semibold text-end w-32 flex-shrink-0 text-base"}>
          Packages:
        </span>

        <CustomTransfer
          dataSource={mockData}
          titles={["Source", "Target"]}
          colorBorder={colorsObject.primary}
          colorBgContainer={"transparent"}
          headerHeight={30}
          listHeight={200}
        />
      </label>

      <label className={"inline-flex justify-center items-center gap-5"}>
        <span className={"font-semibold text-end w-32 flex-shrink-0 text-base"}>
          Signature link:
        </span>

        <textarea
          className={
            "border w-[451px] outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px]"
          }
          placeholder={"text"}
        ></textarea>
      </label>

      <label className={"inline-flex justify-center items-center gap-5"}>
        <span className={"font-semibold text-end w-32 flex-shrink-0 text-base"}>
          Note:
        </span>

        <textarea
          className={
            "border w-[451px] outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px]"
          }
          placeholder={"text"}
        ></textarea>
      </label>

      <div className={"grid grid-cols-2 gap-y-5 pt-8"}>
        <label className={"inline-flex justify-center items-center gap-8"}>
          <span
            className={"font-semibold text-end w-52 flex-shrink-0 text-base"}
          >
            Display on Student Portal:
          </span>
          <Switch
            style={{
              width: 50,
            }}
          />
        </label>

        <label className={"inline-flex justify-center items-center gap-8"}>
          <span
            className={"font-semibold text-end w-52 flex-shrink-0 text-base"}
          >
            Must Be Uploaded to Student Account:
          </span>
          <Switch
            style={{
              width: 50,
            }}
          />
        </label>

        <label className={"inline-flex justify-center items-center gap-8"}>
          <span
            className={"font-semibold text-end w-52 flex-shrink-0 text-base"}
          >
            Disallow files associated with category from displaying on Student
            Portal:
          </span>
          <Switch
            style={{
              width: 50,
            }}
          />
        </label>

        <label className={"inline-flex justify-center items-center gap-8"}>
          <span
            className={"font-semibold text-end w-52 flex-shrink-0 text-base"}
          >
            Disallow files associated with this category from displaying on
            Instructor/Teacher Portal:
          </span>
          <Switch
            style={{
              width: 50,
            }}
          />
        </label>
      </div>

      <div className="text-center space-x-5">
        <ButtonComponent
          defaultBg={colorsObject.success}
          defaultHoverBg={colorsObject.successHover}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          borderRadius={5}
          
          paddingInline={44}
        >
          Save
        </ButtonComponent>

        <ButtonComponent
          defaultBg={colorsObject.main}
          defaultHoverBg={colorsObject.main}
          defaultBorderColor={colorsObject.primary}
          defaultHoverBorderColor={colorsObject.primary}
          defaultColor={colorsObject.primary}
          defaultHoverColor={colorsObject.primary}
          borderRadius={5}
          
          paddingInline={44}
          onClick={handleCancel}
        >
          Cancel
        </ButtonComponent>
      </div>
    </form>
  );
};

export const AddStaffModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <form className={"space-y-5"}>
      <div className={"grid grid-cols-2 gap-x-10 px-5"}>
        <div className={"space-y-5"}>
          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Status
            </span>
            <CustomSelect
              placeholder={"Status"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "Active",
                  label: "Active",
                },
              ]}
            />
          </label>

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Staff type
            </span>
            <CustomSelect
              placeholder={"Select"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "Active",
                  label: "Active",
                },
              ]}
            />
          </label>

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Location
            </span>
            <CustomSelect
              placeholder={"Select"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "USA",
                  label: "USA",
                },
              ]}
            />
          </label>

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm font-medium w-56 flex-shrink-0 text-right">
              Vehicle assigned
            </span>
            <CustomSelect
              placeholder={"Select"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "Car",
                  label: "Car",
                },
              ]}
            />
          </label>

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Staff code"}
            placeholder={"Staff code"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-9 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"First name"}
            placeholder={"First name"}
            spanClassName={`text-sm font-medium w-52 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Middle name"}
            placeholder={"Middle name"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Last name"}
            placeholder={"Last name"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Address"}
            placeholder={"Address"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"City"}
            placeholder={"City"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Location
            </span>
            <CustomSelect
              placeholder={"Select"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "USA",
                  label: "USA",
                },
              ]}
            />
          </label>

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Zip"}
            placeholder={"Zip"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            type={"email"}
            spanText={"Email"}
            placeholder={"Email"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Home phone"}
            placeholder={"Home phone"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Cell phone"}
            placeholder={"Cell phone"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Emergency Contact Name"}
            placeholder={"Emergency Contact Name"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Emergency Contact Relation
            </span>
            <CustomSelect
              placeholder={"Please select"}
              style={{ width: "100%" }}
              colorBorder={colorsObject.primary}
              className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              options={[
                {
                  value: "Number",
                  label: "Number",
                },
              ]}
            />
          </label>

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
            }
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            spanText={"Emergency Contact Phone"}
            placeholder={"Emergency Contact Phone"}
            spanClassName={"text-sm font-medium w-56 flex-shrink-0 text-right"}
            colorBorder={colorsObject.primary}
          />
        </div>
        <div className={"space-y-5"}>
          <CustomInput
            placeholder={"MM/DD/YYYY"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"DOB: "}
            spanClassName={`w-56 font-medium text-end flex-shrink-0`}
          />

          <CustomInput
            placeholder={"Instructor Permit  Number"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Instructor Permit Number"}
            spanClassName={`w-56 font-medium text-end flex-shrink-0`}
          />

          <CustomInput
            placeholder={"MM/DD/YYYY"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"In Car Permit Issued Date"}
            spanClassName={`w-56 font-medium text-end flex-shrink-0`}
          />

          <CustomInput
            placeholder={"MM/DD/YYYY"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Permit Expiration Date"}
            spanClassName={`w-56 font-medium text-end flex-shrink-0`}
          />

          <CustomInput
            placeholder={"Select"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"User name"}
            spanClassName={`w-56 font-medium text-end flex-shrink-0`}
          />

          <CustomInput
            placeholder={"Password *"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Password"}
            spanClassName={`w-56 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]} `}
          />

          <CustomInput
            placeholder={"Re Enter Password *"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Re Enter Password"}
            spanClassName={`w-56 text-end font-medium flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]} `}
          />

          <CustomCheckBox className={"w-full flex justify-center"}>
            <span className={`font-medium text-sm`}>
              Assign Appointment Color
            </span>
          </CustomCheckBox>

          <CustomInput
            placeholder={"#FFFFFF"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Appointment Color"}
            spanClassName={`w-56 text-end font-medium flex-shrink-0`}
          />

          <CustomInput
            placeholder={"Zoom PMI"}
            className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={
              "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
            }
            spanText={"Zoom PMI"}
            spanClassName={`w-56 text-end font-medium flex-shrink-0`}
          />

          <label className="inline-flex gap-5 items-center w-full">
            <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
              Staff Profile Picture
            </span>
          </label>
        </div>
      </div>

      <div className="text-center space-x-5">
        <ButtonComponent
          defaultBg={colorsObject.success}
          defaultHoverBg={colorsObject.successHover}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          borderRadius={5}
          
          paddingInline={44}
        >
          Save
        </ButtonComponent>

        <ButtonComponent
          defaultBg={colorsObject.main}
          defaultHoverBg={colorsObject.main}
          defaultBorderColor={colorsObject.primary}
          defaultHoverBorderColor={colorsObject.primary}
          defaultColor={colorsObject.primary}
          defaultHoverColor={colorsObject.primary}
          borderRadius={5}
          
          paddingInline={44}
          onClick={handleCancel}
        >
          Cancel
        </ButtonComponent>
      </div>
    </form>
  );
};

export const LocationModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location name"}
              placeholder={"Location name"}
              spanClassName={
                "text-sm font-medium w-56 flex-shrink-0 text-right"
              }
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location name"}
              placeholder={"Location Code *"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Location Status
              </span>
              <CustomSelect
                placeholder={"Location Status *"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Location Type
              </span>

              <div className="space-y-4">
                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Main office only
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Main office with classroom
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Class Room
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Other (Satellite Office Only)
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Other Classroom (Satellite Office with Classroom)
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                    Range
                  </span>
                </CustomCheckBox>
              </div>
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Address"}
              placeholder={"Address"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"City"}
              placeholder={"City"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"State"}
              placeholder={"State"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Zip"}
              placeholder={"Zip"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location Manager"}
              placeholder={"Location Manager"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Pickup location
              </span>
              <CustomSelect
                placeholder={"Pickup location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Drop off location
              </span>
              <CustomSelect
                placeholder={"Drop off location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"County"}
              placeholder={"County"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div className={"space-y-5"}>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center h-[50px]"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Road Test
              </span>
            </CustomCheckBox>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Knowledge Test
              </span>
            </CustomCheckBox>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Phone Main"}
              placeholder={"Phone Main"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Fax"}
              placeholder={"Fax"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className="text-right">Area Coverage</span>
              <CustomTransfer
                dataSource={mockData}
                titles={["Source", "Target"]}
                colorBorder={colorsObject.primary}
                colorBgContainer={"transparent"}
                headerHeight={30}
                listHeight={200}
              />
            </label>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span
                className="text-sm flex-shrink-0 font-medium w-56 text-right"
              >Location note</span>
              <textarea
                className={`p-3 min-h-[240px] w-full outline-0 border border-indigo-600 shadow-2xl rounded-lg`}
              ></textarea>
            </label>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center pl-8"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Appointment Color
              </span>
            </CustomCheckBox>
            <label className="flex items-center gap-4 justify-center">
              <span>Color picker</span>
              <CustomCheckBox />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse gap-8 items-center w-56 h-[50px]"
                }
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                type="color"
                placeholder={"#FFFFFF"}
                colorBorder={colorsObject.primary}
              />
            </label>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center pl-9"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Distance based scheduling
              </span>
            </CustomCheckBox>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Distance Coverage in Miles"}
              placeholder={"Distance Coverage in Miles"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Provider Location Id"}
              placeholder={"Provider Location Id"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
        </div>
        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const AddSchoolModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Name"}
              placeholder={"School Name"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                School Status
              </span>
              <CustomSelect
                placeholder={"Location Status *"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Code"}
              placeholder={"School Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Address"}
              placeholder={"School Address"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School City"}
              placeholder={"School City"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right`}
              >
                State
              </span>
              <CustomSelect
                placeholder={"Pickup location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-[50px]"}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Zip Code"}
              placeholder={"Zip Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              type={"email"}
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Email"}
              placeholder={"Email"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span>School notes</span>
              <textarea
                className={`p-3 outline-0 border border-indigo-600 shadow-2xl rounded-lg w-full min-h-[145px]`}
                placeholder={"School notes"}
              ></textarea>
            </label>
          </div>
        </div>
        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const HowHearModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Lead Name"}
              placeholder={"Lead Name"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Lead Status
              </span>
              <CustomSelect
                placeholder={"Lead Status"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Lead Code"}
              placeholder={"Lead Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Lead Status
              </span>
              <DatePicker
                className={"w-full border border-indigo-600 h-[50px]"}
                placeholder={"DD/MM/YYYY"}
              />
            </label>
          </div>
          <div>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span>School notes</span>
              <textarea
                className={`p-3 outline-0 border border-indigo-600 shadow-2xl rounded-lg w-full min-h-[145px]`}
                placeholder={"School notes"}
              ></textarea>
            </label>
          </div>
        </div>
        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const VehiclesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5 px-5"}>
        <div className="grid grid-cols-2 gap-5">
          <div className={"space-y-5"}>
            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Vehicle Name
              </span>
              <CustomSelect
                placeholder={"Vehicle Name"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Vehicle Status
              </span>
              <CustomSelect
                placeholder={"Vehicle Status"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right`}
              >
                At Location
              </span>
              <CustomSelect
                placeholder={"At Location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right `}
              >
                Vehicle Type
              </span>
              <CustomSelect
                placeholder={"Vehicle Type"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle No"}
              placeholder={"Vehicle No"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Make"}
              placeholder={"Vehicle Make"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"License Plate"}
              placeholder={"License Plate"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"VIN#"}
              placeholder={"VIN#"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div className={"space-y-5"}>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className={"flex-shrink-0 w-56"}>Appointment Color</span>

              <ColorPicker
                defaultValue="#000"
                showText={(color) => <span>{color.toHexString()}</span>}
                className={`w-full justify-start pl-2 border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Enable Appointment Color"}
              placeholder={"Enable Appointment Color"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Note"}
              placeholder={"Vehicle Note"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle ESN Or AIR ID"}
              placeholder={"Vehicle ESN Or AIR ID"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Odometer Value"}
              placeholder={"Odometer Value"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Initial Mileage"}
              placeholder={"Vehicle Initial Mileage"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className={"flex-shrink-0 w-56"}>Vehicle Image</span>

              <div className="w-full ">@todo</div>
            </label>
          </div>
        </div>
        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            
            paddingInline={44}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            
            paddingInline={44}
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
