import IconComponent from "@/components/icons/index.jsx";
import { EmailTemplateModule } from "@/modules/email-template.jsx";
import { EmailTemplate } from "@/pages/communication/subpage/email-template.jsx";
import { Pagination } from "antd";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { MdMailOutline } from "react-icons/md";
import { useParams } from "react-router-dom";

export const CommunicationSpa = () => {
  const { title } = useParams();

  const { columns, data } = EmailTemplateModule();
  const [CurrentPagination, setCurrentPagination] = useState(1);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  switch (title?.toLowerCase()) {
    case "email-templates": {
      return (
        <Fragment>
          <Helmet>
            <title>Communication - Email Templates</title>
          </Helmet>

          <EmailTemplate
            resources={{ columns, data }}
            header={
              <Fragment>
                <div className="flex justify-between items-center">
                  <IconComponent
                    className={"cursor-text"}
                    iconClass={"text-indigo-600"}
                    childrenClass={"text-lg font-bold"}
                    icon={<MdMailOutline />}
                    vertical={"items-center"}
                    iconWidth={"text-[28px]"}
                    spaceIconX={2.5}
                  >
                    Student portal emails
                  </IconComponent>

                  <Pagination
                    total={10}
                    pageSize={1}
                    current={CurrentPagination}
                    onChange={handleChangePagination}
                  />
                </div>
              </Fragment>
            }
          />
        </Fragment>
      );
    }

    default: {
    }
  }
};
