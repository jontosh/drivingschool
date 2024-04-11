import {
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ManagementStyle from "./management.module.scss";

const CheckModal = ({ modalName }) => {
  const { colorsObject } = useContext(ColorsContext);
  switch (modalName?.toLowerCase()) {
    case "add-service": {
      return (
        <Fragment>
          <Helmet>
            <title>ADD SERVICES</title>
          </Helmet>
          <div className={"-mx-11 -my-5 px-7 py-12  bg-white"}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={50}
            >
              ADD SERVICES (PACKAGES)
            </Title>

            <div className="grid grid-cols-2 gap-x-10">
              <div className={"space-y-5"}>
                <CustomInput
                  placeholder={"Service Name: *"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                  }
                  spanText={"Service Name:"}
                  spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                />
                <CustomInput
                  placeholder={"Service Code: *"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                  }
                  spanText={"Service Code:"}
                  spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                />
                <CustomInput
                  placeholder={"Service Status: *"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse "
                  }
                  spanText={"Service Status:"}
                  spanClassName={`w-36 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                />
                <label
                  className={`inline-flex items-center w-full justify-between gap-10`}
                >
                  <span
                    className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Service Status:
                  </span>
                  <CustomSelect
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    placeholder={"hello"}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                    ]}
                  />
                </label>
                @todo
              </div>
              {/*------------*/}
              <div className={`space-y-5`}>
                <label className={"inline-flex items-center w-full gap-10"}>
                  <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                    Allow Web Purchase:
                  </span>
                  <div className={"space-x-5"}>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"web"}
                    >
                      <span className={"text-sm font-medium"}>Yes</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"web"}
                    >
                      <span className={"text-sm font-medium"}>None</span>
                    </CustomRadio>
                  </div>
                </label>
                <label className={"inline-flex items-center w-full gap-10"}>
                  <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                    Allow Portal Purchase:
                  </span>
                  <div className={"space-x-5"}>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"portal"}
                    >
                      <span className={"text-sm font-medium"}>Yes</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"portal"}
                    >
                      <span className={"text-sm font-medium"}>None</span>
                    </CustomRadio>
                  </div>
                </label>
                @todo
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
};
const ModalPage = () => {
  const { modal } = useParams();

  return <CheckModal modalName={modal} />;
};

export default ModalPage;
