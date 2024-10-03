import ButtonComponent from "@/components/button/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import TabItem from "@/pages/scheduling/items/tab.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { ConfigProvider, Form, Input, Tabs } from "antd";
import { Fragment, useContext, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const SchedulingStudent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data } = useRequestGetQuery({ path: "/student_account/student/" });
  const [Search, setSearch] = useState("");
  const { Data } = useFilterStatus({ data, search: Search });
  const [form] = Form.useForm();
  const studentId = useURLSearchParams("studentId");
  const studentFirstName = useURLSearchParams("first-name");
  const studentLastName = useURLSearchParams("last-name");

  const onFinish = (values) => {
    setSearch(values?.search);
  };

  const onReset = () => {
    form.resetFields();
    setSearch("");
  };

  const students = useMemo(() => (Search.trim() !== "" ? Data : []), [Search]);

  const studentData = students.map((item, index) => (
    <li
      key={index}
      onClick={() => {
        form.resetFields();
        setSearch("");
      }}
    >
      <Link
        to={`/admin/scheduling/student?studentId=${item.id}&first-name=${item.first_name}&last-name=${item.last_name}`}
      >
        {item?.first_name} {item?.last_name}
      </Link>
    </li>
  ));

  return (
    <div className={"space-y-8"}>
      <Form onFinish={onFinish} className={"flex gap-5"} form={form}>
        <div className={"flex-grow space-y-2"}>
          <Form.Item
            name={"search"}
            className={"mb-0"}
            rules={[
              {
                required: true,
                message: "Search is required",
              },
            ]}
          >
            <Input
              className={"h-[50px]"}
              placeholder={"Search"}
              prefix={<AiOutlineSearch className={"text-xl"} />}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Form.Item>

          {studentData.length !== 0 && (
            <ul className={"p-5 bg-white -mt-3.5"}>{studentData}</ul>
          )}
        </div>

        <ButtonComponent
          type={"reset"}
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultBg={colorsObject.main}
          defaultHoverBg={colorsObject.main}
          defaultBorderColor={colorsObject.primary}
          onClick={onReset}
          borderRadius={5}
          paddingInline={43}
          className={"h-[50px]"}
        >
          Reset
        </ButtonComponent>
      </Form>

      {studentId && (
        <Fragment>
          <div className="bg-white p-7 rounded-2xl shadow-2xl">
            <div className="flex gap-5 items-center">
              <Title
                level={4}
                fontSize={"text-2xl text-gray-500"}
                fontWeightStrong={400}
              >
                Book My Lessons -
                <b className={"font-medium text-black"}>
                  {studentFirstName} {studentLastName}
                </b>
              </Title>
            </div>
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
              <Tabs defaultActiveKey="2" items={TabItem()} />
            </ConfigProvider>
          </div>
        </Fragment>
      )}
    </div>
  );
};
