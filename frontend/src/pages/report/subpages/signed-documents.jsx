import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ReviewLog } from "@/pages/report/subpages/items/review-log.jsx";
import { SearchAdditionalAgreements } from "@/pages/report/subpages/items/search-additional-agreements.jsx";
import { Settings } from "@/pages/report/subpages/items/settings.jsx";
import { SignedDoc } from "@/pages/report/subpages/items/signed-doc.jsx";
import { ConfigProvider, Tabs } from "antd";
import { Fragment, useContext } from "react";
const items = [
  {
    key: "1",
    label: "Signed Documents",
    children: <SignedDoc />,
  },
  {
    key: "2",
    label: "Review Logs",
    children: <ReviewLog />,
  },
  {
    key: "3",
    label: "Search Additional Agreements",
    children: <SearchAdditionalAgreements />,
  },
  {
    key: "4",
    label: "Settings",
    children: <Settings />,
  },
];
export const SignedDocuments = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Signed Documents
      </Paragraph>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: colorsObject.secondary,
              itemSelectedColor: colorsObject.primary,
              itemHoverColor: colorsObject.primary,
              titleFontSize: 16,
              inkBarColor: "transparent",
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          className={"bg-white rounded-lg px-10 py-7"}
        />
      </ConfigProvider>
    </Fragment>
  );
};
