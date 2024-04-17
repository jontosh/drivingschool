import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect, CustomTransfer } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Space, Switch, Table, Transfer } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FiFileText } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { SlCloudDownload } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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

const mockData = [
  { key: "0", title: "Title 0", description: "Sample Description 0" },
  { key: "1", title: "Title 1", description: "Sample Description 1" },
  { key: "2", title: "Title 2", description: "Sample Description 2" },
  { key: "3", title: "Title 3", description: "Sample Description 3" },
  { key: "4", title: "Title 4", description: "Sample Description 4" },
  { key: "5", title: "Title 5", description: "Sample Description 5" },
  { key: "6", title: "Title 0", description: "Sample Description 0" },
  { key: "7", title: "Title 1", description: "Sample Description 1" },
  { key: "8", title: "Title 2", description: "Sample Description 2" },
  { key: "9", title: "Title 3", description: "Sample Description 3" },
  { key: "10", title: "Title 4", description: "Sample Description 4" },
  { key: "11", title: "Title 5", description: "Sample Description 5" },
]

const File = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const handleCategoryModal = () => setIsOpen((prev) => !prev);

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
                    onClick={handleCategoryModal}
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
                      },
                    ]}
                  />
                </div>
              </div>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
          <div className={"space-y-2.5"}>
            <div className="bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5">
              <div
                className={`flex justify-between items-center -mx-1.5 gap-1 ${FileStyle["Statistic__selects"]}`}
              >
                <IconComponent
                  vertical={"items-center"}
                  icon={<VscGraph />}
                  spaceIconX={2.5}
                  iconWidth={"w-6"}
                  className={
                    "text-base inline-flex items-center font-medium cursor-default"
                  }
                >
                  Usage: Current month
                </IconComponent>
                <div className={`flex gap-2.5`}>
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    // style={{ width: 110 }}
                    placeholder={"Month"}
                    options={months}
                  />
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    // style={{ width: 110 }}
                    placeholder={"Year"}
                    options={YearsOptions()}
                  />
                  <CustomSelect
                    colorBorder={colorsObject.primary}
                    // style={{ width: 110 }}
                    placeholder={"Display"}
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
                    },
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

      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div
            className={classNames(
              FileStyle["Modal__content-category"],
              "bg-white py-7 px-12 w-full rounded-2xl overflow-scroll m-2.5",
            )}
          >
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={46}
            >
              Add new file category
            </Title>

            <form className="flex gap-5 flex-col">
              <CustomInput
                className={"border-indigo-700 border"}
                classNames={
                  "inline-flex justify-center items-center flex-row-reverse gap-5"
                }
                spanText={"Category name"}
                spanClassName={"font-semibold flex-shrink-0"}
                fontSize={"text-base"}
                placeholder={"Category name"}
              />

              <label
                className={"inline-flex justify-center items-center gap-5"}
              >
                <span
                  className={
                    "font-semibold text-end w-32 flex-shrink-0 text-base"
                  }
                >
                  File status
                </span>

                <CustomSelect
                  placeholder={"Select"}
                  style={{ width: "100%" }}
                  colorBorder={colorsObject.primary}
                  options={[
                    {
                      value: "active",
                      label: "active",
                    },
                  ]}
                />
              </label>

              <label
                className={"inline-flex justify-center items-center gap-5"}
              >
                <span
                  className={
                    "font-semibold text-end w-32 flex-shrink-0 text-base"
                  }
                >
                  Packages:
                </span>

                <CustomTransfer
                  dataSource={mockData}
                  titles={["Source", "Target"]}
                  colorBorder={colorsObject.primary}
                  colorBgContainer={"transparent"}
                  headerHeight={30}
                  listHeight={200}
                />
              </label>

              <label
                className={"inline-flex justify-center items-center gap-5"}
              >
                <span
                  className={
                    "font-semibold text-end w-52 flex-shrink-0 text-base"
                  }
                >
                  Signature link:
                </span>

                <textarea
                  className={
                    "border outline-0 border-indigo-700 p-5 rounded-2xl w-full"
                  }
                  placeholder={"text"}
                ></textarea>
              </label>

              <label
                className={"inline-flex justify-center items-center gap-5"}
              >
                <span
                  className={
                    "font-semibold text-end w-52 flex-shrink-0 text-base"
                  }
                >
                  Note:
                </span>

                <textarea
                  className={
                    "border outline-0 border-indigo-700 p-5 rounded-2xl w-full"
                  }
                  placeholder={"text"}
                ></textarea>
              </label>

              <div className={"grid grid-cols-2 gap-y-5 pt-8"}>
                <label
                  className={"inline-flex justify-center items-center gap-8"}
                >
                  <span
                    className={
                      "font-semibold text-end w-52 flex-shrink-0 text-base"
                    }
                  >
                    Display on Student Portal:
                  </span>
                  <Switch
                    style={{
                      width: 50,
                    }}
                  />
                </label>

                <label
                  className={"inline-flex justify-center items-center gap-8"}
                >
                  <span
                    className={
                      "font-semibold text-end w-52 flex-shrink-0 text-base"
                    }
                  >
                    Must Be Uploaded to Student
                    Account:
                  </span>
                  <Switch
                    style={{
                      width: 50,
                    }}
                  />
                </label>

                <label
                  className={"inline-flex justify-center items-center gap-8"}
                >
                  <span
                    className={
                      "font-semibold text-end w-52 flex-shrink-0 text-base"
                    }
                  >
                    Disallow files associated
                    with category from displaying
                    on Student Portal:
                  </span>
                  <Switch
                    style={{
                      width: 50,
                    }}
                  />
                </label>

                <label
                  className={"inline-flex justify-center items-center gap-8"}
                >
                  <span
                    className={
                      "font-semibold text-end w-52 flex-shrink-0 text-base"
                    }
                  >
                    Disallow files associated with
                    this category  from displaying
                    on Instructor/Teacher Portal:
                  </span>
                  <Switch
                    style={{
                      width: 50,
                    }}
                  />
                </label>
              </div>

              <div className={"text-center space-x-5"}>
                <ButtonComponent
                  defaultBg={colorsObject.secondary}
                  defaultHoverBg={colorsObject.secondary}
                  controlHeight={40}
                  borderRadius={5}
                  paddingInline={62}
                  onClick={handleCategoryModal}
                >
                  Close
                </ButtonComponent>
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  controlHeight={40}
                  borderRadius={5}
                  paddingInline={62}
                >
                  Save
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default File;
