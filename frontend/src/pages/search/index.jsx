import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ProfileStyle from "@/pages/student/student-account.module.scss";
import { Table } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";

const SearchFormik = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CheckValues, setCheckValues] = useState(false);
  const [ShowTable, setShowTable] = useState(false);

  return (
    <Fragment>
      <Formik
        initialValues={{ account: "", status: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.account) {
            errors.account = "Required";
          }
          // else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = "Invalid email address";
          // }

          Object.values(values).forEach((value) => {
            if (value === "") {
              setCheckValues(true);
              setShowTable(false);
            }
          });

          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          Object.values(values).forEach((value) => {
            if (value !== "") {
              setCheckValues(false);
              setShowTable(true);
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl">
            {CheckValues && (
              <Title
                level={3}
                fontSize={"text-[#FF333F] text-xl"}
                titleMarginBottom={20}
                fontWeightStrong={500}
              >
                Error account cant be find please try again
              </Title>
            )}

            <div className="grid grid-cols-2 gap-5 mb-7">
              <div className={"space-y-5"}>
                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Account status
                  </span>
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  placeholder={"Account #"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Account #"}
                  name={"account"}
                  value={values.account}
                  onChange={handleChange}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"First name"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"First name"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Last name"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Last name"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Zip code"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Zip code"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Phone"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Phone"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Student City"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Student City"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Year opened"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Year opened"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Student address"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Student address"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Permit number"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Permit number"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Associated staff
                  </span>
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  placeholder={"MM/DD/YYYY"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Account created"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <div className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Student Type
                  </span>

                  <div className={"w-full space-x-5"}>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-2.5"}
                      name={"type"}
                    >
                      <span className={"text-base"}>Adult</span>
                    </CustomRadio>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-2.5"}
                      name={"type"}
                    >
                      <span className={"text-base"}>Teen</span>
                    </CustomRadio>
                  </div>
                </div>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Location
                  </span>
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
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

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    High school
                  </span>
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>CR No</span>
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  placeholder={"Parent name"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Parent name"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Email ID"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Email ID"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Phone search"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  spanText={"Phone search"}
                  colorBorder={colorsObject.primary}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />
              </div>
            </div>

            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={"#24C18F"}
                defaultHoverBg={"#24C18F"}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={62}
                controlHeight={40}
                fontSize={16}
                className={"font-medium"}
                type={"submit"}
              >
                Filter
              </ButtonComponent>
              <ButtonComponent
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={62}
                controlHeight={40}
                fontSize={16}
                className={"font-medium"}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                type={"reset"}
              >
                Reset
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>

      {ShowTable && (
        <div className={"bg-white p-5 rounded-xl"}>
          <Title
            fontSize={"text-2xl text-indigo-600"}
            fontWeightStrong={500}
            titleMarginBottom={20}
          >
            Result: 246
          </Title>
	        
	        <div className='flex items-center justify-between'>
		       
	        </div>
          <div className={"-mx-5"}>
            <Table />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const Search = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Advanced search</title>
      </Helmet>

      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={25}
        >
          Advanced search
        </Title>

        <SearchFormik />
      </section>
    </Fragment>
  );
};

export default Search;
