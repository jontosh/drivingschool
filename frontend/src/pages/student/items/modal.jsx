import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox } from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
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
