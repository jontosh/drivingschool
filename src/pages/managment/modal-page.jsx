import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import ManagementStyle from "./management.module.scss";

const CheckModal = ({ modalName }) => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  switch (modalName?.toLowerCase()) {
    case "add-service": {
      return (
        <Fragment>
          <Helmet>
            <title>ADD SERVICES</title>
          </Helmet>
          <div className={"-mx-11 -my-5 px-7 py-12  bg-white"}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={50}
            >
              ADD SERVICES (PACKAGES)
            </Title>

            <form>
              <div className="grid grid-cols-2 gap-x-10">
                <div className={"space-y-5"}>
                  <CustomInput
                    placeholder={"Service Name: *"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Service Name:"}
                    spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  />
                  <CustomInput
                    placeholder={"Service Code: *"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Service Code:"}
                    spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  />
                  <CustomInput
                    placeholder={"Service Status: *"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
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
                      className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      placeholder={"Service Status: *"}
                      options={[
                        {
                          value: "Active",
                          label: "Active",
                        },
                      ]}
                    />
                  </label>
                  @todo
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
                  @todo
                </div>
              </div>

              <div className="space-x-5 text-center">
                <ButtonComponent
                  defaultHoverBg={colorsObject.secondary}
                  defaultBg={colorsObject.secondary}
                  paddingInline={62}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Close
                </ButtonComponent>

                <ButtonComponent
                  defaultHoverBg={"#24C18F"}
                  defaultBg={"#24C18F"}
                  paddingInline={47}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Continue
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Fragment>
      );
    }
    case "add-staff": {
      return (
        <Fragment>
          <Helmet>
            <title>Add Staff</title>
          </Helmet>
          <div className={`-mx-11 -my-5 px-7 py-12  bg-white`}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={50}
            >
              Add Staff
            </Title>
            <form>
              <div className={"grid grid-cols-2 gap-x-10"}>
                <div className={"space-y-5"}>
                  <label className="inline-flex gap-5 items-center w-full">
                    <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
                      Status
                    </span>
                    <CustomSelect
                      placeholder={"Status"}
                      style={{ width: "100%" }}
                      colorBorder={colorsObject.primary}
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Staff code"}
                    placeholder={"Staff code"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-9 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"First name"}
                    placeholder={"First name"}
                    spanClassName={`text-sm font-medium w-52 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Middle name"}
                    placeholder={"Middle name"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Last name"}
                    placeholder={"Last name"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Address"}
                    placeholder={"Address"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"City"}
                    placeholder={"City"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Zip"}
                    placeholder={"Zip"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    type={"email"}
                    spanText={"Email"}
                    placeholder={"Email"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Home phone"}
                    placeholder={"Home phone"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Cell phone"}
                    placeholder={"Cell phone"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Emergency Contact Name"}
                    placeholder={"Emergency Contact Name"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      "inline-flex flex-row-reverse gap-5 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Emergency Contact Phone"}
                    placeholder={"Emergency Contact Phone"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />
                </div>
                <div className={"space-y-5"}>
                  <CustomInput
                    placeholder={"MM/DD/YYYY"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"DOB: "}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"Instructor Permit  Number"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Instructor Permit Number"}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"MM/DD/YYYY"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"In Car Permit Issued Date"}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"MM/DD/YYYY"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Permit Expiration Date"}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"Select"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"User name"}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"Password *"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Password"}
                    spanClassName={`w-56 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]} `}
                  />

                  <CustomInput
                    placeholder={"Re Enter Password *"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
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
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                    }
                    spanText={"Appointment Color"}
                    spanClassName={`w-56 text-end font-medium flex-shrink-0`}
                  />

                  <CustomInput
                    placeholder={"Zoom PMI"}
                    className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
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
              <div className="space-x-5 text-center">
                <ButtonComponent
                  defaultHoverBg={colorsObject.secondary}
                  defaultBg={colorsObject.secondary}
                  paddingInline={62}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Close
                </ButtonComponent>

                <ButtonComponent
                  defaultHoverBg={"#24C18F"}
                  defaultBg={"#24C18F"}
                  paddingInline={47}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Continue
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Fragment>
      );
    }
    case "location": {
      return (
        <Fragment>
          <Helmet>
            <title>Add location</title>
          </Helmet>
          <div className={`-mx-11 -my-5 px-7 py-12  bg-white`}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={50}
            >
              New location
            </Title>
            <form>
              <div className="grid grid-cols-2 gap-7">
                <div className={"space-y-5"}>
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Location name"}
                    placeholder={"Location name"}
                    spanClassName={
                      "text-sm font-medium w-56 flex-shrink-0 text-right"
                    }
                    colorBorder={colorsObject.primary}
                  />
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
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
                      className={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Main office only
                        </span>
                      </CustomCheckBox>

                      <CustomCheckBox
                        className={"space-x-2.5 "}
                        classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Main office with classroom
                        </span>
                      </CustomCheckBox>

                      <CustomCheckBox
                        className={"space-x-2.5 "}
                        classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Class Room
                        </span>
                      </CustomCheckBox>

                      <CustomCheckBox
                        className={"space-x-2.5 "}
                        classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Other (Satellite Office Only)
                        </span>
                      </CustomCheckBox>

                      <CustomCheckBox
                        className={"space-x-2.5 "}
                        classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Other Classroom (Satellite Office with Classroom)
                        </span>
                      </CustomCheckBox>

                      <CustomCheckBox
                        className={"space-x-2.5 "}
                        classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-56"}
                        >
                          Range
                        </span>
                      </CustomCheckBox>
                    </div>
                  </label>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Address"}
                    placeholder={"Address"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"City"}
                    placeholder={"City"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"State"}
                    placeholder={"State"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Zip"}
                    placeholder={"Zip"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
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
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"County"}
                    placeholder={"County"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />
                </div>
                <div className={"space-y-5"}>
                  <CustomCheckBox
                    className={"space-x-2.5 w-full justify-center"}
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
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Phone Main"}
                    placeholder={"Phone Main"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Fax"}
                    placeholder={"Fax"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse gap-8 items-center w-full"
                    }
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    spanText={"Other"}
                    placeholder={"Other"}
                    spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />
                  @todo
                </div>
              </div>
              <div className="space-x-5 text-center pt-10">
                <ButtonComponent
                  defaultHoverBg={colorsObject.secondary}
                  defaultBg={colorsObject.secondary}
                  paddingInline={62}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Close
                </ButtonComponent>

                <ButtonComponent
                  defaultHoverBg={"#24C18F"}
                  defaultBg={"#24C18F"}
                  paddingInline={47}
                  borderRadius={5}
                  controlHeight={39}
                  onClick={handleBack}
                >
                  Continue
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Fragment>
      );
    }
  }
};
const ModalPage = () => {
  const { modal } = useParams();

  return <CheckModal modalName={modal} />;
};

export default ModalPage;
