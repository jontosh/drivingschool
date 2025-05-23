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
import { RecentItem } from "@/pages/managment/file/items/file-item.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FiFileText } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { SlCloudDownload } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
import "react-circular-progressbar/dist/styles.css";
import FileStyle from "../management.module.scss";
import { FiDownload } from "react-icons/fi";

const File = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = FileCategoryModule();
  const { Months, YearsOptions } = useDate();
  const [Filter, setFilter] = useState("");
  const handleFilter = (value) => setFilter(value);
  const { Data } = useFilterStatus({ data, status: Filter, search: "" });
  const { data: RecentActivities, isLoading: IsRecentActivities } =
    useRequestGetQuery({ path: "/student_account/files" });

  const recentItem = RecentActivities?.slice(RecentActivities?.length - 6)?.map(
    (item, index) => (
      <Fragment key={index}>
        <RecentItem {...item} />
      </Fragment>
    ),
  );

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
        <div className="grid min-[1360px]:grid-cols-2 gap-4">
          <div className={"space-y-4"}>
            <div className="bg-white rounded-3xl py-6 pl-5 pr-8 shadow-lg space-y-4">
              <IconComponent
                classNames={"items-center"}
                icon={<FiFileText />}
                spaceIconX={2.5}
                iconWidth={"w-7"}
                className={"text-base font-medium cursor-default"}
              >
                File upload
              </IconComponent>

              <div className="space-y-4">
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

              <div className="space-y-4">
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

            <div className="bg-white rounded-3xl py-6 pl-5 pr-8 shadow-lg space-y-4">
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

                <div className="space-x-2.5">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FiFileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Driver's license</h3>
                      <p className="text-sm text-gray-500">PDF • 2.5 MB</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiDownload className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <FiFileText className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Medical certificate</h3>
                      <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiDownload className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <TableComponent columns={columns} data={Data} />
            </div>
          </div>
          <div className={"space-y-4"}>
            <div className="bg-white rounded-3xl py-6 pl-5 pr-8 shadow-lg space-y-4">
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

              <div className="grid grid-cols-3 items-center gap-4 py-4">
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
                "bg-white rounded-3xl py-6 pl-5 pr-8 shadow-lg space-y-4"
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
                      value: "Download",
                      label: "Download",
                    },
                  ]}
                />
              </div>

              <div className="space-y-4 pb-4">
                {IsRecentActivities ? "Loading..." : recentItem}
              </div>

              <div className="text-end">
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultHoverBg={colorsObject.main}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.primary}
                  defaultBorderColor={colorsObject.primary}
                  paddingInline={20}
                  borderRadius={5}
                  disabled={IsRecentActivities}
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
