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
        className={classNames("px-11 space-y-5 max-w-full w-full space-y-5")}
      >
        <div className="flex items-center justify-between">
          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={26}
            className={"pl-7"}
          >
            SCHEDULE LESSONS
          </Title>

          <IconComponent icon={<IoSettingsOutline />} />
        </div>

        <div className="bg-white rounded-xl px-7 py-5 space-y-5">
          <div className="flex justify-between items-center">
            <Paragraph>
              Month :{" "}
              {typeof SelectMonth === "string"
                ? SelectMonth
                : MonthName(SelectMonth)}
            </Paragraph>

            <div className="space-x-5">
              <CustomSelect
                onChange={handleSelectMonth}
                options={Months}
                value={SelectMonth}
                className={"w-[135px] h-[50px]"}
              />

              <ButtonComponent
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                defaultBorderColor={colorsObject.black}
              >
                Add event
              </ButtonComponent>
            </div>
          </div>

          <div className="flex gap-5">
            <aside className={"space-y-5"}>
              <Calendar value={value} onChange={onChange} size={370} />

              <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
                <Title level={4} fontSize={"text-xl"}>
                  Quick links
                </Title>

                <div className={"space-y-5"}>
                  <Link
                    to={"/#"}
                    className={
                      "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                    }
                  >
                    Take attendance
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
