import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import Upload from "@/pages/student/upload.jsx";
import { Fragment, useContext } from "react";

export const ResultModalButton = () => {
  const { colorsObject } = useContext(ColorsContext);
  const ResultOfModalContent = ({ modalButton, handleClose }) => {
    switch (modalButton) {
      case "print": {
        return (
          <Fragment>
            <Title
              titleMarginBottom={25}
              level={3}
              fontSize={"text-xl text-indigo-700"}
            >
              Print Enrollments and Billing Information
            </Title>
            <form className={"space-y-5"}>
              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>Billing</span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>Enrollment</span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>
                  3/9/2024 Teens 8hr in car instruction $649.99
                </span>
              </CustomCheckBox>

              <div className="text-center space-x-7">
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  borderRadius={5}
                  defaultColor={colorsObject.main}
                  defaultHoverColor={colorsObject.main}
                  controlHeight={40}
                  paddingInline={99}
                >
                  Print
                </ButtonComponent>
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  borderRadius={5}
                  defaultBorderColor={colorsObject.secondary}
                  defaultHoverBorderColor={colorsObject.secondary}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  controlHeight={40}
                  paddingInline={95}
                  onClick={handleClose}
                >
                  Close
                </ButtonComponent>
              </div>
            </form>
          </Fragment>
        );
      }
      case "email": {
        return (
          <Fragment>
            <Title
              titleMarginBottom={25}
              level={3}
              fontSize={"text-xl text-indigo-700"}
            >
              Email enrollment and/or Billing
            </Title>
            <form className={"space-y-5"}>
              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>
                  Student Email: aminovmn@mail.uc.edu
                </span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>
                  Parent Email: qosimbotirovich@gmail.com
                </span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>
                  Parent2 Email:
                </span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>Enrollment</span>
              </CustomCheckBox>

              <CustomCheckBox className={"gap-3.5 w-full"}>
                <span className={"text-base font-semibold"}>
                  3/9/2024 Teens 8hr in car instruction $649.99
                </span>
              </CustomCheckBox>

              <div>
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  borderRadius={5}
                  defaultBorderColor={colorsObject.primary}
                  defaultHoverBorderColor={colorsObject.primary}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  controlHeight={40}
                  paddingInline={35}
                  onClick={handleClose}
                >
                  Enrollment And Billing Receipt
                </ButtonComponent>
              </div>

              <div>
                <textarea
                  className={"w-full border border-indigo-700 rounded-2xl p-5"}
                  placeholder={"Text"}
                ></textarea>
              </div>

              <div className="text-center space-x-7">
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  borderRadius={5}
                  defaultColor={colorsObject.main}
                  defaultHoverColor={colorsObject.main}
                  controlHeight={40}
                  paddingInline={99}
                >
                  Print
                </ButtonComponent>
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  borderRadius={5}
                  defaultBorderColor={colorsObject.secondary}
                  defaultHoverBorderColor={colorsObject.secondary}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  controlHeight={40}
                  paddingInline={95}
                  onClick={handleClose}
                >
                  Close
                </ButtonComponent>
              </div>
            </form>
          </Fragment>
        );
      }
      case "send_email": {
        return (
          <Fragment>
            <div>
              <Title
                titleMarginBottom={25}
                level={3}
                fontSize={"text-xl text-indigo-700"}
              >
                Print Enrollments and Billing Information
              </Title>
              <form className={"space-y-5"}>
                <label className={"flex w-full justify-between items-center"}>
                  <span className="text-base w-32 font-medium flex-shrink-0">
                    Select From Template
                  </span>

                  <CustomSelect
                    placeholder={"Select"}
                    className={"w-full h-[50px]"}
                    colorBorder={colorsObject.primary}
                    options={[
                      {
                        value: 1,
                        label: 1,
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  className={"py-2.5 px-5 border border-indigo-700"}
                  placeholder={"Account #"}
                  classNames={
                    "w-full inline-flex items-center flex-row-reverse h-[50px]"
                  }
                  spanText={"Email Subject"}
                  spanClassName={"w-32 font-medium flex-shrink-0"}
                  fontSize={"text-base"}
                />

                <CustomInput
                  className={"py-2.5 px-5 border border-indigo-700"}
                  placeholder={"Student Email"}
                  classNames={
                    "w-full inline-flex items-center flex-row-reverse h-[50px]"
                  }
                  spanText={"Student Email"}
                  spanClassName={"w-32 font-medium flex-shrink-0"}
                  fontSize={"text-base"}
                />

                <CustomInput
                  className={"py-2.5 px-5 border border-indigo-700"}
                  placeholder={"Parent Email 1"}
                  classNames={
                    "w-full inline-flex items-center flex-row-reverse h-[50px]"
                  }
                  spanText={"Parent Email 1"}
                  spanClassName={"w-32 font-medium flex-shrink-0"}
                  fontSize={"text-base"}
                />

                <CustomInput
                  className={"py-2.5 px-5 border border-indigo-700"}
                  placeholder={"Parent Email 2"}
                  classNames={
                    "w-full inline-flex items-center flex-row-reverse h-[50px]"
                  }
                  spanText={"Parent Email 2"}
                  spanClassName={"w-32 font-medium flex-shrink-0"}
                  fontSize={"text-base"}
                />

                <CustomInput
                  className={"py-2.5 px-5 border border-indigo-700"}
                  placeholder={"Additional Email"}
                  classNames={
                    "w-full inline-flex items-center flex-row-reverse h-[50px]"
                  }
                  spanText={"Additional Email"}
                  spanClassName={"w-32 font-medium flex-shrink-0"}
                  fontSize={"text-base"}
                />

                <CustomCheckBox
                  className={
                    "w-full inline-flex justify-end items-center flex-row-reverse"
                  }
                >
                  <span className="text-base w-32 font-medium flex-shrink-0">
                    Send copy to Office Email
                  </span>
                </CustomCheckBox>

                <div className="flex justify-center gap-5 mb-8">
                  <Title level={4} fontSize={"text-xl"} fontWeightStrong={500}>
                    Upload files
                  </Title>

                  <ButtonComponent
                    defaultBg={"#24C18F"}
                    defaultHoverBg={"#24C18F"}
                    borderRadius={5}
                    defaultColor={colorsObject.main}
                    defaultHoverColor={colorsObject.main}
                    controlHeight={32}
                    paddingInline={39}
                  >
                    Info
                  </ButtonComponent>
                </div>

                <div>
                  <Upload className={"w-full"}>
                    <Title level={3} fontSize={"text-xl"}>
                      Drop file here
                    </Title>
                  </Upload>
                </div>

                <div>
                  <textarea
                    className={
                      "w-full border border-indigo-700 rounded-2xl p-5"
                    }
                    placeholder={"Text"}
                  ></textarea>
                </div>

                <div className="text-center space-x-7">
                  <ButtonComponent
                    defaultBg={"#24C18F"}
                    defaultHoverBg={"#24C18F"}
                    borderRadius={5}
                    defaultColor={colorsObject.main}
                    defaultHoverColor={colorsObject.main}
                    controlHeight={40}
                    paddingInline={99}
                  >
                    Print
                  </ButtonComponent>
                  <ButtonComponent
                    defaultBg={colorsObject.main}
                    defaultHoverBg={colorsObject.main}
                    borderRadius={5}
                    defaultBorderColor={colorsObject.secondary}
                    defaultHoverBorderColor={colorsObject.secondary}
                    defaultColor={colorsObject.black}
                    defaultHoverColor={colorsObject.black}
                    controlHeight={40}
                    paddingInline={95}
                    onClick={handleClose}
                  >
                    Close
                  </ButtonComponent>
                </div>
              </form>
            </div>
          </Fragment>
        );
      }
      default:
        return (
          <Title level={2} className={"center"} fontSize={"text-xl"}>
            Error {modalButton}
          </Title>
        );
    }
  };

  return { ResultOfModalContent };
};
