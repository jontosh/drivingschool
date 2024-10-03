import { CustomSelect } from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import { AppointmentsModule } from "@/modules/student-appointment.jsx";
import { ConfigProvider, Form, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const Appointments = () => {
  const studentId = useURLSearchParams("studentId");
  const { columns, data } = AppointmentsModule(studentId);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
  };

  const setActiveLink = ({ isActive }) =>
    isActive
      ? `text-xl text-indigo-600 font-semibold `
      : `text-xl text-gray-500 font-semibold `;

  return (
    <div className={"space-y-5"}>
      <div
        className={
          "flex max-[500px]:flex-col gap-9 max-[500px]:gap-3 max-[500px]:text-center"
        }
      >
        {/*By Student IS*/}
        <NavLink
          className={setActiveLink}
          to={`/admin/student/account/appointments?studentId=${studentId}&page=wheel`}
        >
          Behind the wheel
        </NavLink>
        <NavLink
          className={setActiveLink}
          to={`/admin/student/account/appointments?studentId=${studentId}&page=online`}
        >
          Online course
        </NavLink>
      </div>

      <Form className={"flex justify-between"} form={form} onFinish={onFinish}>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 16,
            },
          }}
        >
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
              allowClear
              enterButton="Search"
            />
          </Form.Item>
        </ConfigProvider>

        <div className="space-x-5">
          <CustomSelect
            placeholder={"Please select type"}
            className={`w-full xl:w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            options={[
              {
                value: "8h in car",
                label: "8h in car",
              },
            ]}
          />
          <CustomSelect
            placeholder={"Please select status"}
            className={`w-full xl:w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            options={[
              {
                value: "Confirmed",
                label: "Confirmed",
              },
              {
                value: "Cancelled",
                label: "Cancelled",
              },
            ]}
          />
        </div>
      </Form>

      <div className={"-mx-5"}>
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
};
