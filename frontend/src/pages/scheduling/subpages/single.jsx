import InstructorAva from '@/assets/user/instructor.jpeg'
import { CustomInput } from '@/components/form/index.jsx'
import IconComponent from '@/components/icons/index.jsx'
import Image from '@/components/image/index.jsx'
import Title from '@/components/title/index.jsx'
import { SingleTableCalendar } from "@/pages/scheduling/calendar/single-table-calendar.jsx";
import { useRequestGetQuery } from '@/redux/query/index.jsx'
import { ConfigProvider, Form } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { PiCheckSquare } from 'react-icons/pi'

export const Single = () => {

  const { data: Teachers } = useRequestGetQuery({ path: "/student_account/instructor/" })

  const [form] = Form.useForm();
  const [Index, setIndex] = useState(null);
  const [TeacherId, setTeacherId] = useState(null);
  const [Teacher, setTeacher] = useState(null);

  useEffect(() => {
    for (let i = 0; i < Teachers?.length; i++) {
      if (Teachers[i].id === TeacherId) {
        setTeacher(Teachers[i]);
      }
    }
  }, [TeacherId, Index])

  const teacher = Teachers?.map((teacher, index) => {
    return (
      <Fragment key={index}>
        <div
          className="w-48 px-8 py-7 bg-white rounded-lg space-y-5 border"
          onClick={() => {
            setIndex(index);
            setTeacherId(teacher.id)
          }}
        >
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
            className={`w-full rounded-lg border-2 pt-1.5 ${Index === index ? "border-[#F5F6F7] bg-[#3575FF]" : "border-[#F5F6F7] "}`}
            spaceIconX={2.5}
            iconClass={"text-[#C3CAD9] "}
            childrenClass={` ${Index === index ? "text-white" : "text-[#6B7A99]"}`}
          >
            Show on
          </IconComponent>
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>

      <div className='bg-white p-5 space-y-5'>
        <Form form={form} layout='vertical'>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  fontSize: 20
                },
              },
            }}
          >
            <Form.Item name={"search"} label={"Teacher"} labelAlign='left' className='font-semibold'>
              <CustomInput placeholder={"Search"} classNames={"w-full"} />
            </Form.Item>
          </ConfigProvider>
        </Form>

        <div className='flex gap-2.5'>
          {teacher}
        </div>

        <SingleTableCalendar data={Teacher} />
      </div>

    </Fragment>
  );
};
