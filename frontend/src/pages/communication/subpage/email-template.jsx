import TableComponent from "@/components/table/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { NavLink, useParams } from "react-router-dom";

const CheckPage = ({ page, resources }) => {
  switch (page) {
    case "student-portal": {
      return (
        <TableComponent
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "staff-mobile": {
      return (
        <TableComponent
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "admin-portal": {
      return (
        <TableComponent
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "reminders": {
      return (
        <TableComponent
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    default: {
      console.error(`Error! Unknown resource type ${page}`);
    }
  }
};

export const EmailTemplate = ({ header, resources }) => {
  const { subpage } = useParams();

  return (
    <div className={"pb-5"}>
      <div className={"space-x-6 px-5 -mx-5 border-b border-b-gray-400"}>
        <NavLink
          to={"/admin/communication/email-templates/student-portal"}
          className={setActiveNav}
        >
          Student portal
        </NavLink>

        <NavLink
          to={"/admin/communication/email-templates/staff-mobile"}
          className={setActiveNav}
        >
          Staff mobile
        </NavLink>

        <NavLink
          to={"/admin/communication/email-templates/admin-portal"}
          className={setActiveNav}
        >
          Admin portal
        </NavLink>

        <NavLink
          to={"/admin/communication/email-templates/reminders"}
          className={setActiveNav}
        >
          Reminders
        </NavLink>
      </div>
      <div className="py-5">{header}</div>

      <div className={"rounded-2xl overflow-hidden border border-indigo-600"}>
        <CheckPage page={subpage} resources={resources} />
      </div>
    </div>
  );
};
