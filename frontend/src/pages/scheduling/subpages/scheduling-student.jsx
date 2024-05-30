import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { FormError } from "@/modules/errors.jsx";
import TabItem from "@/pages/scheduling/items/tab.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { ConfigProvider, Tabs } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const SchedulingStudent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/student_account/student/" });
  const [Search, setSearch] = useState(null);
  const { Data } = useFilterStatus({ data, search: Search });
  const [Student, setStudent] = useState({});

  const searchItem = Data?.map((item, index) => {
    return (
      <li
        key={index}
        className={"cursor-pointer"}
        onClick={() => {
          setStudent(item);
        }}
      >
        {item.first_name} {item.last_name}, {item.birth}
      </li>
    );
  });

  return (
    <div className={"space-y-8"}>
      <Formik
        initialValues={{
          search: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.search) {
            errors.search = "Search is empty";
          } else {
            setSearch(values.search);
          }

          return errors;
        }}
        onSubmit={(values) => { }}
      >
        {({ values, errors, handleChange, handleReset }) => (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={"flex gap-5 items-center"}>
              <div className={"space-y-5 flex-grow"}>
                <label className={"relative w-full"}>
                  <CustomInput
                    colorBorder={colorsObject.main}
                    fontSize="text-base"
                    placeholder={"Find teacher"}
                    classNames={
                      "inline-flex flex-row-reverse items-center gap-5 w-full"
                    }
                    className={`pl-12 pr-4 py-2.5  h-10 text-sm inline-flex flex-row-reverse shadow-xl`}
                    value={values.search}
                    onChange={handleChange}
                    name={"search"}
                  />
                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>
                {errors.search && (
                  <FormError className={"pl-5"}>{errors.search}</FormError>
                )}
              </div>

              {values.search && (
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  defaultBorderColor={colorsObject.primary}
                  defaultHoverBorderColor={colorsObject.primary}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  borderRadius={5}
                  paddingInline={44}
                  onClick={handleReset}
                >
                  Clear
                </ButtonComponent>
              )}
            </div>
            {values.search !== "" && (
              <div className="pr-36">
                <ul className={"w-full mr-[199px] p-5 space-y-2.5 bg-white rounded-b-2xl"}>
                  {searchItem}
                </ul>
              </div>
            )}
          </form>
        )}
      </Formik>

      {Search && Student?.id && (
        <Fragment>
          <div className="bg-white p-7 rounded-2xl shadow-2xl">
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    itemColor: colorsObject.secondary,
                    itemSelectedColor: colorsObject.primary,
                    itemHoverColor: colorsObject.primary,
                    titleFontSize: 16,
                    inkBarColor: "transparent",
                  },
                },
              }}
            >
              <Tabs defaultActiveKey="1" items={TabItem()} />
            </ConfigProvider>
          </div>
        </Fragment>
      )}
    </div>
  );
};
