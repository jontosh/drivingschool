import InstructorAva from "@/assets/user/instructor.jpeg";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import { SingleTableCalendar } from "@/pages/scheduling/calendar/single-table-calendar.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Form, Input } from "antd";
import { useState } from "react";
import { PiCheckSquare } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { Link } from "react-router-dom";

export const Single = () => {
  const { data: TeachersData } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const instructorId = useURLSearchParams("instructorId");

  const [form] = Form.useForm();
  const [Search, setSearch] = useState("");

  const { Data: teachers } = useFilterStatus({
    data: TeachersData,
    status: "ACTIVE",
    search: Search,
  });

  const onFinish = (values) => {
    setSearch(values.search);
  };

  const teacher = teachers?.map((teacher, index) => {
    return (
      <Link
        to={`/admin/scheduling/single?instructorId=${teacher.id}`}
        key={index}
        className={"flex-shrink-0"}
        onClick={() => {
          setSearch("");
          form.resetFields();
        }}
      >
        <div className="w-48 px-8 py-7 bg-white rounded-lg space-y-5 border">
          <Image
            className={"w-[60px] mx-auto overflow-hidden rounded-lg"}
            src={teacher?.picture ?? InstructorAva}
            srcSet={teacher?.picture ?? InstructorAva}
          />

          <Title
            level={4}
            fontSize={"text-xs"}
            className={"text-center min-h-10"}
          >
            {teacher.first_name} {teacher.last_name}
          </Title>

          <IconComponent
            icon={<PiCheckSquare />}
            iconWidth={"w-6"}
            vertical={"items-center justify-center"}
            className={`w-full rounded-lg border-2 pt-1.5 ${instructorId === teacher.id ? "border-[#F5F6F7] bg-[#3575FF]" : "border-[#F5F6F7] "}`}
            spaceIconX={2.5}
            iconClass={"text-[#C3CAD9] "}
            childrenClass={` ${instructorId === teacher.id ? "text-white" : "text-[#6B7A99]"}`}
          >
            Show on
          </IconComponent>
        </div>
      </Link>
    );
  });

  return (
    <div className="bg-white p-5 space-y-5 rounded-xl">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name={"search"}
          rules={[
            {
              required: true,
              message: "Teacher search is required",
            },
          ]}
        >
          <Input
            className={"h-[50px]"}
            placeholder={"Search"}
            prefix={<AiOutlineSearch className={"text-xl"} />}
            allowClear
            enterButton="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Item>
      </Form>

      {teacher.length !== 0 && (
        <div className="flex gap-2.5 overflow-x-scroll ">{teacher}</div>
      )}

      {instructorId && <SingleTableCalendar />}
    </div>
  );
};
