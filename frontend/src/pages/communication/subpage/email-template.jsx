import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { EmailTemplateModule } from "@/modules/email-template.jsx";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { LuMail, LuPlus } from "react-icons/lu";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import ColorsContext from "@/context/colors.jsx";

const navLinks = [
  { path: "student-portal", label: "Student portal" },
  { path: "staff-mobile", label: "Staff mobile" },
  { path: "admin-portal", label: "Admin portal" },
  { path: "reminders", label: "Reminders" },
];

export const EmailTemplate = () => {
  const { subpage } = useParams();
  const navigate = useNavigate();
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = EmailTemplateModule();

  const nav = navLinks.map((link, index) => (
    <NavLink
      key={index}
      to={`/admin/communication/email-templates/${link.path}`}
      className={setActiveNav}
    >
      {link.label}
    </NavLink>
  ));

  const handleCreateClick = () => {
    navigate(`/admin/communication/email-templates/${subpage}/create`);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Communication - Email Templates</title>
      </Helmet>

      <div className="pb-5">
        <div className="space-x-6 px-5 -mx-5 border-b border-b-gray-400">
          {nav}
        </div>

        <div className="flex justify-between items-center py-2.5">
          <IconComponent
            vertical={classNames("items-center")}
            spaceIconX={2.5}
            icon={<LuMail />}
            iconClass={classNames("text-2xl text-indigo-600")}
            className={"cursor-default"}
          >
            {subpage?.split("-").join(" ")}
          </IconComponent>
          
          <ButtonComponent
            defaultColor={colorsObject?.white || "white"}
            defaultHoverColor={colorsObject?.white || "white"}
            defaultBg={colorsObject?.primary || "#4f46e5"}
            defaultHoverBg={colorsObject?.primaryHover || "#4338ca"}
            controlHeight={40}
            borderRadius={8}
            style={{ padding: "8px 16px" }}
            onClick={handleCreateClick}
          >
            <div className="flex items-center gap-2">
              <LuPlus className="text-lg" />
              <span>Create New Template</span>
            </div>
          </ButtonComponent>
        </div>

        <div className="rounded-2xl overflow-hidden border border-indigo-600 mt-3">
          <TableComponent
            columns={columns}
            data={data}
            pagination={false}
            scroll={{ x: 800 }}
          />
        </div>
      </div>
    </Fragment>
  );
};
