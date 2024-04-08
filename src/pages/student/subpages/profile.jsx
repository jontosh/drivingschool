import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";
import CoverImage from "../../../assets/others/cover.png";
import ProfileStyle from "../student-account.module.scss";
import IconComponent from "@/components/icons";
import { TfiEmail } from "react-icons/tfi";
import { Checkbox, ConfigProvider, DatePicker } from "antd";

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const openButton = () => {
    setIsOpen(true);
  };

  const closeButton = () => {
    setIsOpen(false);
  };
  return (
    <Fragment>
      <div className="flex justify-between gap-7 pb-6 border-b-2 border-b-indigo-700 px-5 -mx-5">
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
                >
                  Change status
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
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
                >
                  Acces Student Center
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
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
                  >
                    Print
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className={`grid grid-cols-2 gap-6 pt-5`}>
        <div className="flex flex-col gap-5">
          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Student type</span>
            <CustomSelect
              value={"Select"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Assign to staff</span>
            <CustomSelect
              value={"Select"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Assign to Location</span>
            <CustomSelect
              value={"Select"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Studetn id</span>
            <CustomInput
              placeholder={"Studetn id"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>First name</span>
            <CustomInput
              placeholder={"First name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Last name</span>
            <CustomInput
              placeholder={"Last name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Middle name</span>
            <CustomInput
              placeholder={"Middle name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Address</span>
            <CustomInput
              placeholder={"Address"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>City</span>
            <CustomInput
              placeholder={"City"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>State</span>
            <CustomSelect
              value={"Select"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: "UZB",
                  label: "UZB",
                },
              ]}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Zip/Postal code</span>
            <CustomInput
              placeholder={"Number"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Home Pickup</span>
            <CustomInput
              placeholder={"Home Pickup"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Cell Phone</span>
            <CustomInput
              placeholder={"Cell Phone"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="flex items-center gap-8">
            <span className={"w-36"}>Home Phone</span>

            <div className={`items-start ${ProfileStyle["Student-profile__div"]}`}>
              <CustomCheckBox />
            </div>
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Email</span>
            <div className="flex items-center gap-3">
              <CustomInput
                placeholder={"Email"}
                className={`shadow-lg ${ProfileStyle["Student-profile__meail-div"]}`}
                type="email"
              />
              <IconComponent>
                <TfiEmail className={`${ProfileStyle["Student-profile__email-icon"]}`} />
              </IconComponent>
            </div>
          </label>

          <label className="flex items-center gap-8">
            <span className={"w-36"}>Gender</span>

            <Checkbox.Group
              className={`${ProfileStyle["Student-profile__div"]}`}
            >
              <CustomCheckBox name={"gender"}>
                <Text fontSize={"text-base"}>Male</Text>
              </CustomCheckBox>

              <CustomCheckBox name={"gender"}>
                <Text fontSize={"text-base"}>Female</Text>
              </CustomCheckBox>

              <CustomCheckBox name={"gender"}>
                <Text fontSize={"text-base"}>Other</Text>
              </CustomCheckBox>
            </Checkbox.Group>
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Perferred Pronoun</span>
            <CustomSelect
              value={"Perferred Pronoun"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: "UZB",
                  label: "UZB",
                },
              ]}
            />
          </label>
        </div>

        <div className="flex flex-col gap-6">
          <label className="inline-flex items-center w-full gap-8">
            <span>Date of birth</span>
            <div
              className={`flex gap-5 ${ProfileStyle["Student-profile__div"]}`}
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

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>DL/Permit</span>
            <CustomInput
              placeholder={"Account #"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>DL/Permit Issued</span>
            <CustomInput
              placeholder={"First name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>DL Permit Expiration</span>
            <CustomInput
              placeholder={"Last name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="flex items-center gap-8">
            <span className={"w-36"}>Self Scheduling</span>

            <div className={`${ProfileStyle["Student-profile__div"]}`}>
              <CustomCheckBox />
            </div>
          </label>

          <label className="flex items-center gap-8">
            <span className={"w-36"}>Payment Plang</span>

            <div className={` ${ProfileStyle["Student-profile__div"]}`}>
              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: colorsObject.primary,
                  },
                }}
              >
                <DatePicker onChange={onChange} />
              </ConfigProvider>
            </div>
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>High School</span>
            <CustomSelect
              value={"High School"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Parent name</span>
            <CustomInput
              placeholder={"Parent name"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Parent Phone</span>
            <CustomInput
              placeholder={"Parent Phone"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Parent Email</span>
            <CustomInput
              placeholder={"Parent Email"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Parent Name 2</span>
            <CustomInput
              placeholder={"Parent Name 2"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center w-full gap-8">
            <span className={"w-36"}>Parent Phone 2</span>
            <CustomInput
              placeholder={"Parent Phone 2"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="inline-flex items-center gap-8">
            <span className={"w-36"}>Parent Email 2</span>
            <CustomInput
              placeholder={"Parent Email 2"}
              className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
            />
          </label>

          <label className="flex items-center gap-8">
            <span className={"w-36"}>Home Dropoff</span>

            <div className={`${ProfileStyle["Student-profile__div"]}`}>
              <CustomCheckBox />
            </div>
          </label>
        </div>
      </form>
      <div className="flex flex-col gap-5 pt-9">
        <ButtonComponent
          defaultBg="#3366FF"
          defaultHoverBg="#3366FF"
          style={{ width: "198.86px" }}
          controlHeight={39}
          className={"m-auto"}
          onClick={openButton}
        >
          Show more
        </ButtonComponent>
        <ButtonComponent
          defaultBg="#24C18F"
          defaultHoverBg="#24C18F"
          style={{ width: "198.86px" }}
          controlHeight={39}
          className={"m-auto"}
        >
          Save
        </ButtonComponent>
      </div>
      {isOpen &&
        <Fragment>
          <div className="grid grid-cols-2 justify-between items-center pt-14">

            <div style={{ width: "506.03px", height: "250px" }}>
              <div className="flex justify-between items-center">
                <Title
                  level={2}
                  fontSize={"text-indigo-600 text-3xl"}
                  fontWeightStrong={600}
                >Student notes</Title>
                <ButtonComponent
                  defaultBorderColor="#3366FF"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  style={{ width: "120.56px" }}
                  controlHeight={40}
                >New</ButtonComponent>
              </div>

              <div className="flex justify-between items-center pt-5">
                <div style={{ width: "254.71px" }}>
                  <CustomInput
                    className={"w-full"}
                  />
                </div>
                <ButtonComponent
                  defaultBg="#24C18F"
                  defaultHoverBg="#24C18F"
                  style={{ width: "198.68px" }}
                  controlHeight={39}
                >Save</ButtonComponent>
              </div>
            </div>

            <div className="flex justify-between" style={{ width: "506.03px", height: "250px" }}>
              <Title
                level={2}
                fontSize={"text-indigo-600 text-3xl"}
                fontWeightStrong={600}
              >Tasks</Title>

              <ButtonComponent
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                style={{ width: "198.68px" }}
                controlHeight={39}
              >New</ButtonComponent>
            </div>

            <div className="flex flex-col gap-5" style={{ width: "506.03px", height: "250px" }}>
              <Title
                level={2}
                fontSize={"text-indigo-600 text-3xl"}
                fontWeightStrong={600}
                className={"pb-2.5"}
              >Emergency</Title>

              <label className="flex justify-between items-center">
                <span>Emergency name</span>
                <CustomInput
                  placeholder={"Emergency name"}
                  className={"w-full"}
                  style={{ width: "297.16px" }}
                />
              </label>

              <label className="flex justify-between items-center">
                <span>Emergency relationship</span>
                <CustomInput
                  placeholder={"Emergency relationship"}
                  className={"w-full"}
                  style={{ width: "297.16px" }}
                />
              </label>

              <label className="flex justify-between items-center">
                <span>Emergency phone</span>
                <CustomInput
                  placeholder={"Emergency phone"}
                  className={"w-full"}
                  style={{ width: "297.16px" }}
                />
              </label>

              <label className="inline-flex justify-between items-center">
                <span className={"w-36"}>High School</span>
                <CustomSelect
                  value={"High School"}
                  style={{ width: "297.16px" }}
                  className={"shadow-lg w-full"}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                  ]}
                />
              </label>
            </div>

            <div style={{ width: "506.03px", height: "250px" }}>
              <div className="flex justify-between items-center">
                <Title
                  level={2}
                  fontSize={"text-indigo-600 text-3xl"}
                  fontWeightStrong={600}
                >Driving notes</Title>
                <ButtonComponent
                  defaultBorderColor="#3366FF"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  style={{ width: "120.56px" }}
                  controlHeight={40}
                >New</ButtonComponent>
              </div>

              <div className="flex justify-between items-center pt-5">
                <div style={{ width: "254.71px" }}>
                  <CustomInput
                    className={"w-full"}
                  />
                </div>
                <ButtonComponent
                  defaultBg="#24C18F"
                  defaultHoverBg="#24C18F"
                  style={{ width: "198.68px" }}
                  controlHeight={39}
                >Save</ButtonComponent>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-5 pt-9">
            <ButtonComponent
              defaultBg="#3366FF"
              defaultHoverBg="#3366FF"
              style={{ width: "198.86px" }}
              controlHeight={39}
              className={"m-auto"}
              onClick={closeButton}
            >
              Hide
            </ButtonComponent>
            <ButtonComponent
              defaultBg="#24C18F"
              defaultHoverBg="#24C18F"
              style={{ width: "198.86px" }}
              controlHeight={39}
              className={"m-auto"}
            >
              Save
            </ButtonComponent>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default Profile;
