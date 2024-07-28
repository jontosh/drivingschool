import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { DatePicker, Form, Input } from "antd";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import ColorsContext from "@/context/colors.jsx";

export const InfoForm = ({ packages, type }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(ModalReducer, {
    status: false,
  });

  const { data: InstructorData, isLoading: isInstructor } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: LocationData, isLoading: isLocation } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: SchoolData, isLoading: isSchools } = useRequestGetQuery({
    path: "/account_management/schools/",
  });
  const { data: LeadData, isLoading: isLead } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });

  const [form] = Form.useForm();
  const [StaffSelect, setStaffSelect] = useState([]);
  const [LocationSelect, setLocationSelect] = useState([]);
  const [SchoolsSelect, setSchoolsSelect] = useState([]);
  const [LeadSelect, setLeadSelect] = useState([]);

  useEffect(() => {
    const staffOptions =
      InstructorData?.filter((i) => i.status.toLowerCase() === "active").map(
        (i) => ({
          label: `${i.first_name} ${i.last_name}`,
          value: i.id,
        }),
      ) || [];
    const locationOptions =
      LocationData?.filter((l) => l.status.toLowerCase() === "active").map(
        (l) => ({
          label: l.name,
          value: l.id,
        }),
      ) || [];
    const schoolsOptions =
      SchoolData?.filter((s) => s.status.toLowerCase() === "active").map(
        (s) => ({
          label: s.name,
          value: s.id,
        }),
      ) || [];
    const leadOptions =
      LeadData?.filter((l) => l.status.toLowerCase() === "active").map((l) => ({
        label: l.name,
        value: l.id,
      })) || [];

    setStaffSelect(staffOptions);
    setLocationSelect(locationOptions);
    setSchoolsSelect(schoolsOptions);
    setLeadSelect(leadOptions);
  }, [InstructorData, LocationData, SchoolData, LeadData]);

  useEffect(() => {
    form.setFieldsValue({
      type,
    });
  }, [type]);

  const onFinish = async (values) => {
    try {
      const response = await requestPost({
        path: "/student_account/student/",
        data: {
          ...values,
          dl_given_date: values.dl_given_date?.format("YYYY-MM-DD"),
          dl_expire_date: values.dl_expire_date?.format("YYYY-MM-DD"),
          extension_data: values.extension_data?.format("YYYY-MM-DD"),
          birth: values.birth?.format("YYYY-MM-DD"),
        },
      });

      if (response?.error?.status >= 400) {
        dispatch({
          type: "ERROR",
          data: response?.error?.data,
          open: IsOpen,
          onEvent: () => setIsOpen((prev) => !prev),
        });
      } else {
        const res = await requestPost({
          path: "/student_account/enrollment/",
          data: {
            code: 1,
            cr: packages?.class?.id,
            cr_start: packages?.class?.start_date,
            cr_end: packages?.class?.end_Data,
            student: response?.data?.id,
            by: response?.data?.staff,
            package: packages?.packages,
            price: packages?.total,
          },
        });

        if (res?.data?.id) {
          dispatch({
            type: "SUCCESS",
            open: IsOpen,
            onEvent: () => setIsOpen((prev) => !prev),
          });
        } else {
          dispatch({
            type: "ERROR",
            data: res?.error?.data,
            open: IsOpen,
            onEvent: () => setIsOpen((prev) => !prev),
          });
        }
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ERROR",
        data: {},
        open: IsOpen,
        onEvent: () => setIsOpen((prev) => !prev),
      });
    } finally {
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <Form form={form} onFinish={onFinish} layout={"vertical"}>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item name={"staff"} label={"Assign to staff"}>
              <CustomSelect
                options={StaffSelect}
                placeholder={"Account #"}
                disabled={isInstructor}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"location"} label={"Assign to Location"}>
              <CustomSelect
                options={LocationSelect}
                placeholder={"Select Location"}
                disabled={isLocation}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"first_name"}
              label={"First name"}
              rules={[{ required: true, message: "Please input First name!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"First name"}
              />
            </Form.Item>

            <Form.Item name={"mid_name"} label={"Middle name"}>
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Middle name"}
              />
            </Form.Item>

            <Form.Item
              name={"last_name"}
              label={"Last name"}
              rules={[{ required: true, message: "Please input Last name!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Last name"}
              />
            </Form.Item>

            <Form.Item
              name={"address"}
              label={"Address"}
              rules={[{ required: true, message: "Please input address!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"address"}
              />
            </Form.Item>

            <Form.Item
              name={"city"}
              label={"City"}
              rules={[{ required: true, message: "Please input city!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"City"}
              />
            </Form.Item>

            <Form.Item
              name={"state"}
              label={"State"}
              rules={[{ required: true, message: "Please select state!" }]}
            >
              <CustomSelect
                options={[{ value: "USA", label: "USA" }]}
                placeholder={"Select state"}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"zip"}
              label={"Zip/Postal code"}
              rules={[{ required: true, message: "Please input zip!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Zip"}
              />
            </Form.Item>

            <Form.Item
              name={"home_phone"}
              label={"Home Phone"}
              rules={[{ required: true, message: "Please input Home Phone!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Home Phone"}
              />
            </Form.Item>

            <Form.Item
              name={"cell_phone"}
              label={"Cell Phone"}
              rules={[{ required: true, message: "Please input Cell Phone!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Cell Phone"}
              />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                type={"email"}
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Email"}
              />
            </Form.Item>

            <Form.Item
              label={"Gender"}
              name={"gender"}
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <div className="grid grid-cols-3 gap-2.5">
                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Male`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Male</span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Female`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Female</span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Other`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Other</span>
                </CustomRadio>
              </div>
            </Form.Item>

            <Form.Item
              name={"preferred_pronoun"}
              label={"Preferred Pronoun"}
              rules={[
                { required: true, message: "Please select preferred pronoun!" },
              ]}
            >
              <CustomSelect
                options={[
                  { label: "She/Her", value: "She" },
                  { label: "He/Him", value: "He" },
                  { label: "Other", value: "Other" },
                ]}
                placeholder={"Select preferred pronoun"}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"medical_condition"} label={"Medical condition"}>
              <Input.TextArea
                placeholder={"Text"}
                className="border-[#667085]"
              />
            </Form.Item>

            <Form.Item name={"note"} label={"Student Notes"}>
              <Input.TextArea
                placeholder={"Text"}
                className="border-[#667085]"
              />
            </Form.Item>

            <Form.Item name={"driving_note"} label={"Student driving notes"}>
              <Input.TextArea
                placeholder={"Text"}
                className="border-[#667085]"
              />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item
              name={"birth"}
              label={"Birth"}
              rules={[{ required: true, message: "Please input birth date!" }]}
            >
              <DatePicker
                className={`w-full h-[50px] border-[#667085] ${colorsObject?.accent}`}
                placeholder={"Select birth date"}
              />
            </Form.Item>

            <Form.Item name={"dl_permit"} label={"DL/Permit"}>
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"DL/Permit"}
              />
            </Form.Item>

            <Form.Item
              name={"dl_given_date"}
              label={"DL Given Date"}
              rules={[
                { required: true, message: "Please input DL given date!" },
              ]}
            >
              <DatePicker
                className={`w-full h-[50px] border-[#667085] ${colorsObject?.accent}`}
                placeholder={"Select DL given date"}
              />
            </Form.Item>

            <Form.Item
              name={"dl_expire_date"}
              label={"DL Expire Date"}
              rules={[
                { required: true, message: "Please input DL expire date!" },
              ]}
            >
              <DatePicker
                className={`w-full h-[50px] border-[#667085] ${colorsObject?.accent}`}
                placeholder={"Select DL expire date"}
              />
            </Form.Item>

            <Form.Item
              name="scheduling"
              valuePropName="checked"
              label={"Disable Self Scheduling"}
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item
              name="payment"
              valuePropName="checked"
              label={"Payment Plan"}
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item
              name={"extension_data"}
              label={"Extension Date"}
              rules={[
                { required: true, message: "Please input extension date!" },
              ]}
            >
              <DatePicker
                className={`w-full h-[50px] border-[#667085]`}
                placeholder={"Select extension date"}
              />
            </Form.Item>

            <Form.Item name={"high_school"} label={"High School"}>
              <CustomSelect
                options={SchoolsSelect}
                placeholder={"Select School"}
                disabled={isSchools}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"lead"}
              label={"Lead"}
              rules={[{ required: true, message: "Please select lead!" }]}
            >
              <CustomSelect
                options={LeadSelect}
                placeholder={"Select Lead"}
                disabled={isLead}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"username"}
              label={"Username"}
              rules={[{ required: true, message: "Please input username!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Username"}
              />
            </Form.Item>

            <Form.Item
              name={"parent_name"}
              label={"Parent name"}
              rules={[{ required: true, message: "Please input Parent name!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Parent name"}
              />
            </Form.Item>

            <Form.Item name={"parent_phone"} label={"Parent phone"}>
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Parent phone"}
              />
            </Form.Item>

            <Form.Item name={"parent_email"} label={"Parent email"}>
              <Input
                type={"email"}
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Email"}
              />
            </Form.Item>

            <Form.Item
              name={"parent_2_name"}
              label={"Parent name 2"}
              rules={[{ required: true, message: "Please input Parent name!" }]}
            >
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Parent name"}
              />
            </Form.Item>

            <Form.Item name={"parent_2_phone"} label={"Parent phone 2"}>
              <Input
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Parent phone"}
              />
            </Form.Item>

            <Form.Item name={"parent_2_email"} label={"Parent email 2"}>
              <Input
                type={"email"}
                className="w-full h-[50px] border-[#667085]"
                placeholder={"Email"}
              />
            </Form.Item>
          </div>
        </div>

        <div className=" flex flex-col sm:flex-row gap-5 justify-center pt-5">
          <ButtonComponent
            type={"submit"}
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            paddingInline={44}
            borderRadius={5}
          >
            Save
          </ButtonComponent>

          <CustomSelect
            placeholder={"Apply Payment & Save"}
            options={[
              {
                value: "Process Credit card",
                label: "Process Credit card",
              },
              {
                value: "Enter Swiped Transaction",
                label: "Enter Swiped Transaction",
              },
              {
                value: "Enter Cash Payment",
                label: "Enter Cash Payment",
              },
              {
                value: "Enter Check Payment",
                label: "Enter Check Payment",
              },
            ]}
            className={"h-10 text-center"}
            selectorBg={colorsObject.info}
            colorTextPlaceholder={colorsObject.main}
            colorBorder={colorsObject.info}
          />
        </div>
      </Form>
      {IsOpen && state.status}
    </Fragment>
  );
};
