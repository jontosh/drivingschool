import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import { AppointmentsModule } from "@/modules/student-appointment.jsx";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import ManagementStyle from "@/pages/managment/management.module.scss";

export const Appointments = () => {
  const { studentId } = useParams();
  const { columns, data } = AppointmentsModule(studentId);
  const setActiveLink = ({ isActive }) =>
    isActive
      ? `text-xl text-indigo-600 font-semibold `
      : `text-xl text-gray-500 font-semibold `;

  return (
    <div>
      <div className={"space-x-9"}>
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

      <form
        className={
          "pt-3.5 pb-3 flex gap-5 items-center border-b border-b-gray-400 -mx-5 px-5"
        }
      >
        <label className={"relative"}>
          <CustomInput
            placeholder={"Search"}
            className={`w-96 pl-12 pr-4 text-sm`}
          />

          <span className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}>
            <AiOutlineSearch />
          </span>
        </label>
        <CustomSelect
          placeholder={"Please select type"}
          className={`w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
          options={[
            {
              value: "8h in car",
              label: "8h in car",
            },
          ]}
        />
        <CustomSelect
          placeholder={"Please select status"}
          className={`w-[207px] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
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
      </form>

      <div className={"pt-5 -mx-5"}>
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
};
