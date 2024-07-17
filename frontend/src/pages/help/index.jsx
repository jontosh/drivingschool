import ButtonComponent from "@/components/button";
import { CustomInput, CustomSelect } from "@/components/form";
import IconComponent from "@/components/icons";
import Title, { Paragraph } from "@/components/title";
import { ExportOutlined, PhoneFilled } from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import { Fragment, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TabItem from "./items/help-content";
import ColorsContext from "@/context/colors.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TfiEmail } from "react-icons/tfi";
import { MdEmail } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";

export const Help = () => {
  const { colorsObject } = useContext(ColorsContext);

  const newsItems = [
    { title: 'Ideas upvote clickable on main board, just inside ideas', id: 1, date: '25.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Ideas upvote clickable on main board, just inside ideas', id: 2, date: '26.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Ideas upvote clickable on main board, just inside ideas', id: 3, date: '26.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  ];
  return (
    <Fragment>
      <Helmet>
        <title>Help</title>
      </Helmet>
      <div className="px-3 sm:px-11">
        <Title
          level={2}
          fontSize={"text-black text-2xl"}
          fontWeightStrong={500}
          titleMarginBottom={40}
        >
          Customer Support
        </Title>

        <header className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10">
          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full mx-auto -mt-[28px]">
              <MdEmail className="text-white w-[25px] h-[25px] m-auto mt-3.5" />
            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
            >Email</Title>
            <Paragraph className="text-gray-400 text-lg">example@mail.com</Paragraph>
          </div>

          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full mx-auto -mt-[28px]">
              <PhoneFilled className="text-white w-[25px] h-[25px] m-auto mt-3.5" />
            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
            >Phone</Title>
            <Paragraph className="text-gray-400 text-lg">+998883715271</Paragraph>
          </div>
          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full mx-auto -mt-[28px]">
              <GoClock className="text-white w-[25px] h-[25px] m-auto mt-3.5" />
            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
            >Support hours</Title>
            <Paragraph className="text-gray-400 text-lg">08:00 - 18:00</Paragraph>
          </div>

          <div className="bg-white flex flex-col gap-y-2 text-center pl-6 pr-6 pb-4 rounded-lg">
            <div className="w-14 h-14 bg-blue-500 rounded-full mx-auto -mt-[28px]">
              <FaRegCalendarAlt className="text-white w-[25px] h-[25px] m-auto mt-3.5" />
            </div>
            <Title
              fontWeightStrong={500}
              fontSize={"text-xl"}
              level={3}
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

            <Link to="/admin/support/news">
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
            {newsItems.map((item) => (
              <Link key={item.id} to={`ticket/${item.title}/${item.id}`}>
                <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg border-l-4 border-l-transparent hover:border-l-blue-500">
                  <div className="flex max-md:flex-col gap-2.5 justify-between items-center">
                    <Paragraph className="font-semibold text-lg">
                      {item.title.replace('-', ' ').toUpperCase()}
                    </Paragraph>
                    <div className="flex items-center gap-x-10">
                      <span className="text-gray-400 text-xs">DATE:</span>
                      <span className="text-lg font-normal">{item.date}</span>
                    </div>
                  </div>
                  <span className="flex max-md:flex-col justify-between items-center max-md:items-end">
                    <Paragraph className="font-normal text-sm text-gray-400">
                      {item.description}
                    </Paragraph>
                    <IconComponent icon={<ExportOutlined />} className="text-gray-400 max-md:text-right" />
                  </span>
                </div>
              </Link>
            ))}
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
            <div className="flex max-md:flex-col max-md:gap-y-3 justify-between items-center max-md:items-start pt-2.5">
              <label className={"relative max-md:w-full"}>
                <CustomInput
                  colorBorder={"#E7E7E7"}
                  placeholder={"Search for ticket"}
                  className={`md:w-[254px] pl-10 pr-4 py-2.5 h-[50] text-sm inline-flex flex-row-reverse`}
                  classNames="w-full"
                />
                <span
                  className={
                    "absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 "
                  }
                >
                  <AiOutlineSearch />
                </span>
              </label>

              <div className="flex gap-x-5 items-center">
                <CustomSelect
                  className={"w-[117px] h-[44px]"}
                  placeholder={"This Week"}
                  colorBorder={"#E7E7E7"}
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

                <Link to="/admin/support/new-ticket">
                  <ButtonComponent
                    defaultBg="#1890FF"
                    defaultHoverBg="#1890FF"
                    controlHeight={44}
                    borderRadius={4}
                    className={"w-[157px]"}
                  >
                    New Ticket
                  </ButtonComponent>
                </Link>
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
