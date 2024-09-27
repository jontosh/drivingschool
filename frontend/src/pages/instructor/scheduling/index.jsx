import LinksIcon from "@/assets/icons/links.svg";
import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { LineCalendar } from "@/pages/instructor/scheduling/itesm/calendar.jsx";
import classNames from "classnames";
import { Fragment, useContext, useState, useCallback } from "react";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import { Helmet } from "react-helmet";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const Scheduling = () => {
  const { Months, MonthName } = useDate();
  const { colorsObject } = useContext(ColorsContext);
  const [SelectMonth, setSelectMonth] = useState(
    MonthName(new Date().getMonth()),
  );
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );
  const handleSelectMonth = (value) => setSelectMonth(value);

  console.log(SelectMonth);

  return (
    <Fragment>
      <Helmet>
        <title> Instructor - SCHEDULE LESSONS</title>
      </Helmet>
      <section
        className={classNames("px-3 sm:px-11 space-y-5 max-w-full w-full space-y-5")}
      >
        <div className="flex items-center justify-between">
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={26}
            className={"pl-1 sm:pl-7"}
          >
            SCHEDULE LESSONS
          </Title>

          <IconComponent
            icon={<IoSettingsOutline />}
            className={"border border-[#5F66E9] rounded-xl px-2.5 pt-2 pb-1"}
          />
        </div>

        <div className="bg-white rounded-xl px-7 py-5 space-y-5">
          <div className="flex justify-between items-center max-[900px]:flex-col max-[900px]:space-y-5">
            <Paragraph fontWeightStrong={600}>
              Month :{" "}
              {typeof SelectMonth === "string"
                ? SelectMonth
                : MonthName(SelectMonth)}
            </Paragraph>

            <div className="flex space-x-5">
              <CustomSelect
                onChange={handleSelectMonth}
                options={Months}
                value={SelectMonth}
                className={"w-[135px] h-[50px]"}
              />

              <ButtonComponent
                defaultBg={colorsObject.primary}
                defaultHoverBg={colorsObject.primary}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={26}
                controlHeight={47}
                className={"flex items-center"}
              >
                <PlusOutlined />
                Add event
              </ButtonComponent>
            </div>
          </div>

          <div className="flex gap-5 max-[1250px]:flex-col">
            <aside className={"space-y-5"}>
              <Calendar value={value} onChange={onChange} size={370} />

              <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
                <Title level={4} fontSize={"text-xl"}>
                  Quick links
                </Title>

                <div className={"grid min-[1350px]:grid-cols-2 items-center gap-2.5"}>
                  <Link to={"/#"}>
                    <ButtonComponent
                      defaultBg={colorsObject.primary}
                      defaultHoverBg={colorsObject.primary}
                      defaultColor={colorsObject.main}
                      defaultHoverColor={colorsObject.main}
                      borderRadius={10}
                      className={"w-full"}
                    >Learn about this page</ButtonComponent>
                  </Link>
                  <Link to={"/#"}>
                    <ButtonComponent
                      defaultBg={colorsObject.primary}
                      defaultHoverBg={colorsObject.primary}
                      defaultColor={colorsObject.main}
                      defaultHoverColor={colorsObject.main}
                      borderRadius={10}
                      paddingInline={10}
                      className={"w-full"}
                    >Give feedback</ButtonComponent>
                  </Link>
                  <Link to={"/#"}>
                    <ButtonComponent
                      defaultBg={colorsObject.primary}
                      defaultHoverBg={colorsObject.primary}
                      defaultColor={colorsObject.main}
                      defaultHoverColor={colorsObject.main}
                      borderRadius={10}
                      paddingInline={10}
                      className={"w-full"}
                    >Set Unavailability</ButtonComponent>
                  </Link>
                  <Link to={"/#"}>
                    <ButtonComponent
                      defaultBg={colorsObject.primary}
                      defaultHoverBg={colorsObject.primary}
                      defaultColor={colorsObject.main}
                      defaultHoverColor={colorsObject.main}
                      borderRadius={10}
                      paddingInline={10}
                      className={"w-full"}
                    >Settings</ButtonComponent>
                  </Link>
                  <Link to={"/#"}>
                    <ButtonComponent
                      defaultBg={colorsObject.primary}
                      defaultHoverBg={colorsObject.primary}
                      defaultColor={colorsObject.main}
                      defaultHoverColor={colorsObject.main}
                      borderRadius={10}
                      paddingInline={10}
                      className={"w-full"}
                    >Print</ButtonComponent>
                  </Link>
                </div>
              </div>
            </aside>

            <div className="flex-grow">
              <LineCalendar />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Scheduling;
