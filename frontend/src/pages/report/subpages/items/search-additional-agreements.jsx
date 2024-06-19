import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const SearchAdditionalAgreements = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState(null);
  const [StaffLastName, setStaffLastName] = useState("");
  const [ClassroomList, setClassroomList] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleStaffLastName = (e) => setStaffLastName(e.target.value);
  const handleClassroomList = (e) => setClassroomList(e.target.value);
  const handleSearch = () => {
    console.log({ StartDate, StaffLastName, ClassroomList });
  };

  return (
    <Fragment>
      <form className=" space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className={"space-y-1.5 w-full"}>
          <span className={"text-base font-normal text-gray-500 w-full"}>
            Select Date Range
          </span>

          <div className="flex items-center gap-3">
            <DatePicker
              className="w-full max-w-[375px] border border-[#DEE2E6] h-[50px]"
              placeholder={"DD/MM/YYYY"}
              onChange={handleStartDate}
            />

            <span>
              <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
            </span>
          </div>
        </label>

        <CustomInput
          colorBorder={"#DEE2E6"}
          spanText={"Classroom List"}
          spanClassName={"font-normal text-gray-500"}
          fontSize="text-base"
          placeholder={"Enter CR#"}
          className={"h-[50px]"}
          classNames={"inline-flex w-full max-w-[375px] flex-col-reverse gap-1.5 h-[76px]"}
          value={ClassroomList}
          onChange={handleClassroomList}
        />

        <div className={"flex gap-3"}>
          <CustomInput
            colorBorder={"#DEE2E6"}
            spanText={"Staff Name:"}
            spanClassName={"font-normal text-gray-500"}
            fontSize="text-base"
            placeholder={"Enter Staff Last Name"}
            className={"h-[50px]"}
            classNames={"inline-flex w-full max-w-[375px] flex-col-reverse gap-1.5 h-[76px]"}
            value={StaffLastName}
            onChange={handleStaffLastName}
          />
          <span className={"pb-2 pt-[41px]"}>
            <FiHelpCircle className={"text-xl text-[#98A2B3] cursor-pointer"} />
          </span>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            type={"submit"}
            onClick={handleSearch}
          >
            SEARCH
          </ButtonComponent>
          <ButtonComponent
            type={"reset"}
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.secondary}
            defaultBg={colorsObject.secondary}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            onClick={() => {
              setStartDate(null);
              setStaffLastName("");
              setClassroomList("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
