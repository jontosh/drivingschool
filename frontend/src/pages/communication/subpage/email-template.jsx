import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { EmailTemplateModule } from "@/modules/email-template.jsx";
import classNames from "classnames";
import { Fragment, useContext, useEffect } from "react";
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

  // Agar subpage mavjud bo'lmasa, birinchi navigatsiya elementiga yo'naltiramiz
  useEffect(() => {
    if (!subpage && navLinks.length > 0) {
      navigate(`/admin/communication/email-templates/${navLinks[0].path}`);
    }
  }, [subpage, navigate]);

  const nav = navLinks.map((link, index) => (
    <NavLink
      key={index}
      to={`/admin/communication/email-templates/${link.path}`}
      className={setActiveNav}
      onClick={() => {
        // Navigatsiya o'zgartirilganda subpage ham o'zgaradi
        if (subpage !== link.path) {
          navigate(`/admin/communication/email-templates/${link.path}`);
        }
      }}
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
            className={`subpage-table-${subpage}`}
            title={() => (
              <div className="py-2 px-4 bg-indigo-50 text-indigo-700 font-semibold">
                {subpage === 'student-portal' && "Email Templates for Students"}
                {subpage === 'staff-mobile' && "Mobile Email Templates for Staff"}
                {subpage === 'admin-portal' && "Email Templates for Administrators"}
                {subpage === 'reminders' && "Email Templates for Reminders"}
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};
