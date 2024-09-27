import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import IconComponent from "@/components/icons";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SearchModule } from "@/modules/search.jsx";
import ProfileStyle from "@/pages/student/student-account.module.scss";
import { DatePicker, Form, Pagination, Table } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { SlCloudDownload } from "react-icons/sl";

const SearchFormik = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CheckValues, setCheckValues] = useState(false);
  const [ShowTable, setShowTable] = useState(false);
  const { columns, data } = SearchModule();
  const [Current, setCurrent] = useState(1);
  const handleChangePagination = (page) => {
    setCurrent(page);
  };

  return (
    <Fragment>
      <Formik
        initialValues={{ account: "", status: "", email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.account) {
            errors.account = "Required";
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }

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
          <Form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl" layout="vertical">
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

            {/* <div className="grid min-[1150px]:grid-cols-2 gap-5 mb-7"> */}

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-5">
                <Form.Item label="Account status">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Status",
                        label: "Status",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>

                <Form.Item label="Account #">
                  <CustomInput
                    placeholder={"Account #"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="First name">
                  <CustomInput
                    placeholder={"First name"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Last name">
                  <CustomInput
                    placeholder={"Last name"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Zip code">
                  <CustomInput
                    placeholder={"Zip code"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Phone">
                  <CustomInput
                    placeholder={"Phone"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Student City">
                  <CustomInput
                    placeholder={"Student City"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Year opened">
                  <CustomInput
                    placeholder={"Year opened"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Student address">
                  <CustomInput
                    placeholder={"Student address"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Permit number">
                  <CustomInput
                    placeholder={"Permit number"}
                    classNames={"w-full"}
                  />
                </Form.Item>
              </div>

              <div className="space-y-5">
                <Form.Item label="Associated staff">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Status",
                        label: "Status",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>

                <Form.Item label="Account created">
                  <DatePicker className="w-full h-[50px] border-[#667085]" />
                </Form.Item>

                <Form.Item label="Student Type">
                  <div className="flex space-x-7">
                    <CustomRadio name={"StudentType"}>
                      Adult
                    </CustomRadio>

                    <CustomRadio name={"StudentType"}>
                      Teen
                    </CustomRadio>
                  </div>
                </Form.Item>

                <Form.Item label="Location">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Status",
                        label: "Status",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>

                <Form.Item label="High school">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Status",
                        label: "Status",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>

                <Form.Item label="CR No">
                  <CustomSelect
                    placeholder={"Select"}
                    options={[
                      {
                        value: "Status",
                        label: "Status",
                      }
                    ]}
                    className={"h-[50px]"}
                  />
                </Form.Item>

                <Form.Item label="Parent name">
                  <CustomInput
                    placeholder={"Parent name"}
                    classNames={"w-full"}
                  />
                </Form.Item>

                <Form.Item label="Email ID">
                  <CustomInput
                    placeholder={"Email ID"}
                    classNames={"w-full"}
                  />
                </Form.Item>
                
                <Form.Item label="Phone search">
                  <CustomInput
                    placeholder={"Phone search"}
                    classNames={"w-full"}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex max-[500px]:flex-col justify-center gap-5 pt-5">
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
          </Form>
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

          <div className="flex items-center justify-between">
            <form className={"pb-3"}>
              <label className={"relative"}>
                <CustomInput
                  placeholder={"Search"}
                  className={`w-96 pl-12 pr-4 text-sm shadow-lg`}
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

            <div className="flex items-center gap-4">
              <Pagination
                total={20}
                pageSize={2}
                current={Current}
                onChange={handleChangePagination}
              />

              <IconComponent
                icon={<SlCloudDownload />}
                iconWidth={"border border-indigo-700 rounded p-1 shadow-lg"}
              />
            </div>
          </div>
          <div className={"-mx-5"}>
            <Table columns={columns} dataSource={data} pagination={false} />
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

      <section className={"px-3 sm:px-11 space-y-5 max-w-full w-full"}>
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
