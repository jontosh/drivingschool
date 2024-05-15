import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const ClassroomSessionDetails = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Type, setType] = useState("");
  const [Instructor, setInstructor] = useState("");
  const [Start, setStart] = useState("");
  const [Location, setLocation] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleType = (value) => setType(value);
  const handleInstructor = (value) => setInstructor(value);
  const handleStart = (value) => setStart(value);
  const handleLocation = (value) => setLocation(value);
  const handleSubmit = () => {
    console.log({ Start, StartDate, EndDate, Type, Instructor, Location });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Classroom Information Details
      </Paragraph>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={"bg-white rounded-lg px-10 py-7 space-y-7"}
      >
        <div className=" grid grid-cols-2 gap-x-7 gap-y-5">
          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full"}>Start Date</span>
            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#667085] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleStartDate}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full"}>End Date</span>

            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#667085] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleEndDate}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Type:</span>
            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"Type Selection"}
                className={"h-[50px]"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                  {
                    value: 2,
                    label: 2,
                  },
                ]}
                onChange={handleType}
                value={Type ? Type : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Instructor:</span>

            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"Instructor Selection"}
              className={"h-[50px]"}
              options={[
                {
                  value: 1,
                  label: 1,
                },
                {
                  value: 2,
                  label: 2,
                },
              ]}
              onChange={handleInstructor}
              value={Instructor ? Instructor : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Start Date</span>
            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"Instructor Selection"}
                className={"h-[50px]"}
                options={[
                  {
                    value: 1,
                    label: 1,
                  },
                  {
                    value: 2,
                    label: 2,
                  },
                ]}
                onChange={handleStart}
                value={Start ? Start : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Location</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"Instructor Selection"}
              className={"h-[50px]"}
              options={[
                {
                  value: 1,
                  label: 1,
                },
                {
                  value: 2,
                  label: 2,
                },
              ]}
              onChange={handleLocation}
              value={Location ? Location : undefined}
            />
          </label>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            type={"submit"}
            onClick={handleSubmit}
          >
            Download
          </ButtonComponent>
          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.secondary}
            defaultBg={colorsObject.secondary}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            onClick={() => {
              setStart("");
              setEndDate("");
              setStartDate("");
              setType("");
              setInstructor("");
              setLocation("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
