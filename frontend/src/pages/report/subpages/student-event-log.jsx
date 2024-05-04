import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
} from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormError } from "@/modules/errors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { useContext } from "react";

const StudentEventLog = ({ className, children, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, handleSubmit, handleChange }) => (
        <form
          className={classNames(className, "space-y-5")}
          {...props}
          onSubmit={handleSubmit}
        >
          <Title level={4} fontWeightStrong={600} fontSize={"text-base"}>
            Filter students by date
          </Title>

          <div className={"space-x-3.5"}>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Date activated</span>
            </CustomCheckBox>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Date activated</span>
            </CustomCheckBox>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Date activated</span>
            </CustomCheckBox>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Date activated</span>
            </CustomCheckBox>
          </div>

          <CustomInput
            classNames={
              "inline-flex flex-row-reverse items-center w-full h-[50px]"
            }
            className={classNames(
              ManagementStyle["CheckModal__form-element__shadow"],
              "w-full text-base",
            )}
            type={"text"}
            spanText={"Select date Range"}
            placeholder={"Select date Range"}
            fontSize={"text-base"}
            spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
            colorBorder={colorsObject.primary}
            name={"date"}
            onChange={handleChange}
          />

          <Title level={4} fontWeightStrong={600} fontSize={"text-base"}>
            Filter students by Student info
          </Title>

          <div className={"flex gap-5"}>
            <div className="flex items-center w-full gap-5">
              <Paragraph fontSize={"space-x-5"}>
                <span className={"text-base font-semibold"}>Date of birth</span>{" "}
                <span className={"text-base"}>From:</span>
              </Paragraph>

              <div className={`grid grid-cols-3 gap-5`}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Day"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Month"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Year"}
                />
              </div>
            </div>

            <div className="flex items-center w-full gap-5">
              <span className={"text-base"}>To:</span>

              <div className={`grid grid-cols-3 gap-5`}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Day"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Month"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Year"}
                />
              </div>
            </div>
          </div>

          <div className={"flex gap-5"}>
            <div className="flex items-center w-full gap-5">
              <Paragraph fontSize={"space-x-5 inline-flex flex-wrap"}>
                <span className={"text-base font-semibold"}>Age range</span>
                <span className={"text-base "}>From:</span>
              </Paragraph>

              <div className={`grid grid-cols-2 gap-5`}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Month"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Year"}
                />
              </div>
            </div>

            <div className="flex items-center w-full gap-5">
              <span className={"text-base"}>To:</span>

              <div className={`grid grid-cols-2 gap-5`}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Month"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"Year"}
                />
              </div>
            </div>
          </div>

          <div className={"space-x-5"}>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Show account balance only</span>
            </CustomCheckBox>

            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Show outstanding BTW balance Only</span>
            </CustomCheckBox>
          </div>

          <div className={"space-x-5"}>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Show outstanding Observation balance Only</span>
            </CustomCheckBox>

            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Show outstanding Observation balance Only</span>
            </CustomCheckBox>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"High School"}
                placeholder={"High School"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Assigned to Student"}
                placeholder={"Assigned to Student"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />

              <div className="flex cursor-pointer items-center w-full h-[50px]">
                <span className={`text-base flex-shrink-0 w-44`}>
                  Student type:
                </span>

                <div className={"w-full"}>
                  <div className={`flex flex-grow gap-2.5`}>
                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"type"}
                      onChange={handleChange}
                      value={"Adult"}
                      customWrapClassName={classNames(
                        ManagementStyle["CheckModal__form-element__shadow"],
                        "border border-indigo-600",
                      )}
                    >
                      <span className={`text-base`}>Adult</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"type"}
                      value={"Teen"}
                      onChange={handleChange}
                      customWrapClassName={classNames(
                        ManagementStyle["CheckModal__form-element__shadow"],
                        "border border-indigo-600",
                      )}
                    >
                      <span className={`text-base`}>Teen</span>
                    </CustomRadio>
                  </div>
                  {errors.error && <FormError>Choose student type</FormError>}
                </div>
              </div>

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Last name"}
                placeholder={"Last name"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-5">
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Location Assigned"}
                placeholder={"Location Assigned"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Student Status"}
                placeholder={"Student Status"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Zip code"}
                placeholder={"Zip code"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Lead"}
                placeholder={"Lead"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
            </div>
          </div>

          <Title level={4} fontWeightStrong={600} fontSize={"text-base"}>
            Filter students by Classroom date
          </Title>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Class date"}
                placeholder={"Class date"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"CR#"}
                placeholder={"CR#"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-5">
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"Class location"}
                placeholder={"Class location"}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center w-full h-[50px]"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-full text-base",
                )}
                type={"text"}
                spanText={"CR Product "}
                placeholder={"CR Product "}
                fontSize={"text-base"}
                spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                colorBorder={colorsObject.primary}
                name={"date"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={"space-x-5"}>
            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Show complete CR Only</span>
            </CustomCheckBox>

            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Outstanding CR Balance</span>
            </CustomCheckBox>

            <CustomCheckBox
              className={"gap-x-2.5"}
              customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            >
              <span>Display Makeup Students</span>
            </CustomCheckBox>
          </div>

          <Title level={4} fontWeightStrong={600} fontSize={"text-base"}>
            Filter Students by Enrollment Data
          </Title>

          <div className="grid grid-cols-2 gap-5">
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center w-full h-[50px]"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-full text-base",
              )}
              type={"text"}
              spanText={"Product"}
              placeholder={"Product"}
              fontSize={"text-base"}
              spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
              name={"date"}
              onChange={handleChange}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center w-full h-[50px]"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-full text-base",
              )}
              type={"text"}
              spanText={"Package/Services"}
              placeholder={"Package/Services"}
              fontSize={"text-base"}
              spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
              name={"date"}
              onChange={handleChange}
            />
          </div>

          <Title level={4} fontWeightStrong={600} fontSize={"text-base"}>
            Select Students Name and Address format for excel export:
          </Title>

          <div className="grid grid-cols-2 gap-5">
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center w-full h-[50px]"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-full text-base",
              )}
              type={"text"}
              spanText={"Product"}
              placeholder={"Product"}
              fontSize={"text-base"}
              spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
              name={"date"}
              onChange={handleChange}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center w-full h-[50px]"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-full text-base",
              )}
              type={"text"}
              spanText={"Package/Services"}
              placeholder={"Package/Services"}
              fontSize={"text-base"}
              spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
              name={"date"}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <ButtonComponent
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              controlHeight={40}
              borderRadius={5}
              paddingInline={43}
            >
              Export to Excel
            </ButtonComponent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default StudentEventLog;
