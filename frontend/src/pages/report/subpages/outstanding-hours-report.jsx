import ButtonComponent from "@/components/button/index.jsx";
import { CustomRadio, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormError } from "@/modules/errors.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useMemo, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const OutstandingHoursReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [WheelProduct, setWheelProduct] = useState("");
  const [ClassroomProduct, setClassroomProduct] = useState("");
  const [Location, setLocation] = useState("");
  const [StaffAssigned, setStaffAssigned] = useState("");
  const [Selections, setSelections] = useState(false);

  const selects = [WheelProduct, ClassroomProduct, StartDate];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [WheelProduct, ClassroomProduct, StartDate]);

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleWheelProduct = (value) => setWheelProduct(value);
  const handleClassroomProduct = (value) => setClassroomProduct(value);
  const handleLocation = (value) => setLocation(value);
  const handleStaffAssigned = (value) => setStaffAssigned(value);
  const handleSubmit = (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      console.log({
        ...values,
        wheel_product: WheelProduct,
        classroom_product: ClassroomProduct,
        location: Location,
        staff_assigned: StaffAssigned,
        start_date: StartDate,
      });
    }
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Outstanding Hours Report
      </Paragraph>
      <Formik
        initialValues={{
          by_date: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <form
            className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between">
              <Paragraph fontSize={"text-xl font-semibold text-gray-500"}>
                Filter Students By Date (Select one):
              </Paragraph>

              <CustomRadio
                name={"by_date"}
                onChange={handleChange}
                value={"Date Activated"}
                classNames={"text-gray-500"}
              >
                Date Activated
              </CustomRadio>

              <CustomRadio
                name={"by_date"}
                onChange={handleChange}
                value={"Classroom Start Date"}
                classNames={"text-gray-500"}
              >
                Classroom Start Date
              </CustomRadio>
            </div>

            <div className={"grid grid-cols-2 gap-x-7 gap-y-5"}>
              <label className={"space-y-1.5"}>
                <span className={`text-base font-normal w-full text-gray-500`}>
                  Start Date *
                </span>

                <div className="flex items-center gap-3">
                  <DatePicker
                    className="w-full border border-[#DEE2E6] h-[50px]"
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleStartDate}
                  />

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>
              </label>

              <label className="space-y-1.5">
                <span className={"text-base font-normal w-full text-gray-500"}>
                  Behind the Wheel Products *
                </span>

                <div className={"w-full"}>
                  <CustomSelect
                    onChange={handleWheelProduct}
                    placeholder={"SELECT BTW PRODUCTS"}
                    fontSize={14}
                    options={[
                      {
                        value: "Admin",
                        label: "Admin",
                      },
                      {
                        value: "Admin 2",
                        label: "Admin 2",
                      },
                    ]}
                    className={`h-[50px] w-full rounded`}
                    colorBorder={"#DEE2E6"}
                    value={WheelProduct ? WheelProduct : undefined}
                  />

                  {Selections && (
                    <FormError>Behind the Wheel Products </FormError>
                  )}
                </div>
              </label>

              <label className="space-y-1.5">
                <span className={"text-base font-normal w-full text-gray-500"}>Classroom Products *</span>

                <div className={"w-full"}>
                  <CustomSelect
                    onChange={handleClassroomProduct}
                    placeholder={"SELECT OR PRODUCTS"}
                    fontSize={14}
                    options={[
                      {
                        value: "Admin",
                        label: "Admin",
                      },
                      {
                        value: "Admin 2",
                        label: "Admin 2",
                      },
                    ]}
                    className={`h-[50px] w-full rounded`}
                    colorBorder={"#DEE2E6"}
                    value={ClassroomProduct ? ClassroomProduct : undefined}
                  />

                  {Selections && <FormError>Classroom Products</FormError>}
                </div>
              </label>

              <label className="space-y-1.5">
                <span className={"text-base font-normal w-full text-gray-500"}>Location Assigned</span>

                <CustomSelect
                  onChange={handleLocation}
                  placeholder={"SELECT LOCATION"}
                  fontSize={14}
                  options={[
                    {
                      value: "Admin",
                      label: "Admin",
                    },
                    {
                      value: "Admin 2",
                      label: "Admin 2",
                    },
                  ]}
                  className={`h-[50px] w-full rounded`}
                  colorBorder={"#DEE2E6"}
                  value={Location ? Location : undefined}
                />
              </label>

              <label className="space-y-1.5">
                <span className={"text-base font-normal w-full text-gray-500"}>Staff Assigned</span>

                <CustomSelect
                  onChange={handleStaffAssigned}
                  placeholder={"SELECT STAFF"}
                  fontSize={14}
                  options={[
                    {
                      value: "Admin",
                      label: "Admin",
                    },
                    {
                      value: "Admin 2",
                      label: "Admin 2",
                    },
                  ]}
                  className={`h-[50px] w-full rounded`}
                  colorBorder={"#DEE2E6"}
                  value={StaffAssigned ? StaffAssigned : undefined}
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
              >
                EXPORT INTO EXCEL
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
                  handleReset();
                  setWheelProduct("");
                  setClassroomProduct("");
                  setLocation("");
                  setStaffAssigned("");
                  setStartDate(null);
                }}
              >
                CLEAR
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
