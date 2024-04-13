import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Space, Table } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { FiFileText } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { SlCloudDownload } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import { VscGraph } from "react-icons/vsc";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { WiCloudDown } from "react-icons/wi";
import FileStyle from "../management.module.scss";
import { FormOutlined } from "@ant-design/icons";

const CheckProgress = (status = "") => {
  const { colorsObject } = useContext(ColorsContext);
  switch (status.toLowerCase()) {
    case "active":
      return "#24C18F";
    case "process":
      return colorsObject.orange;
    case "close":
      return colorsObject.danger;
    default:
      return colorsObject.main;
  }
};
const File = () => {
  const { colorsObject } = useContext(ColorsContext);
  const columns = [
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "File status",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        return (
          <Space size={"middle"}>
            <ButtonComponent
              defaultBg={CheckProgress(text)}
              defaultHoverBg={CheckProgress(text)}
              controlHeight={26}
              style={{ width: 81 }}
              borderRadius={10}
            >
              {text.toLowerCase()}
            </ButtonComponent>
          </Space>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
      align: "center",
      render: () => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
            />
          </div>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      dataIndex: "delete",
      align: "center",
      render: () => {
        return (
          <div className={"text-center"}>
            <IconComponent className={"w-7"} icon={<Icons type={"cross"} />} />
          </div>
        );
      },
    },
  ];

  const data = [
    {
      category: "Student contract",
      status: "active",
    },
    {
      category: "Student contract",
      status: "process",
    },
    {
      category: "Student contract",
      status: "close",
    },
  ];

  const months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });

  const YearsOptions = () => {
    let currentYear = new Date().getFullYear(),
      years = [];
    let startYear = 1999;
    while (startYear <= currentYear) {
      years.push({ value: startYear++, label: startYear++ });
    }
    return years;
  };

  return (
    <Fragment>
      <Helmet>
        <title>File management</title>
      </Helmet>
      <section>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          File management
        </Title>
        <div className="grid grid-cols-2 gap-2">
          <div className={"space-y-5"}>
            <div className="bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5">
              <IconComponent
                classNames={"items-center"}
                icon={<FiFileText />}
                spaceIconX={2.5}
                iconWidth={"w-7"}
                className={"text-base font-medium cursor-default"}
              >
                File upload
              </IconComponent>

              <div className="space-y-2 5">
                <div className="flex gap-3.5 items-center justify-between">
                  <ButtonComponent
                    defaultBg={"#1890FF"}
                    defaultHoverBg={"#1890FF"}
                    paddingInline={72}
                    controlHeight={40}
                    borderRadius={10}
                  >
                    Show more
                  </ButtonComponent>

                  <Paragraph className={"flex-grow"} fontSize={"text-sm"}>
                    Upload files to specific students. You can select one or
                    more student and upload files.
                  </Paragraph>
                </div>

                <div className="flex gap-3.5 items-center justify-between">
                  <ButtonComponent
                    defaultBg={"#1890FF"}
                    defaultHoverBg={"#1890FF"}
                    paddingInline={72}
                    controlHeight={40}
                    borderRadius={10}
                  >
                    Show more
                  </ButtonComponent>

                  <Paragraph className={"flex-grow"} fontSize={"text-sm"}>
                    Upload files for students enrolled in specific class.
                  </Paragraph>
                </div>
              </div>

              <div className="space-y-2 5">
                <div className="flex gap-3.5 items-center justify-between">
                  <ButtonComponent
                    defaultBg={"#1890FF"}
                    defaultHoverBg={"#1890FF"}
                    paddingInline={72}
                    controlHeight={40}
                    borderRadius={10}
                  >
                    Show more
                  </ButtonComponent>

                  <Paragraph className={"flex-grow"} fontSize={"text-sm"}>
                    Upload files for students enrolled in specific class
                    session.
                  </Paragraph>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between mb-3">
                <IconComponent
                  classNames={"items-center"}
                  icon={<FiFileText />}
                  spaceIconX={2.5}
                  iconWidth={"w-7"}
                  className={"text-base font-medium cursor-default"}
                >
                  File category
                </IconComponent>

                <div className="space-x-2 5">
                  <ButtonComponent
                    defaultBg={"#24C18F"}
                    defaultHoverBg={"#24C18F"}
                    paddingInline={27}
                    controlHeight={26}
                    borderRadius={5}
                  >
                    new category
                  </ButtonComponent>
                  <CustomSelect
                    colorBorder={colorsObject.info}
                    style={{ width: 128, height: 26 }}
                    selectorBg={colorsObject.info}
                    className={`${FileStyle["File__select"]}`}
                    value={"Filter by"}
                    options={[
                      {
                        value: "Active",
                        label: "Active",
                      },
                      {
                        value: "Deleted",
                        label: "Deleted",
                      },
                      {
                        value: "Inactive",
                        label: "Inactive",
                      }
                    ]}
                  />
                </div>
              </div>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
          <div className={"space-y-2.5"}>
            <div className="bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5">
              <div className={`flex justify-between items-start ${FileStyle["Statistic__selects"]}`}>
                <IconComponent
                  classNames={"items-center"}
                  icon={<VscGraph />}
                  spaceIconX={2.5}
                  iconWidth={"w-7"}
                  className={"text-base font-medium cursor-default"}
                >
                  Usage: Current month
                </IconComponent>
                <div className={`flex gap-2.5`}>
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    style={{ width: 110 }}
                    value={"Month"}
                    options={months}
                  />
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    style={{ width: 110 }}
                    value={"Year"}
                    options={YearsOptions()}
                  />
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    style={{ width: 110 }}
                    value={"Display"}
                    options={[
                      {
                        value: "None",
                        label: "None",
                      },
                      {
                        value: "Display",
                        label: "Display",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="flex items-center justify-evenly">
                <div className="w-36 ">
                  <div
                    className={`mb-2 relative ${FileStyle["Statistic__graph"]}`}
                  >
                    <CircularProgressbar
                      value={0.33}
                      maxValue={1}
                      text={`${0.33 * 100}%`}
                      strokeWidth={20}
                      circleRatio={-1}
                      styles={{
                        text: {
                          fill: colorsObject.black,
                        },
                        path: {
                          stroke: "#24C18F",
                        },
                      }}
                    />
                  </div>

                  <Paragraph
                    className={
                      "-mt-9 relative z-10 text-center text-base font-normal"
                    }
                  >
                    Storage
                  </Paragraph>
                </div>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  paddingInline={15}
                  controlHeight={31}
                  borderRadius={10}
                >
                  Show more
                </ButtonComponent>

                <div className="w-36 ">
                  <div
                    className={`mb-2 relative ${FileStyle["Statistic__graph"]}`}
                  >
                    <CircularProgressbar
                      value={0.33}
                      maxValue={1}
                      text={`${0.33 * 100}%`}
                      strokeWidth={20}
                      circleRatio={-1}
                      styles={{
                        text: {
                          fill: colorsObject.black,
                        },
                        path: {
                          stroke: colorsObject.danger,
                        },
                      }}
                    />
                  </div>

                  <Paragraph
                    className={
                      "-mt-9 relative z-10 text-center text-base font-normal"
                    }
                  >
                    Upload download
                  </Paragraph>
                </div>
              </div>
            </div>

            <div
              className={
                "bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5"
              }
            >
              <div className="flex justify-between gap-x-2.5">
                <IconComponent
                  classNames={"items-center"}
                  icon={<LuBellRing />}
                  spaceIconX={2.5}
                  iconWidth={"w-7"}
                  className={"text-base font-medium cursor-default"}
                >
                  Recent activities
                </IconComponent>

                <CustomSelect
                  colorBorder={colorsObject.info}
                  style={{ width: 128, height: 26 }}
                  selectorBg={colorsObject.info}
                  className={`${FileStyle["File__select"]}`}
                  value={"Filter by"}
                  options={[
                    {
                      value: "Show All",
                      label: "Active",
                    },
                    {
                      value: "Upload",
                      label: "Upload",
                    },
                    {
                      value: "Dowload",
                      label: "Dowload",
                    }
                  ]}
                />
              </div>

              <div className="space-y-2.5 pb-2.5">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-x-5">
                    <button
                      className={
                        "border-2 border-indigo-700 rounded p-1 text-black"
                      }
                    >
                      <SlCloudDownload />
                    </button>

                    <Paragraph className={"text-gray-600"}>
                      File upload
                    </Paragraph>
                  </div>

                  <Paragraph className={"text-gray-500"} fontSize={"text-sm"}>
                    2hr ago
                  </Paragraph>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-5">
                    <button
                      className={
                        "border-2 border-indigo-700 rounded p-1 text-black"
                      }
                    >
                      <SlCloudDownload />
                    </button>

                    <Paragraph className={"text-gray-600"}>
                      File upload
                    </Paragraph>
                  </div>

                  <Paragraph className={"text-gray-500"} fontSize={"text-sm"}>
                    2hr ago
                  </Paragraph>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-5">
                    <button
                      className={
                        "border-2 border-indigo-700 rounded p-1 text-black"
                      }
                    >
                      <SlCloudDownload />
                    </button>

                    <Paragraph className={"text-gray-600"}>
                      File upload
                    </Paragraph>
                  </div>

                  <Paragraph className={"text-gray-500"} fontSize={"text-sm"}>
                    2hr ago
                  </Paragraph>
                </div>
              </div>

              <div className="text-end">
                <ButtonComponent
                  controlHeight={26}
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.primary}
                  defaultBorderColor={colorsObject.primary}
                  paddingInline={20}
                  borderRadius={5}
                >
                  See all Activity
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default File;
