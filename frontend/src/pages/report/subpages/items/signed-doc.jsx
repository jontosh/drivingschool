import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const SignedDoc = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [StudentLastName, setStudentLastName] = useState("");
  const [DocumentName, setDocumentName] = useState("");
  const [Review, setReview] = useState(false);

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleStudentLastName = (value) => setStudentLastName(value);
  const handleDocumentName = (value) => setDocumentName(value);
  const handleReview = (e) => setReview(e.target.checked);
  const handleFilter = () => {
    console.log({ StartDate, EndDate, StudentLastName, DocumentName, Review });
  };

  return (
    <Fragment>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={"grid grid-cols-2 gap-x-20 gap-y-5"}>
          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal text-gray-800 w-full"}>
              Select Date Range
            </span>

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
            <span className={"text-base font-normal text-gray-800 w-full"}>
              CR Date End:
            </span>

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
            <span className={"text-gray-500 w-full text-base font-normal"}>
              OR:
            </span>
            <div className="flex items-center">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"Student Last Name"}
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
                onChange={handleStudentLastName}
                value={StudentLastName ? StudentLastName : undefined}
              />
              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              Document Name:
            </span>
            <div className="flex items-center">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"Enter Document Name"}
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
                onChange={handleDocumentName}
                value={DocumentName ? DocumentName : undefined}
              />
              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <CustomCheckBox onChange={handleReview} checked={Review}>
            Reviewed Documents only
          </CustomCheckBox>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            type={"submit"}
            onClick={handleFilter}
          >
            FILTER STUDENT
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
              setStartDate(null);
              setEndDate(null);
              setStudentLastName("");
              setDocumentName("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
