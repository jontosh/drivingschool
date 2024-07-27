import IconComponent from "@/components/icons/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { TabItems } from "@/pages/students/account/items/tabs.jsx";
import { ConfigProvider, Tabs } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";

const StudentAccount = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <Helmet>
        <title>Student - Account</title>
      </Helmet>
      <section className={"px-3 sm:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          My Account
        </Title>

        <div className="bg-white rounded-xl px-7 py-5 space-y-5">
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
            <Tabs defaultActiveKey="1" items={TabItems()} />
          </ConfigProvider>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentAccount;
