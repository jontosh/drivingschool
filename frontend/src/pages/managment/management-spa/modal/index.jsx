import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { ColorPicker } from "antd";
import { Fragment, useContext } from "react";

export const ModalContent = ({ page }) => {
  const { colorsObject } = useContext(ColorsContext);

  switch (page?.toLowerCase()) {
    case "high school": {
      return (
        <Fragment>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={50}
          >
            Add school
          </Title>
          <form>
            <div className="grid grid-cols-2 gap-7">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Name"}
                  placeholder={"School Name"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    School Status
                  </span>
                  <CustomSelect
                    placeholder={"School Status *"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-10 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Code"}
                  placeholder={"School Code"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Address"}
                  placeholder={"School Address"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School City"}
                  placeholder={"School City"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    State
                  </span>
                  <CustomSelect
                    placeholder={"State"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={"h-10"}
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Zip Code"}
                  placeholder={"Zip Code"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"email"}
                  spanText={"Email"}
                  placeholder={"Email"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />
              </div>

              <div className="space-y-5">
                <label className="w-full inline-flex items-center">
                  <span className="text-sm font-medium w-32">School notes</span>
                  <textarea
                    className={`w-full outline-0 p-3 ${ManagementStyle["CheckModal__second-textarea"]} ${ManagementStyle["CheckModal__form-element__shadow"]} rounded-2xl border border-indigo-700`}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className="space-x-5 text-center pt-10">
              <ButtonComponent
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                paddingInline={62}
                borderRadius={5}
              >
                Close
              </ButtonComponent>

              <ButtonComponent
                defaultHoverBg={"#24C18F"}
                defaultBg={"#24C18F"}
                paddingInline={47}
                borderRadius={5}
              >
                Continue
              </ButtonComponent>
            </div>
          </form>
        </Fragment>
      );
    }
    case "how did you hear": {
      return (
        <Fragment>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={50}
          >
            Add How did you hear
          </Title>
          <form>
            <div className="grid grid-cols-2 gap-7">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Lead Name"}
                  placeholder={"Lead Name *"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Lead Status
                  </span>
                  <CustomSelect
                    placeholder={"School Status *"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-10 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Lead Code"}
                  placeholder={"Lead Code"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Expiration"}
                  placeholder={"MM/DD/YYYY"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right `}
                  colorBorder={colorsObject.primary}
                />
              </div>

              <div className="space-y-5">
                <label className="w-full inline-flex items-center">
                  <span className="text-sm font-medium w-32">School notes</span>
                  <textarea
                    className={`w-full min-h-36 outline-0 p-3 ${ManagementStyle["CheckModal__form-element__shadow"]} rounded-2xl border border-indigo-700`}
                  ></textarea>
                </label>
              </div>
            </div>
            <div className="space-x-5 text-center pt-10">
              <ButtonComponent
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                paddingInline={62}
                borderRadius={5}
              >
                Close
              </ButtonComponent>

              <ButtonComponent
                defaultHoverBg={"#24C18F"}
                defaultBg={"#24C18F"}
                paddingInline={47}
                borderRadius={5}
              >
                Continue
              </ButtonComponent>
            </div>
          </form>
        </Fragment>
      );
    }
    case "vehicles": {
      return (
        <Fragment>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={50}
          >
            Add Vehicle
          </Title>
          <form>
            <div className="grid grid-cols-2 gap-7">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle Name"}
                  placeholder={"Vehicle Name *"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative`}
                  >
                    At Location
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`h-10 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "USA",
                        label: "USA",
                      },
                    ]}
                  />
                </label>

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative`}
                  >
                    Vehicle Type
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`h-10 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle No"}
                  placeholder={"Vehicle No"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle Make"}
                  placeholder={"First name"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"VIN#"}
                  placeholder={"Last name"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />
              </div>

              <div className="space-y-5">
                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-56 text-right relative`}
                  >
                    Appointment Color
                  </span>
                  <ColorPicker
                    showText={(color) => <span>{color.toHexString()}</span>}
                    className={`w-full h-10 justify-start pl-2 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Enable AppointmentColor"}
                  placeholder={"Instructor Permit Number"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle Note"}
                  placeholder={"MM/DD/YYYY"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle ESN Or AIR ID"}
                  placeholder={"MM/DD/YYYY"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Odometer Value"}
                  placeholder={"Select"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-10"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"text"}
                  spanText={"Vehicle Initial Mileage"}
                  placeholder={"Password *"}
                  spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex gap-8 items-center">
                  <span className="font-medium w-56 flex-shrink-0 text-right">
                    Vehicle Image
                  </span>
                  <div
                    className={`${ManagementStyle["CheckModal__div"]} ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    style={{ width: 269, height: 240 }}
                  ></div>
                </label>
              </div>
            </div>

            <div className="space-x-5 text-center pt-10">
              <ButtonComponent
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                paddingInline={62}
                borderRadius={5}
              >
                Close
              </ButtonComponent>

              <ButtonComponent
                defaultHoverBg={"#24C18F"}
                defaultBg={"#24C18F"}
                paddingInline={47}
                borderRadius={5}
              >
                Continue
              </ButtonComponent>
            </div>
          </form>
        </Fragment>
      );
    }
    default:
      throw new Error(page);
  }
};
