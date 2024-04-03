import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Checkbox } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown } from "react-icons/io";
import EnrollmentStyle from "./enrollment.module.scss";

const Enrollment = () => {
  const { colorsObject } = useContext(ColorsContext),
    defaultValue = "Package selection",
    [Package, setPackage] = useState(defaultValue),
    [Classes, setClasses] = useState(defaultValue),
    [InfoType, setInfoType] = useState(defaultValue),
    Options = [
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
    ],
    ClassOptions = [
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
    ],
    InfoTypeOptions = [
      {
        value: "Teen",
      },
      {
        value: "Adult",
      },
      {
        value: "Knowledge test",
      },
      {
        value: "Road test",
      },
    ];
  return (
    <Fragment>
      <Helmet>
        <title>New student enrollment</title>
      </Helmet>

      <section
        className={`px-11 space-y-5 max-w-full w-full ${EnrollmentStyle["Enrollment"]}`}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          New Student Enrollment
        </Title>

        <div className={EnrollmentStyle["Enrollment__selections"]}>
          <div>
            <div className={`bg-white p-5 rounded-3xl shadow-lg`}>
              <Title
                fontSize={"text-xl"}
                fontWeightStrong={500}
                titleMarginBottom={5}
                level={2}
              >
                Package selection
              </Title>
              <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
                Select the package to enroll students
              </Paragraph>

              <CustomSelect
                value={Package}
                onChange={(value) => setPackage(value)}
                options={Options}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                optionFontSize={14}
                optionSelectedFontWeight={400}
                fontSize={16}
                colorBorder={colorsObject.primary}
              />
              <div className="flex justify-between mb-2.5">
                <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                  You choosen:
                </Paragraph>
                <Paragraph fontSize={"text-xs text-gray-600"}>
                  Sub total $338 Tax: $0 Coupon: $338
                </Paragraph>
              </div>

              <div className={`flex flex-col gap-y-3.5 pl-4 mb-5`}>
                {/*Item Start*/}
                <div className="flex justify-between">
                  <div className="flex gap-x-2.5 items-center">
                    <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
                      1
                    </Paragraph>
                    <Paragraph fontSize={"text-xs"} fontWeightStrong={400}>
                      8h in car instruction
                    </Paragraph>
                    <Paragraph
                      fontSize={"text-xs text-gray-600"}
                      fontWeightStrong={400}
                    >
                      74h
                    </Paragraph>
                  </div>

                  <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
                    $169
                  </Paragraph>
                </div>
                {/*Item Start*/}

                {/*Item Start*/}
                <div className="flex justify-between">
                  <div className="flex gap-x-2.5 items-center">
                    <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
                      2
                    </Paragraph>
                    <Paragraph fontSize={"text-xs"} fontWeightStrong={400}>
                      8h in car instruction
                    </Paragraph>
                    <Paragraph
                      fontSize={"text-xs text-gray-600"}
                      fontWeightStrong={400}
                    >
                      74h
                    </Paragraph>
                  </div>

                  <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
                    $169
                  </Paragraph>
                </div>
                {/*Item Start*/}
              </div>
              <div className="flex justify-between">
                <div className={"space-x-2.5"}>
                  <ButtonComponent
                    defaultBg={"#24C18F"}
                    defaultHoverBg={"#24C18F"}
                    paddingInline={12}
                    // paddingBlock={4}
                    controlHeight={40}
                  >
                    Add Package
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    paddingInline={28}
                    controlHeight={40}
                  >
                    Coupon
                  </ButtonComponent>
                </div>

                <Paragraph fontSize={"text-xl"} fontWeightStrong={400}>
                  $340
                </Paragraph>
              </div>
            </div>
          </div>

          <div>
            <div className={`bg-white p-5 rounded-3xl shadow-lg`}>
              <Title
                fontSize={"text-xl"}
                fontWeightStrong={500}
                titleMarginBottom={5}
              >
                Class selection
              </Title>
              <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
                Select the package to enroll students
              </Paragraph>

              <CustomSelect
                value={Classes}
                onChange={(value) => setClasses(value)}
                options={ClassOptions}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                colorBorder={colorsObject.primary}
              />

              <div className="mb-5">
                <div className="border-2 rounded-3xl border-indigo-500 flex items-center">
                  <Paragraph
                    className={"border-r-2 border-r-indigo-500"}
                    fontSize={"text-base p-4 "}
                    fontWeightStrong={400}
                  >
                    1
                  </Paragraph>
                  <Paragraph fontSize={"text-base p-4"} fontWeightStrong={400}>
                    8h in car instruction
                  </Paragraph>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  paddingInline={28}
                  // paddingBlock={4}
                  controlHeight={40}
                >
                  Add Package
                </ButtonComponent>
                <div className="inline-flex gap-x-2.5">
                  <Paragraph fontSize={"text-xl text-gray-600"}>
                    Total:
                  </Paragraph>
                  <Paragraph fontSize={"text-xl text-black"}>$169</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-lg p-5 bg-white rounded-3xl">
          <Title
            fontSize={"text-xl"}
            fontWeightStrong={500}
            titleMarginBottom={5}
          >
            Student information type
          </Title>

          <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
            Select the package to enroll students
          </Paragraph>

          <CustomSelect
            value={InfoType}
            onChange={(value) => setInfoType(value)}
            options={InfoTypeOptions}
            style={{ width: "100%", maxWidth: "570px" }}
            className={"mb-2.5"}
            colorBorder={colorsObject.primary}
          />

          <form>
            <div className={`grid ${EnrollmentStyle["Enrollment__info-type"]}`}>
              <div className={"space-y-5"}>
                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Assign to staff
                  </Paragraph>

                  <CustomSelect
                    value={"Account #"}
                    // onChange={(value) => setInfoType(value)}
                    options={InfoTypeOptions}
                    style={{ maxWidth: "408px" }}
                    className={" w-full"}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Assign to Location
                  </Paragraph>

                  <CustomSelect
                    value={"Select  Location"}
                    // onChange={(value) => setInfoType(value)}
                    options={InfoTypeOptions}
                    style={{ maxWidth: "408px" }}
                    className={" w-full"}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Studetn id
                  </Paragraph>

                  <div style={{ maxWidth: "408px" }} className={" w-full"}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Student id"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    First name
                  </Paragraph>

                  <div style={{ maxWidth: "408px" }} className={" w-full"}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"First name"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Last name
                  </Paragraph>

                  <div style={{ maxWidth: "408px" }} className={" w-full"}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Last name"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Middle name
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Middle name"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Address
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Address"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    City
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"City"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    State
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomSelect
                      value={"State"}
                      // onChange={(value) => setInfoType(value)}
                      options={InfoTypeOptions}
                      style={{ width: "408px" }}
                      className={"mb-2.5"}
                      colorBorder={colorsObject.primary}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Zip/Postal code
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Zip/Postal code"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Home Phone
                  </Paragraph>

                  <div
                    style={{ width: "408px" }}
                    className={`flex items-center rounded-lg ${EnrollmentStyle["Enrollment__input-wrap"]}`}
                  >
                    <input
                      placeholder={"Home Phone"}
                      className={`${EnrollmentStyle["Enrollment__input"]} flex-grow px-5 py-2.5 w-44`}
                    />

                    <CustomCheckBox
                      className={"flex-row-reverse px-5 items-center pt-1.5"}
                    >
                      Send text
                    </CustomCheckBox>
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Home Phone
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Email
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"email"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Email"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Gender
                  </Paragraph>

                  <Checkbox.Group
                    className={"space-x-2.5 w-full"}
                    style={{ maxWidth: "408px" }}
                  >
                    <CustomCheckBox>
                      <Text fontSize={"text-base"}>Male </Text>
                    </CustomCheckBox>

                    <CustomCheckBox>
                      <Text fontSize={"text-base"}>Male </Text>
                    </CustomCheckBox>

                    <CustomCheckBox>
                      <Text fontSize={"text-base"}>Male </Text>
                    </CustomCheckBox>
                  </Checkbox.Group>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Perferred Pronoun
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Perferred Pronoun"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Medical condition
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                    ></textarea>
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Student driving notes
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                    ></textarea>
                  </div>
                </label>

                <label className="flex items-center justify-end w-full">
                  <div style={{ width: "408px" }}>
                    <CustomCheckBox className={"text-base font-normal"}>
                      I have read and agreed to Terms and Conditions
                    </CustomCheckBox>
                  </div>
                </label>
              </div>
            </div>

            <div className={"py-6 text-center space-x-7"}>
              <ButtonComponent
                defaultBg={"#3CE3AE"}
                defaultHoverBg={"#3CE3AE"}
                paddingInline={97}
                controlHeight={40}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.primary}
                defaultHoverBg={colorsObject.primary}
                paddingInline={16}
                controlHeight={40}
                className={"inline-flex items-center gap-2.5"}
              >
                <span>Apply Payment & Save</span>
                <IoIosArrowDown />
              </ButtonComponent>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Enrollment;
