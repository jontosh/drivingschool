import ButtonComponent from "@/components/button";
import { CustomInput, CustomSelect } from "@/components/form";
import IconComponent from "@/components/icons";
import Title, { Paragraph } from "@/components/title";
import { ExportOutlined } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { Fragment, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TabItem from "./items/help-content";
import ColorsContext from "@/context/colors.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const Help = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <Helmet>
        <title>Help</title>
      </Helmet>
      <div className="px-11">
        <Title
          level={2}
          fontSize={"text-black text-2xl"}
          fontWeightStrong={500}
          titleMarginBottom={40}
        >
          Customer Support
        </Title>

        <header className="grid grid-cols-4 gap-10">
          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full mx-auto -mt-[28px]">

            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
            >Email</Title>
            <Paragraph className="text-gray-400 text-lg">example@mail.com</Paragraph>
          </div>

          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full absolute ml-20" style={{ marginTop: -28 }}>

            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
              className={"pt-10"}
            >Phone</Title>
            <Paragraph className="text-gray-400 text-lg">+998883715271</Paragraph>
          </div>
          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full absolute ml-20" style={{ marginTop: -28 }}>

            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
              className={"pt-10"}
            >Support hours</Title>
            <Paragraph className="text-gray-400 text-lg">08:00 - 18:00</Paragraph>
          </div>

          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full absolute ml-20" style={{ marginTop: -28 }}>

            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
              className={"pt-10"}
            >Days</Title>
            <Paragraph className="text-gray-400 text-lg">Monday & Sunday</Paragraph>
          </div>
        </header>

        <section className="pt-10">
          <div className="flex justify-between items-center">
            <Title
              level={3}
              fontSize={"text-xl"}
              fontWeightStrong={500}
            >Latest news</Title>

            <Link to="/support/news">
              <ButtonComponent
                defaultBg="#1890FF"
                defaultHoverBg="#1890FF"
                controlHeight={44}
                borderRadius={4}
                className="w-40"
              >
                All news
              </ButtonComponent>
            </Link>
          </div>

          <div className="flex flex-col gap-y-5 pt-5">
            <div className="bg-white w-full flex flex-col gap-y-5 border-l-4 border-solid border-blue-500 p-5 rounded-tr-lg rounded-br-lg">
              <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
              <span className="flex justify-between items-center">
                <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                <IconComponent
                  icon={<ExportOutlined />}
                  className={"text-gray-400"}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-5 pt-5">
            <div className="bg-white w-full flex flex-col gap-y-5 border-l-4 border-solid border-blue-500 p-5 rounded-tr-lg rounded-br-lg">
              <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
              <span className="flex justify-between items-center">
                <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                <IconComponent
                  icon={<ExportOutlined />}
                  className={"text-gray-400"}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-5 pt-5">
            <div className="bg-white w-full flex flex-col gap-y-5 border-l-4 border-solid border-blue-500 p-5 rounded-tr-lg rounded-br-lg">
              <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
              <span className="flex justify-between items-center">
                <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                <IconComponent
                  icon={<ExportOutlined />}
                  className={"text-gray-400"}
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-5 pt-5">
            <div className="bg-white w-full flex flex-col gap-y-5 border-l-4 border-solid border-blue-500 p-5 rounded-tr-lg rounded-br-lg">
              <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
              <span className="flex justify-between items-center">
                <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                <IconComponent
                  icon={<ExportOutlined />}
                  className={"text-gray-400"}
                />
              </span>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <Title
            level={2}
            fontSize={"text-black text-2xl"}
            fontWeightStrong={500}
            titleMarginBottom={10}
          >
            Tickets
          </Title>

          <div className="bg-white p-5 rounded-lg">
            <div className="flex justify-between items-center pt-2.5">
              <label className={"relative"}>
                <CustomInput
                  colorBorder={"#1890FF"}
                  placeholder={"Search"}
                  className={`w-[254px] h-[44px] pl-12 pr-4 text-sm shadow-lg`}
                />

                <span
                  className={
                    "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </label>

              <div className="flex gap-x-5 items-center">
                <CustomSelect
                  className={"w-[117px] h-[44px]"}
                  placeholder={"This Week"}
                  options={[
                    {
                      value: "mon",
                      label: "mon",
                    },
                    {
                      value: "Tue",
                      label: "Tue",
                    },
                  ]}
                />

                <ButtonComponent
                  defaultBg="#1890FF"
                  defaultHoverBg="#1890FF"
                  controlHeight={44}
                  borderRadius={4}
                  className={"w-[157px]"}
                >
                  New Ticket
                </ButtonComponent>
              </div>
            </div>

            <div>
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
                <Tabs defaultActiveKey="1" items={TabItem()} />
              </ConfigProvider>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};
