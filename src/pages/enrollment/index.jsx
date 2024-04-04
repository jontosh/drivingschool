import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Checkbox } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown } from "react-icons/io";
import EnrollmentStyle from "./enrollment.module.scss";

const PackageSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      hours: 74,
      price: 169,
      value: 1,
    },
    {
      id: 2,
      label: "10h in car instruction",
      hours: 74,
      price: 209,
      value: 2,
    },
    {
      id: 3,
      label: "3h in car instruction",
      hours: 15,
      price: 103,
      value: 3,
    },
  ],
  ClassSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      value: 1,
      price: 169,
    },
    {
      id: 2,
      label: "10h in car instruction",
      value: 2,
      price: 209,
    },
    {
      id: 3,
      label: "3h in car instruction",
      value: 3,
      price: 103,
    },
  ];

const Enrollment = () => {
  const { colorsObject } = useContext(ColorsContext),
    defaultValue = "Package selection",
    [Package, setPackage] = useState(defaultValue),
    [Classes, setClasses] = useState(defaultValue),
    [InfoType, setInfoType] = useState(defaultValue),
    [Lead, setLead] = useState("Select"),
    [SelectedPackages, setSelectedPackages] = useState([]),
    [SelectedClass, setSelectedClass] = useState([]),
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
  const LeadOptions = [
    {
      value: 1,
    },
    {
      value: 2,
    },
  ];

  useEffect(() => {
    PackageSelectionArray.map((item) => {
      if (Package === item.value) {
        setSelectedPackages([...SelectedPackages, item]);
      }
    });
  }, [Package]);

  let totalPrice = 0;

  const packageItem = SelectedPackages.map(({ price, hours, label }, index) => {
    totalPrice += price;
    index += 1;
    return (
      <Fragment key={index}>
        {/*Item Start*/}
        <div className="flex justify-between">
          <div className="flex gap-x-2.5 items-center">
            <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
              {index}
            </Paragraph>
            <Paragraph fontSize={"text-xs"} fontWeightStrong={400}>
              {label}
            </Paragraph>
            <Paragraph
              fontSize={"text-xs text-gray-600"}
              fontWeightStrong={400}
            >
              {hours}h
            </Paragraph>
          </div>

          <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
            ${price}
          </Paragraph>
        </div>
        {/*Item Start*/}
      </Fragment>
    );
  });

  useEffect(() => {
    ClassSelectionArray.map((item) => {
      if (item.value === Classes) {
        setSelectedClass([...SelectedClass, item]);
      }
    });
  }, [Classes]);

  let totalClassPrice = 0;
  const classItem = SelectedClass?.map(({ label, price }, index) => {
    index += 1;
    totalClassPrice += price;
    return (
      <div
        className="border-2 rounded-3xl border-indigo-500 flex items-center"
        key={index}
      >
        <Paragraph
          className={"border-r-2 border-r-indigo-500"}
          fontSize={"text-base p-4 "}
          fontWeightStrong={400}
        >
          {index}
        </Paragraph>
        <Paragraph fontSize={"text-base p-4"} fontWeightStrong={400}>
          {label}
        </Paragraph>
      </div>
    );
  });

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
                options={PackageSelectionArray}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                optionFontSize={14}
                optionSelectedFontWeight={400}
                fontSize={16}
                colorBorder={colorsObject.primary}
              />

              {SelectedPackages?.length > 0 ? (
                <Fragment>
                  <div className="flex justify-between mb-2.5">
                    <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                      You choosen:
                    </Paragraph>
                    <Paragraph fontSize={"text-xs text-gray-600"}>
                      Sub total ${totalPrice} Tax: $0 Coupon: $338
                    </Paragraph>
                  </div>
                </Fragment>
              ) : null}

              {SelectedPackages?.length > 0 ? (
                <div className={`flex flex-col gap-y-3.5 pl-4 mb-5`}>
                  {packageItem}
                </div>
              ) : null}

              {SelectedPackages?.length > 0 ? (
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
                    ${totalPrice}
                  </Paragraph>
                </div>
              ) : null}
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
                options={ClassSelectionArray}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                colorBorder={colorsObject.primary}
              />

              {SelectedClass?.length > 0 ? (
                <div className={"mb-5 space-y-2.5"}>{classItem}</div>
              ) : null}

              {SelectedClass?.length > 0 ? (
                <Fragment>
                  <div className="flex justify-between items-center">
                    <ButtonComponent
                      defaultBg={"#24C18F"}
                      defaultHoverBg={"#24C18F"}
                      paddingInline={28}
                      controlHeight={40}
                    >
                      Add Package
                    </ButtonComponent>
                    <div className="inline-flex gap-x-2.5">
                      <Paragraph fontSize={"text-xl text-gray-600"}>
                        Total:
                      </Paragraph>
                      <Paragraph fontSize={"text-xl text-black"}>
                        ${totalClassPrice}
                      </Paragraph>
                    </div>
                  </div>
                </Fragment>
              ) : null}
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

                  <div style={{ maxWidth: "408px" }} className={"w-full"}>
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

              <div className={"space-y-5"}>
                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL/Permit
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"DL/Permit"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL/Permit Issued
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"DL/Permit Issued"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL Permit Expiration
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"DL Permit Expiration"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Self Scheduling
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Payment Plan
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Extantion Date
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Extantion Date"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    High School
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"High School"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent name
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent name"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Phone
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent Phone"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Email
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent Email"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Name 2
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent Name 2"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Phone 2
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent Phone 2"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Email 2
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Parent Email 2"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Home Dropoff
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Date of birth
                  </Paragraph>

                  <div
                    style={{ width: "408px", gap: "20px" }}
                    className={"flex"}
                  >
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      className={"w-full"}
                      placeholder={"Day"}
                    />
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      className={"w-full"}
                      placeholder={"Month"}
                    />
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      className={"w-full"}
                      placeholder={"Year"}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Lead
                  </Paragraph>

                  <CustomSelect
                    value={Lead}
                    onChange={(value) => setLead(value)}
                    options={LeadOptions}
                    style={{ width: "408px" }}
                    className={"mb-2.5"}
                    optionFontSize={14}
                    optionSelectedFontWeight={400}
                    fontSize={16}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Student notes
                  </Paragraph>

                  <div style={{ width: "408px" }}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                    ></textarea>
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
