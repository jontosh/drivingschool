import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";
import CoverImage from "../../assets/others/cover.png";
import ProfileStyle from "./student-account.module.scss";
import IconComponent from "@/components/icons";
import { TfiEmail } from "react-icons/tfi";
import { ConfigProvider, DatePicker } from "antd";

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsMore, setIsMore] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleMore = () => setIsMore((prev) => !prev);

  const Months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "short" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    };
  });

  const Days = Array.from({ length: 31 }, (_, i) => {
    i += 1;
    return {
      value: i,
      label: i,
    };
  });

  const YearsOptions = () => {
    let currentYear = new Date().getFullYear(),
      years = [];
    let startYear = 1999;
    while (startYear <= currentYear) {
      years.push({ value: startYear++, label: startYear++ });
    }
    return years;
  };

  return (
    <Fragment>
      <div className=" flex justify-between gap-7 pb-6 border-b border-b-indigo-700 px-5 -mx-5">
        <div>
          <div
            className={`rounded-2xl border-2 border-indigo-700 ${ProfileStyle["Student-profile__imageholder"]}`}
          >
            <Image src={CoverImage} srcSet={CoverImage} />
          </div>
        </div>
        <div className={"flex-grow"}>
          <div className={`rounded-2xl border-2 border-indigo-700 py-5 px-7`}>
            <Title
              className={"text-center"}
              fontSize={"text-base text-green-600"}
              fontWeightStrong={600}
              titleMarginBottom={10}
            >
              Activated
            </Title>
            <div className={`grid grid-cols-2 gap-7`}>
              <div className={"space-y-5"}>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Change status
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Send Text
                </ButtonComponent>
                <div className="flex gap-5 items-center">
                  <div
                    className={`${ProfileStyle["Student-profile__imageholder-small"]} rounded-lg border-2 border-indigo-700`}
                  >
                    <Image src={CoverImage} srcSet={CoverImage} />
                  </div>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"flex-grow"}
                    controlHeight={30}
                    borderRadius={5}
                  >
                    Print
                  </ButtonComponent>
                </div>
              </div>
              {/*-------------*/}
              <div className={"space-y-5"}>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Acces Student Center
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Username/Password
                </ButtonComponent>
                <div className="flex gap-5 items-center">
                  <div
                    className={`${ProfileStyle["Student-profile__imageholder-small"]} rounded-lg border-2 border-indigo-700`}
                  >
                    <Image src={CoverImage} srcSet={CoverImage} />
                  </div>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"flex-grow"}
                    controlHeight={30}
                    borderRadius={5}
                  >
                    Print
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form>
        <div
          className={`grid grid-cols-2 gap-6 pt-5 pb-5 mb-5 -mx-5 px-5 bg-white rounded-2xl `}
        >
          <div className="flex flex-col gap-5">
            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Student type
              </span>
              <CustomSelect
                style={{ width: "100%", height: 40 }}
                placeholder={"Select"}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Assign to staff
              </span>
              <CustomSelect
                placeholder={"Select"}
                style={{ width: "100%", height: 40 }}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Assign to Location
              </span>
              <CustomSelect
                placeholder={"Select"}
                style={{ width: "100%", height: 40 }}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                ]}
              />
            </label>

            <CustomInput
              placeholder={"Student id"}
              className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Student id"}
              colorBorder={colorsObject.primary}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"First name"}
              className={`shadow-lg border border-indigo-700 w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"First name"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Last name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Last name"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Middle name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Middle name"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Address"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Address"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"City"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"City"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>State</span>
              <CustomSelect
                placeholder={"State"}
                style={{ width: "100%", height: 40 }}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: "USA",
                    label: "USA",
                  },
                ]}
              />
            </label>

            <CustomInput
              placeholder={"Zip/Postal code"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Zip/Postal code"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Home Pickup"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Home Pickup"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Cell Phone"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Cell Phone"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomCheckBox
              className={`inline-flex justify-end items-center w-full flex-row-reverse`}
            >
              <span className={"w-44 text-base flex-shrink-0"}>Home Phone</span>
            </CustomCheckBox>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-36"}>Email</span>
              <div className="flex items-center gap-3 flex-grow">
                <CustomInput
                  placeholder={"Email"}
                  classNames={"w-full px-4"}
                  className={`shadow-lg border border-indigo-700 w-full p-2.5 ${ProfileStyle["Student-profile__meail-div"]}`}
                  type="email"
                />
                <IconComponent classNames={"items-center"}>
                  <TfiEmail
                    className={`${ProfileStyle["Student-profile__email-icon"]}`}
                  />
                </IconComponent>
              </div>
            </label>

            <label className="flex items-center gap-9">
              <span className={"w-36"}>Gender</span>

              <div className={"space-x-2.5"}>
                <CustomRadio
                  classNames={"inline-flex gap-2.5 items-center"}
                  name={"gender"}
                  value={"Male"}
                >
                  <Text fontSize={"text-base"}>Male</Text>
                </CustomRadio>
                <CustomRadio
                  classNames={"inline-flex gap-2.5 items-center"}
                  name={"gender"}
                  value={"Female"}
                >
                  <Text fontSize={"text-base"}>Female</Text>
                </CustomRadio>
                <CustomRadio
                  classNames={"inline-flex gap-2.5 items-center"}
                  name={"gender"}
                  value={"Other"}
                >
                  <Text fontSize={"text-base"}>Other</Text>
                </CustomRadio>
              </div>
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Preferred Pronoun
              </span>
              <CustomSelect
                placeholder={"State"}
                style={{ width: "100%", height: 40 }}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: "USA",
                    label: "USA",
                  },
                ]}
              />
            </label>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Date of birth
              </span>

              <div className={"space-x-5"}>
                <CustomSelect
                  placeholder={"Month"}
                  colorBorder={colorsObject.primary}
                  options={Months}
                  style={{ width: 90, height: 40 }}
                />
                <CustomSelect
                  placeholder={"Day"}
                  colorBorder={colorsObject.primary}
                  options={Days}
                  style={{ width: 90, height: 40 }}
                />
                <CustomSelect
                  placeholder={"Year"}
                  colorBorder={colorsObject.primary}
                  options={YearsOptions()}
                  style={{ width: 90, height: 40 }}
                />
              </div>
            </div>

            <CustomInput
              placeholder={"Account #"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"DL/Permit"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"First name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"DL/Permit Issued"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Last name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"DL Permit Expiration"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomCheckBox
              className={`inline-flex justify-end items-center w-full flex-row-reverse`}
            >
              <span className={"w-44 text-base flex-shrink-0"}>
                Self Scheduling
              </span>
            </CustomCheckBox>

            <CustomCheckBox
              className={`inline-flex justify-end items-center w-full flex-row-reverse`}
            >
              <span className={"w-44 text-base flex-shrink-0"}>
                Payment Plan
              </span>
            </CustomCheckBox>

            <label className="flex items-center gap-1">
              <span className={"w-44 text-base flex-shrink-0"}>
                Extantion Date
              </span>

              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: colorsObject.primary,
                  },
                }}
              >
                <DatePicker
                  style={{ width: "100%", height: 40 }}
                  onChange={onChange}
                />
              </ConfigProvider>
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                High School
              </span>
              <CustomSelect
                placeholder={"High School"}
                style={{ width: "100%", height: 40 }}
                colorBorder={colorsObject.primary}
                className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                options={[
                  {
                    value: "High School",
                    label: "High School",
                  },
                ]}
              />
            </label>

            <CustomInput
              placeholder={"Parent name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent name"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Parent Phone"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent Phone"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Parent Email"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent Email"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              type={"email"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Parent name 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent name 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Parent Phone 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent Phone 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <CustomInput
              placeholder={"Parent Email 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
              spanText={"Parent Email 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              type={"email"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
            />

            <label className="flex items-center gap-8">
              <span className={"w-36"}>Home Drop off</span>

              <div className={`${ProfileStyle["Student-profile__div"]}`}>
                <CustomCheckBox />
              </div>
            </label>
          </div>
        </div>

        {IsMore && (
          <Fragment>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-7">
                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Student notes
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>

                  <div className="flex gap-6 justify-between">
                    <CustomInput
                      classNames={"w-full"}
                      className={"border border-indigo-700 px-4 py-2.5"}
                    />
                    <ButtonComponent
                      defaultBg={"#24C18F"}
                      defaultHoverBg={"#24C18F"}
                      defaultColor={colorsObject.main}
                      paddingInline={97}
                      controlHeight={40}
                      borderRadius={5}
                    >
                      Save
                    </ButtonComponent>
                  </div>
                </div>

                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Tasks
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-7">
                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <Title
                    fontSize={"text-2xl text-indigo-700"}
                    fontWeightStrong={600}
                  >
                    Emergency
                  </Title>

                  <div className="space-y-5">
                    <CustomInput
                      placeholder={"Emergency name"}
                      className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700 ${ProfileStyle["Student-profile__div"]}`}
                      spanText={"Emergency name"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full gap-5 flex-row-reverse`}
                    />
                    <CustomInput
                      placeholder={"Emergency relationship"}
                      className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700 ${ProfileStyle["Student-profile__div"]}`}
                      spanText={"Emergency relationship"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full gap-5 flex-row-reverse`}
                    />
                    <CustomInput
                      placeholder={"Emergency phone"}
                      className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700 ${ProfileStyle["Student-profile__div"]}`}
                      spanText={"Emergency phone"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full gap-5 flex-row-reverse`}
                    />

                    <label className="inline-flex items-center w-full gap-5">
                      <span className={"w-48 text-base flex-shrink-0"}>
                        Lead
                      </span>
                      <CustomSelect
                        placeholder={"Lead"}
                        style={{ width: "100%", height: 40 }}
                        colorBorder={colorsObject.primary}
                        className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                        options={[
                          {
                            value: "Facebook",
                            label: "Facebook",
                          },
                        ]}
                      />
                    </label>

                    <CustomInput
                      placeholder={"Medial condition"}
                      className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700 ${ProfileStyle["Student-profile__div"]}`}
                      spanText={"Medial condition"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full gap-5 flex-row-reverse`}
                    />

                    <label className="inline-flex items-center w-full gap-5">
                      <span className={"w-48 text-base flex-shrink-0"}>
                        Wear glasses contact
                      </span>
                      <CustomSelect
                        placeholder={"No"}
                        style={{ width: "100%", height: 40 }}
                        colorBorder={colorsObject.primary}
                        className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                        options={[
                          {
                            value: 1,
                            label: 1,
                          },
                        ]}
                      />
                    </label>

                    <label className="flex items-center gap-5">
                      <span className={"w-48 flex-shrink-0"}>
                        Terms & condition
                      </span>

                      <div
                        className={`${ProfileStyle["Student-profile__div"]}`}
                      >
                        <CustomCheckBox />
                      </div>
                    </label>
                  </div>
                </div>

                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Driving notes
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>

                  <div className="flex gap-6 justify-between">
                    <CustomInput
                      classNames={"w-full"}
                      className={"border border-indigo-700 px-4 py-2.5"}
                    />
                    <ButtonComponent
                      defaultBg={"#24C18F"}
                      defaultHoverBg={"#24C18F"}
                      defaultColor={colorsObject.main}
                      paddingInline={97}
                      controlHeight={40}
                      borderRadius={5}
                    >
                      Save
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}

        <div
          className={`text-center space-y-6 pt-6  ${!IsMore ? "bg-white" : ""}`}
        >
          <div>
            <ButtonComponent
              defaultBg="#3366FF"
              defaultHoverBg="#3366FF"
              style={{ width: "198.86px" }}
              controlHeight={39}
              borderRadius={5}
              onClick={handleMore}
            >
              {IsMore ? "Hide" : "Show more"}
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent
              defaultBg="#24C18F"
              defaultHoverBg="#24C18F"
              style={{ width: "198.86px" }}
              controlHeight={39}
              borderRadius={5}
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Profile;
