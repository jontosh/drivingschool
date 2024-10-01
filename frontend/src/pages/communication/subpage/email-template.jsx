import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { EmailTemplateModule } from "@/modules/email-template.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import { LuMail } from "react-icons/lu";
import { NavLink, useParams } from "react-router-dom";

const CheckPage = ({ page, resources }) => {
  switch (page) {
    case "student-portal": {
      return (
        <TableComponent
          columns={resources?.columns}
          data={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "staff-mobile": {
      return (
        <TableComponent
          columns={resources?.columns}
          data={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "admin-portal": {
      return (
        <TableComponent
          columns={resources?.columns}
          data={resources?.data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      );
    }
    case "reminders": {
      return (
        <TableComponent
          columns={resources?.columns}
          data={resources?.data}
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

const navLinks = [
  { path: "student-portal", label: "Student portal" },
  { path: "staff-mobile", label: "Staff mobile" },
  { path: "admin-portal", label: "Admin portal" },
  { path: "reminders", label: "Reminders" },
];

export const EmailTemplate = () => {
  const { subpage } = useParams();

  const keywords = useMemo(
    () =>
      subpage === "student-portal"
        ? "/page_api/student_email_templates"
        : "/page_api/instructor_email_templates",
    [subpage],
  );

  const { data: KeywordsData } = useRequestGetQuery({
    path: keywords,
  });

  const filteredVars = useMemo(
    () =>
      KeywordsData && KeywordsData.length > 0
        ? KeywordsData?.map((item) => `{{${item}}}`)
        : [],
    [KeywordsData],
  );

  const { columns, data } = EmailTemplateModule(filteredVars);

  const nav = navLinks.map((link, index) => (
    <NavLink
      key={index}
      to={`/admin/communication/email-templates/${link.path}`}
      className={setActiveNav}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Fragment>
      <Helmet>
        <title>Communication - Email Templates</title>
      </Helmet>

      <div className="pb-5">
        <div className="space-x-6 px-5 -mx-5 border-b border-b-gray-400">
          {nav}
        </div>

        <IconComponent
          vertical={classNames("items-center")}
          spaceIconX={2.5}
          icon={<LuMail />}
          iconClass={classNames("text-2xl text-indigo-600")}
          className={"py-2.5 cursor-default"}
        >
          {subpage?.split("-").join(" ")}
        </IconComponent>

        <div className="rounded-2xl overflow-hidden border border-indigo-600">
          <CheckPage page={subpage} resources={{ columns, data }} />
        </div>
      </div>
    </Fragment>
  );
};
