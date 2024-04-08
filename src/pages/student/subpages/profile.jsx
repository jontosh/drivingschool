import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";
import CoverImage from "../../../assets/others/cover.png";
import ProfileStyle from "../student-account.module.scss";

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
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

      <div className={`grid grid-cols-2 gap-6 pt-5`}>
        <div>
          <label className="inline-flex items-center w-full gap-4">
            <span className={"w-36"}>Student type</span>
            <CustomSelect
              value={"Select"}
              style={{ width: "100%" }}
              className={"shadow-lg"}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </label>
        </div>
        <div>@todo</div>
      </div>
    </Fragment>
  );
};

export default Profile;
