import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons";
import Title from "@/components/title/index.jsx";
import { MultiSidebar } from "@/pages/scheduling/calendar/multi-sidebar.jsx";
import { MultiTable } from "@/pages/scheduling/calendar/multi-table-calendar.jsx";
import { Fragment, useMemo, useState, useCallback } from "react";
import { LuSettings } from "react-icons/lu";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Form, Modal, Select } from "antd";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import dayjs from "dayjs";

export const Multi = () => {
  const [form] = Form.useForm();
  const [Now, setNow] = useState(new Date());
  const [StudentId, setStudentId] = useState(undefined);
  const [InstructorsSlot, setInstructorsSlot] = useState([]);

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Students } = useRequestGetQuery({
    path: "/student_account/student/",
  });

  const { data: StudentAPI, isSuccess } = useRequestIdQuery({
    path: "/page_api/student",
    id: StudentId,
  });

  const instructorsOptions = useMemo(
    () =>
      Instructors?.map((instructor) => ({
        value: instructor?.id,
        label: `${instructor?.first_name} ${instructor?.last_name}`,
      })),
    [Instructors],
  );

  const studentOptions = useMemo(
    () =>
      Students?.map((student) => ({
        value: student?.id,
        label: `${student?.first_name} ${student?.last_name}`,
      })),
    [Students],
  );

  const instructors = useMemo(() => {
    if (isSuccess) {
      const appointments = [];
      for (let i = 0; i < StudentAPI?.appointments?.length; i++) {
        const appointment = StudentAPI?.appointments[i];
        for (let j = 0; j < appointment?.student?.length; j++) {
          const student = appointment?.student[j];
          for (let k = 0; k < Instructors?.length; k++) {
            const staff = Instructors[k];
            if (student?.staff === staff?.id) {
              appointments.push({
                instructor: student?.staff,
                name: `${staff?.first_name} ${staff?.last_name}`,
                slots: appointment?.time_slot?.slots?.map((item) => ({
                  title: item?.name,
                  start: new Date(item?.start),
                  end: new Date(item?.end),
                })),
              });
            }
          }
        }
      }
      return appointments;
    }
  }, [isSuccess]);

  const onFinish = async (values) => {
    setStudentId(values?.student);

    setInstructorsSlot(
      instructors?.filter(
        (instructor, index) =>
          instructor?.instructor === values?.instructors[index],
      ),
    );
  };

  const slot = InstructorsSlot?.map((item, index) => (
    <MultiTable key={index} date={Now} data={item} />
  ));

  const onMore = useCallback(() => {
    Modal.info({
      title: "Learn about this page".toUpperCase(),
      content: <>content</>,
      width: 650,
    });
  }, []);

  return (
    <Fragment>
      <div className="p-3 sm:p-7 bg-white rounded-xl">
        <div className="flex max-[600px]:flex-col items-center justify-between p-7">
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

        <div className="flex max-[1350px]:flex-col gap-5">
          <aside className="w-full min-[1350px]:w-96 space-y-5">
            <div className="text-center">
              <MultiSidebar getDate={setNow} defaultDate={Now} />
            </div>

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

          <div className="flex-grow w-full min-[1350px]:w-min flex border border-gray-400 rounded-xl overflow-x-scroll">
            {slot}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
