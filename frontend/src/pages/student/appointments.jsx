import TableComponent from "@/components/table/index.jsx";
import { AppointmentsModule } from "@/modules/student-appointment.jsx";
import { Form, Input, Select } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { useState } from "react";
import classNames from "classnames";
import { useFilterStatus } from "@/hooks/filter.jsx";

export const Appointments = () => {
  const studentId = useURLSearchParams("studentId");
  const page = useURLSearchParams("page");
  const { columns, data } = AppointmentsModule();
  const [form] = Form.useForm();
  const [Search, setSearch] = useState("");
  const [Status, setStatus] = useState("");
  const { Data } = useFilterStatus({ data, search: Search, status: Status });

  return (
    <div className={"space-y-5"}>
      <div
        className={
          "flex max-[500px]:flex-col gap-9 max-[500px]:gap-3 max-[500px]:text-center"
        }
      >
        <Link
          to={`/admin/student/account/appointments?studentId=${studentId}&page=wheel`}
          className={classNames(page === "wheel" ? "text-indigo-500" : null)}
        >
          Behind the wheel
        </Link>
        <Link
          to={`/admin/student/account/appointments?studentId=${studentId}&page=online`}
          className={classNames(page === "online" ? "text-indigo-500" : null)}
        >
          Online course
        </Link>
      </div>

      <div className="flex justify-between">
        <Input
          className={"h-[50px] w-1/2"}
          placeholder={"Search"}
          prefix={<AiOutlineSearch className={"text-xl"} />}
          allowClear
          enterButton="Search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-x-5">
          <Select
            placeholder={"Please select type"}
            className={"h-[50px]"}
            options={[
              {
                value: "Single Appointment(Driver Only)Road",
                label: "Single Appointment (Driver Only)",
              },
              {
                value: "Road Test(DriverOnly)",
                label: "Road Test (Driver Only)",
              },
            ]}
          />
          <Select
            placeholder={"Please select status"}
            className={"h-[50px]"}
            onChange={(value) => setStatus(value)}
            options={[
              {
                value: "ACTIVE",
                label: "ACTIVE",
              },
              {
                value: "INACTIVE",
                label: "INACTIVE",
              },
              {
                value: "DELETED",
                label: "DELETED",
              },
            ]}
          />
        </div>
      </div>

      <div className={"-mx-5"}>
        {page === "wheel" && <TableComponent columns={columns} data={Data} />}
      </div>
    </div>
  );
};
