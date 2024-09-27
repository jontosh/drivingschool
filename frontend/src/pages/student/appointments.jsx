import { CustomSelect } from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import { AppointmentsModule } from "@/modules/student-appointment.jsx";
import { ConfigProvider, Form, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import ManagementStyle from "@/pages/managment/management.module.scss";

export const Appointments = () => {
  const { studentId } = useParams();
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
          to={`/admin/student/account/appointments/${studentId}/wheel`}
        >
          Behind the wheel
        </NavLink>
        <NavLink
          className={setActiveLink}
          to={`/admin/student/account/appointments/${studentId}/online`}
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
          <Form.Item name={"search"} label={"Search"}>
            <div className="relative">
              <Input
                className="xl:w-96 pl-12 pr-4 text-sm h-[50px] border-[#667085]"
                placeholder={"Search"}
              />
              <span
                className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
              >
                <AiOutlineSearch />
              </span>
            </div>
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
