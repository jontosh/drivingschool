import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FiHelpCircle } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";

export const AlertSuccess = ({ setIsOpen }) => {
  return (
    <Fragment>
      <Modal setIsOpen={setIsOpen}>
        <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
          <div className="relative mb-6">
            <span className="block w-14 p-1.5 bg-[#24C18F] mx-auto text-white rounded-lg">
              <CiCircleCheck className={"text-3xl"} />
            </span>

            <IconComponent
              onClick={() => setIsOpen(false)}
              icon={<MdClose />}
              className={
                "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
              }
            />
          </div>

          <Title
            fontSize={"text-3xl"}
            titleMarginBottom={8}
            fontWeightStrong={600}
          >
            Successfully !
          </Title>

          <Paragraph
            fontWeightStrong={400}
            fontSize={"text-xs text-[#54595E99]"}
          >
            Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam nibh
            suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi leo.
            Nulla a eget tincidunt integer orci.
          </Paragraph>
        </div>
      </Modal>
    </Fragment>
  );
};

export const AlertError = ({ setIsOpen }) => {
  return (
    <Fragment>
      <Modal setIsOpen={setIsOpen}>
        <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
          <div className="relative mb-6">
            <span className="block w-14 p-1.5 bg-[#FF333F] mx-auto text-white rounded-lg">
              <MdErrorOutline className={"text-3xl"} />
            </span>

            <IconComponent
              onClick={() => setIsOpen(false)}
              icon={<MdClose />}
              className={
                "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
              }
            />
          </div>

          <Title
            fontSize={"text-3xl"}
            titleMarginBottom={8}
            fontWeightStrong={600}
          >
            Error !
          </Title>

          <Paragraph
            fontWeightStrong={400}
            fontSize={"text-xs text-[#54595E99]"}
          >
            Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam nibh
            suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi leo.
            Nulla a eget tincidunt integer orci.
          </Paragraph>
        </div>
      </Modal>
    </Fragment>
  );
};
export const AlertDelete = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Confirm, setConfirm] = useState(false);

  const AlertDeleteComponent = ({ setIsOpen }) => {
    return (
      <Fragment>
        <Modal setIsOpen={setIsOpen}>
          <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
            <div className="relative mb-6">
              <Title
                fontSize={"text-3xl"}
                titleMarginBottom={8}
                fontWeightStrong={600}
              >
                Are you sure?
              </Title>

              <Paragraph
                fontWeightStrong={400}
                fontSize={"text-xs text-[#54595E99]"}
              >
                You won't be able to revert this!
              </Paragraph>

              <IconComponent
                onClick={() => setIsOpen(false)}
                icon={<MdClose />}
                className={
                  "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
                }
              />
            </div>

            <div className="space-x-4">
              <ButtonComponent
                defaultHoverColor={colorsObject.dangerHover}
                defaultColor={colorsObject.danger}
                defaultHoverBorderColor={colorsObject.dangerHover}
                defaultBorderColor={colorsObject.danger}
                borderRadius={5}
                paddingInline={43}
                onClick={() => {
                  setConfirm(false);
                  setIsOpen(false);
                }}
              >
                No, cancel
              </ButtonComponent>
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                borderRadius={5}
                paddingInline={43}
                onClick={() => {
                  setConfirm(true);
                  setIsOpen(false);
                }}
              >
                Yes, confirm
              </ButtonComponent>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  };

  return { AlertDeleteComponent, Confirm, setConfirm };
};

export const AlertEdit = ({ setIsOpen, id }) => {
  const { colorsObject } = useContext(ColorsContext);
  const handleStatus = (value) => {};

  return (
    <Fragment>
      <Modal setIsOpen={setIsOpen}>
        <Formik initialValues={{}} onSubmit={(values) => {}}>
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form
              onSubmit={handleSubmit}
              className={"space-y-5 bg-white max-w-[945px] w-full px-10 py-8"}
            >
              <Title
                fontSize={"text-3xl uppercase"}
                titleMarginBottom={8}
                fontWeightStrong={600}
              >
                EDIT COMPONENT
              </Title>

              <div className="grid gap-5 grid-cols-2">
                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Component Name: *"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"Advanced Parking"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    name="class_number"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Item#/Code: *"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"PKNG1"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    name="class_number"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <label className={"space-y-1.5 w-full"}>
                  <span
                    className={"text-gray-500 w-full text-base font-normal"}
                  >
                    Status: *
                  </span>

                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"SELECT CLASS ROOM"}
                      className={"h-[50px] w-full"}
                      colorBorder="#DEE2E6"
                      options={StatusSelect}
                      onChange={handleStatus}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </label>

                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Public Name:"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"Public Name"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    name="class_number"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <label className={"space-y-1.5 w-full"}>
                  <span
                    className={"text-gray-500 w-full text-base font-normal"}
                  >
                    Type: *
                  </span>

                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"SELECT CLASS ROOM"}
                      className={"h-[50px] w-full"}
                      colorBorder="#DEE2E6"
                      options={StatusSelect}
                      onChange={handleStatus}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </label>

                <label className={"space-y-1.5 w-full"}>
                  <span
                    className={"text-gray-500 w-full text-base font-normal"}
                  >
                    Sub Type: *
                  </span>

                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"SELECT CLASS ROOM"}
                      className={"h-[50px] w-full"}
                      colorBorder="#DEE2E6"
                      options={StatusSelect}
                      onChange={handleStatus}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </label>

                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Driving Time: *"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"Public Name"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    type={"number"}
                    name="class_number"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <label className={"space-y-1.5 w-full"}>
                  <span
                    className={"text-gray-500 w-full text-base font-normal"}
                  >
                    Duration:
                  </span>

                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"SELECT CLASS ROOM"}
                      className={"h-[50px] w-full"}
                      colorBorder="#DEE2E6"
                      options={StatusSelect}
                      onChange={handleStatus}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </label>

                <label className={"space-y-1.5 w-full"}>
                  <span
                    className={"text-gray-500 w-full text-base font-normal"}
                  >
                    Duration:
                  </span>

                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"SELECT CLASS ROOM"}
                      className={"h-[50px] w-full"}
                      colorBorder="#DEE2E6"
                      options={StatusSelect}
                      onChange={handleStatus}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </label>
              </div>

              <div className="space-x-4">
                <ButtonComponent
                  defaultBg={colorsObject.success}
                  defaultHoverBg={colorsObject.successHover}
                  borderRadius={5}
                  paddingInline={43}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  SAVE
                </ButtonComponent>

                <ButtonComponent
                  defaultHoverColor={colorsObject.dangerHover}
                  defaultColor={colorsObject.danger}
                  defaultHoverBorderColor={colorsObject.dangerHover}
                  defaultBorderColor={colorsObject.danger}
                  borderRadius={5}
                  paddingInline={43}
                  onClick={() => {
                    setIsOpen(false);
                    handleReset();
                  }}
                >
                  CLOSE
                </ButtonComponent>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};
