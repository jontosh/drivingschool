import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { FileCategoryModule } from "@/modules/file-category.jsx";
import { FileChart } from "@/pages/managment/file/items/chart.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FiFileText } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { SlCloudDownload } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
import "react-circular-progressbar/dist/styles.css";
import FileStyle from "../management.module.scss";

const File = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = FileCategoryModule();
  const { Months, YearsOptions } = useDate();
  const [Filter, setFilter] = useState("");
  const handleFilter = (value) => setFilter(value);
  const { Data } = useFilterStatus({ data, status: Filter, search: "" });

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
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.infoHover}
                    paddingInline={72}
                    borderRadius={5}
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
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.infoHover}
                    paddingInline={72}
                    borderRadius={5}
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
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.infoHover}
                    paddingInline={72}
                    borderRadius={5}
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
                    defaultBg={colorsObject.success}
                    defaultHoverBg={colorsObject.successHover}
                    paddingInline={27}
                    borderRadius={5}
                    href={"/admin/modals/management-file/new-category"}
                    className={"inline-flex items-center"}
                  >
                    new category
                  </ButtonComponent>
                  <CustomSelect
                    colorBorder={colorsObject.info}
                    style={{ width: 128 }}
                    selectorBg={colorsObject.info}
                    className={`h-[40px] ${FileStyle["File__select"]}`}
                    placeholder={"Filter by"}
                    options={StatusSelect}
                    onChange={handleFilter}
                  />
                </div>
              </div>
              <TableComponent columns={columns} data={Data} />
            </div>
          </div>
          <div className={"space-y-2.5"}>
            <div className="bg-white rounded-3xl py-3 pl-5 pr-8 shadow-lg space-y-2.5">
              <div
                className={`flex justify-between items-center -mx-1.5 gap-1`}
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
                <div className={`flex gap-2`}>
                  <CustomSelect
                    placeholder={"Month"}
                    options={Months}
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    placeholder={"Year"}
                    options={YearsOptions()}
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    placeholder={"Display"}
                    className={"h-[50px]"}
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

              <div className="grid grid-cols-3 items-center">
                <div className="">
                  <FileChart
                    colors={[colorsObject.secondary, colorsObject.success]}
                    labels={["Storage", "Storage"]}
                  />

                  <Paragraph
                    className={
                      "-mt-10 relative z-10 text-center text-base font-normal bg-white py-3"
                    }
                  >
                    Storage
                  </Paragraph>
                </div>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  borderRadius={5}
                >
                  Show more
                </ButtonComponent>

                <div>
                  <FileChart
                    colors={[colorsObject.secondary, colorsObject.danger]}
                    labels={["Upload download", "Upload download"]}
                  />

                  <Paragraph
                    className={
                      "-mt-10 relative z-10 text-center text-base font-normal bg-white py-3"
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
                  style={{ width: 128 }}
                  selectorBg={colorsObject.info}
                  className={`h-[40px] ${FileStyle["File__select"]}`}
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
                  //
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
