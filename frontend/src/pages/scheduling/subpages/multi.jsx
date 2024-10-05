import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons";
import Title from "@/components/title/index.jsx";
import { MultiSidebar } from "@/pages/scheduling/calendar/multi-sidebar.jsx";
import { MultiTable } from "@/pages/scheduling/calendar/multi-table-calendar.jsx";
import { Fragment, useMemo, useState, useCallback } from "react";
import { LuSettings } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Form, Modal, Select } from "antd";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import dayjs from "dayjs";

export const Multi = () => {
  const [Schedules, setSchedules] = useState([]);
  const [Now, setNow] = useState(new Date());
  const [form] = Form.useForm();

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Students } = useRequestGetQuery({
    path: "/student_account/student/",
  });

  const instructorsOptions = useMemo(
    () =>
      Instructors?.map((item) => ({
        value: item.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })),
    [Instructors],
  );

  const studentOptions = useMemo(
    () =>
      Students?.map((item) => ({
        value: item.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })),
    [Students],
  );

  const onFinish = useCallback(
    (values) => {
      if (values.instructors.length > 0) {
        const filteredSchedules = Instructors?.filter((item) =>
          values.instructors.includes(item.id),
        ).map((item) => ({
          instructor: item,
          student: values.student,
        }));
        setSchedules(filteredSchedules);
      }
    },
    [Instructors],
  );

  const onMore = useCallback(() => {
    Modal.info({
      title: "Learn about this page".toUpperCase(),
      content: <>content</>,
      width: 650,
    });
  }, []);

  const instructorTable = useMemo(
    () =>
      Schedules?.map((item, index) => (
        <MultiTable key={index} date={Now} {...item} />
      )),
    [Schedules, Now],
  );

  return (
    <Fragment>
      <div className="p-7 bg-white rounded-xl">
        <div className="flex items-center justify-between p-7">
          <ButtonComponent
            borderRadius={20}
            defaultBorderColor={"#F5F6F7"}
            defaultHoverBorderColor={"#F5F6F7"}
            defaultColor={"#6B7A99"}
            defaultHoverColor={"#6B7A99"}
            controlHeight={40}
            paddingInline={20}
            onClick={() => setNow(new Date())}
          >
            Today
          </ButtonComponent>

          <div className="flex items-center gap-8">
            <ButtonComponent
              borderRadius={20}
              defaultBorderColor={"#F5F6F7"}
              defaultHoverBorderColor={"#F5F6F7"}
              defaultColor={"#6B7A99"}
              defaultHoverColor={"#6B7A99"}
              controlHeight={40}
              paddingInline={12}
            >
              <MdKeyboardArrowLeft />
            </ButtonComponent>

            <Title fontSize={"text-[#6B7A99]"}>
              {dayjs(Now).format("MMMM-DD-YYYY")}
            </Title>

            <ButtonComponent
              borderRadius={20}
              defaultBorderColor={"#F5F6F7"}
              defaultHoverBorderColor={"#F5F6F7"}
              defaultColor={"#6B7A99"}
              defaultHoverColor={"#6B7A99"}
              controlHeight={40}
              paddingInline={12}
            >
              <MdKeyboardArrowRight />
            </ButtonComponent>
          </div>
        </div>

        <div className="flex gap-5">
          <aside className="w-96 space-y-5">
            <MultiSidebar getDate={setNow} defaultDate={Now} />

            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                name="instructors"
                label="Select"
                rules={[
                  { required: true, message: "Select instructor is required!" },
                ]}
              >
                <Select
                  className="h-[50px]"
                  placeholder="Select instructor"
                  mode="multiple"
                  allowClear
                  options={instructorsOptions}
                />
              </Form.Item>

              <Form.Item
                name="student"
                rules={[
                  { required: true, message: "Select student is required!" },
                ]}
              >
                <Select
                  className="h-[50px]"
                  showSearch
                  placeholder="Select student"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={studentOptions}
                />
              </Form.Item>

              <div className="flex flex-col gap-y-5 border border-gray-400 rounded-xl p-5">
                <ButtonComponent
                  defaultBg="rgba(36, 193, 143, 1)"
                  defaultHoverBg="rgba(60, 227, 174, 1)"
                  controlHeight={40}
                  borderRadius={5}
                  className="w-full"
                  type="submit"
                >
                  GET SCHEDULE
                </ButtonComponent>

                <ButtonComponent
                  defaultBg="rgba(0, 0, 0, 0.25)"
                  defaultHoverBg="rgba(95, 95, 95, 0.25)"
                  controlHeight={40}
                  borderRadius={5}
                  className="w-full"
                  type="button"
                  onClick={onMore}
                >
                  LEARN MORE
                </ButtonComponent>

                <div className="w-[50px] h-[50px] bg-[#24C18F] rounded text-center m-auto cursor-pointer">
                  <IconComponent
                    icon={<LuSettings />}
                    iconWidth="w-[24px]"
                    className="text-white pt-3"
                  />
                </div>
              </div>
            </Form>
          </aside>

          {Schedules.length > 0 && (
            <div className="flex-grow w-min flex border border-gray-400 rounded-xl overflow-x-scroll">
              {instructorTable}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
