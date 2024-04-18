import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Badge, Button, Calendar, ConfigProvider } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event......",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
export const BigCalendar = ({ handleBurger }) => {
  const Time = new Date();
  const [MonthName, setMonthName] = useState("");
  const { colorsObject } = useContext(ColorsContext);

  const months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });

  useEffect(() => {
    months.map((month, index) => {
      if (index === Time.getMonth()) {
        setMonthName(month.value);
      }
    });
  }, [MonthName]);
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <ConfigProvider>
      <Calendar
        className={"border-b border-b-gray-300"}
        headerRender={() => {
          return (
            <Fragment>
              <div className="p-4 flex justify-between items-center border-b border-b-gray-300">
                <div className={"flex items-center gap-4"}>
                  <IconComponent
                    className={"flex-shrink-0 text-3xl"}
                    icon={<FaBars />}
                    onClick={handleBurger}
                  />

                  <Title level={2} fontSize={"text-3xl"}>
                    <span>{MonthName}</span> &nbsp;
                    <span className={"font-normal"}> {Time.getFullYear()}</span>
                  </Title>

                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    placeholder={"Months"}
                    colorText={colorsObject.primary}
                    options={months}
                  />
                </div>

                <div className={"gap-x-4 inline-flex items-center"}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultBg: "#F5F5F5",
                          defaultHoverBg: "#F5F5F5",
                        },
                      },
                    }}
                  >
                    <Button shape={"circle"} icon={<AiOutlineSearch />} />
                  </ConfigProvider>

                  <ButtonComponent
                    defaultBg={"#0C41FF"}
                    defaultHoverBg={"#0C41FF"}
                    borderRadius={5}
                    paddingInline={8}
                    controlHeight={30}
                  >
                    <div
                      className={"inline-flex gap-x-4 text-white items-center"}
                    >
                      <Text
                        fontWeightStrong={500}
                        fontSize={12}
                        className={"text-white"}
                      >
                        Add event
                      </Text>
                      &nbsp;
                      <BsPlusCircleFill className={"w-4"} />
                    </div>
                  </ButtonComponent>
                </div>
              </div>
            </Fragment>
          );
        }}
        cellRender={cellRender}
      />
    </ConfigProvider>
  );
};
