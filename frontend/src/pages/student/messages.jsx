import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Pagination } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";

export const Messages = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
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
              >
                Compose
              </ButtonComponent>
            </div>

            <div className="py-2.5 flex justify-between">
              <form className={"flex gap-5 items-center"}>
                <label className={"relative"}>
                  <CustomInput
                    colorBorder={colorsObject.primary}
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
              />
            </div>
            <div className="text-center">
              <Paragraph fontSize={"text-base"}>No record exist</Paragraph>
            </div>
          </div>
        </div>
        {/*--------------------*/}
        <div>
          <div className={"border border-indigo-700 rounded-2xl p-5 space-y-4"}>
            <div className="flex justify-between">
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
              >
                Send text
              </ButtonComponent>
            </div>

            <Paragraph fontSize={"text-base"}>(513)837-5128</Paragraph>

            <blockquote
              className={
                "flex border gap-5 border-indigo-700 rounded-2xl p-2.5 items-start"
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
                <Paragraph fontSize={" text-xs"}>
                  Click on the link below to get text message Notification from
                  Ray's Driving School.
                  https://tdsm.app/sms/SI/IA?eI=9dVehSSgReo=
                </Paragraph>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
