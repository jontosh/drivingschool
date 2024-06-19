import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ResultModalButton } from "@/pages/student/items/modal.jsx";
import BillingStyle from "@/pages/student/student-account.module.scss";
import { Pagination } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";

export const Messages = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const { ResultOfModalContent } = ResultModalButton();
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalCase, setModalCase] = useState("");

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleCompose = (typeModal) => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };

  return (
    <Fragment>
      <div className={classNames("grid grid-cols-2 gap-5")}>
        <div>
          <div
            className={"border border-indigo-700 rounded-2xl p-5 shadow-2xl"}
          >
            <div className="flex justify-between">
              <Title level={2} fontSize={"text-indigo-700 text-xl"}>
                Email
              </Title>
              <ButtonComponent
                borderRadius={5}
                defaultHoverBg={colorsObject.main}
                defaultBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                controlHeight={26}
                paddingInline={18}
                fontSize={10}
                onClick={() => handleCompose("send_email")}
              >
                Compose
              </ButtonComponent>
            </div>

            <div className="py-2.5 flex justify-between">
              <form className={"flex gap-5 items-center"}>
                <label className={"relative"}>
                  <CustomInput
                    placeholder={"Search"}
                    className={`w-48 pl-12 pr-4 text-sm`}
                  />

                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>
              </form>

              <Pagination
                total={10}
                pageSize={1}
                current={CurrentPagination}
                onChange={handleChangePagination}
                size={"small"}
              />
            </div>
            <div className="text-center pt-2.5">
              <Paragraph fontSize={"text-base font-medium"}>No record exist</Paragraph>
            </div>
          </div>
        </div>
        {/*--------------------*/}
        <div>
          <div className={"border border-indigo-700 rounded-2xl p-5 space-y-4"}>
            <Title level={2}>
              <IconComponent
                icon={<AiOutlineMessage />}
                className={"text-indigo-700 text-xl cursor-text"}
                classNames={"items-center"}
                spaceIconX={2.5}
              >
                Text messages
              </IconComponent>
            </Title>

            <div className={"space-x-5"}>
              <a className={"text-indigo-700 font-normal"}>(513)837-5128</a>
              <a className={"text-gray-700 font-normal hover:text-indigo-700"}>
                (513)837-5128
              </a>
              <a className={"text-gray-700 font-normal hover:text-indigo-700"}>
                (513)837-5128
              </a>
            </div>

            <blockquote
              className={
                "flex border gap-5 border-[#667085] rounded-2xl p-1 items-center"
              }
            >
              <IconComponent
                className={"text-7xl cursor-default"}
                icon={<MdPersonOutline />}
              />

              <div className={"text-xs flex-grow"}>
                <time className={"block w-full"}>
                  on Sat, Mar 09, 2024 @ 1:37 PM EST
                </time>
                <Paragraph fontSize={"text-xs"}>
                  Click on the link below to get text message Notification from
                  Ray's Driving School.
                  https://tdsm.app/sms/SI/IA?eI=9dVehSSgReo=
                </Paragraph>
              </div>
            </blockquote>

            <div className={"flex gap-4 items-end"}>
              <textarea
                className={
                  "w-full border border-[#667085] rounded-2xl p-5 outline-0"
                }
                placeholder={"Text"}
              ></textarea>

              <ButtonComponent
                borderRadius={5}
                defaultHoverBg={colorsObject.info}
                defaultBg={colorsObject.info}
                defaultBorderColor={colorsObject.info}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                controlHeight={26}
                paddingInline={30}
                fontSize={10}
              >
                Send
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      {
        IsOpen && (
          <Modal setIsOpen={setIsOpen} className={"py-2"}>
            <div
              className={classNames(
                "py-6 px-8 bg-white rounded-2xl w-full overflow-y-scroll ",
                BillingStyle["Modal__content"],
              )}
            >
              <ResultOfModalContent
                modalButton={ModalCase}
                handleClose={() => setIsOpen(false)}
              />
            </div>
          </Modal>
        )
      }
    </Fragment >
  );
};
