import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { DatePicker, Form, Input } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        status: <AlertSuccess setIsOpen={action.setIsOpen} />,
      };
    }
    case "ERROR": {
      return {
        ...state,
        status: <AlertError setIsOpen={action.setIsOpen} />,
      };
    }

    default: {
      console.error(`Unknown action: ${action.type}`);
    }
  }
};

export const InfoForm = ({ packages }) => {
  const [requestPost] = useRequestPostMutation();

  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // Data
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

  // hooks
  const [form] = Form.useForm();
  const [StaffSelect, setStaffSelect] = useState([]);
  const [LocationSelect, setLocationSelect] = useState([]);
  const [SchoolsSelect, setSchoolsSelect] = useState([]);
  const [LeadSelect, setLeadSelect] = useState([]);

  // dep
  useEffect(() => {
    const staffOptions = [];
    const locationOptions = [];
    const schoolsOptions = [];
    const leadOptions = [];

    for (let i = 0; i < InstructorData?.length; i++) {
      const instructor = InstructorData[i];

      if (instructor.status.toLowerCase() === "active") {
        staffOptions.push({
          label: instructor.first_name + " " + instructor?.last_name,
          value: instructor.id,
        });
      }
    }

    for (let i = 0; i < LocationData?.length; i++) {
      const location = LocationData[i];

      if (location.status.toLowerCase() === "active") {
        locationOptions.push({ label: location?.name, value: location.id });
      }
    }

    for (let i = 0; i < SchoolData?.length; i++) {
      const school = SchoolData[i];

      if (school.status.toLowerCase() === "active") {
        schoolsOptions.push({ label: school?.name, value: school.id });
      }
    }

    for (let i = 0; i < LeadData?.length; i++) {
      const lead = LeadData[i];

      if (lead.status.toLowerCase() === "active") {
        leadOptions.push({ label: lead?.name, value: lead.id });
      }
    }

    setStaffSelect(staffOptions);
    setLocationSelect(locationOptions);
    setSchoolsSelect(schoolsOptions);
    setLeadSelect(leadOptions);
  }, [InstructorData, LocationData, SchoolData, LeadData]);

  // func
  const onFinish = async (values) => {
    try {
      const response = await requestPost({
        path: "/student_account/student/",
        data: {
          ...values,
          dl_given_date: values["dl_given_date"]?.format("YYYY-MM-DD"),
          dl_expire_date: values["dl_expire_date"]?.format("YYYY-MM-DD"),
          extantion_date: values["extantion_date"]?.format("YYYY-MM-DD"),
          birth: values["birth"]?.format("YYYY-MM-DD"),
        },
      });

      if (response?.error?.status >= 400) {
        dispatch({ type: "ERROR", setIsOpen });
        setIsOpen(true);
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
          dispatch({ type: "SUCCESS", setIsOpen });
          setIsOpen(true);
        } else {
          dispatch({ type: "ERROR", setIsOpen });
          setIsOpen(true);
        }
      }
    } catch (error) {
      console.error(error?.message);
      dispatch({ type: "ERROR", setIsOpen });
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <Form form={form} onFinish={onFinish} layout={"vertical"}>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item name={"staff"} label={"Assign to staff"}>
              <CustomSelect
                options={StaffSelect}
                placeholder={"Account #"}
                disabled={isInstructor}
              />
            </Form.Item>

            <Form.Item name={"location"} label={"Assign to Location"}>
              <CustomSelect
                options={LocationSelect}
                placeholder={"Select Location"}
                disabled={isLocation}
              />
            </Form.Item>

            <Form.Item
              name={"first_name"}
              label={"First name"}
              rules={[
                {
                  required: true,
                  message: "Please input First name!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"First name"} />
            </Form.Item>

            <Form.Item name={"mid_name"} label={"Middle name"}>
              <CustomInput classNames={"w-full"} placeholder={"Middle name"} />
            </Form.Item>

            <Form.Item
              name={"last_name"}
              label={"Last name"}
              rules={[
                {
                  required: true,
                  message: "Please input Last name!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Last name"} />
            </Form.Item>

            <Form.Item
              name={"address"}
              label={"address"}
              rules={[
                {
                  required: true,
                  message: "Please input address!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"address"} />
            </Form.Item>

            <Form.Item
              name={"city"}
              label={"City"}
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"City"} />
            </Form.Item>

            <Form.Item
              name={"state"}
              label={"State"}
              rules={[
                {
                  required: true,
                  message: "Please select state!",
                },
              ]}
            >
              <CustomSelect
                options={[
                  {
                    value: "USA",
                    label: "USA",
                  },
                ]}
                placeholder={"Select state"}
              />
            </Form.Item>

            <Form.Item
              name={"zip"}
              label={"Zip/Postal code"}
              rules={[
                {
                  required: true,
                  message: "Please input zip!",
                },
              ]}
            >
              <CustomInput placeholder={"Zip"} />
            </Form.Item>

            <Form.Item
              name={"home_phone"}
              label={"Home Phone"}
              rules={[
                {
                  required: true,
                  message: "Please input Home Phone!",
                },
              ]}
            >
              <CustomInput placeholder={"Home Phone"} />
            </Form.Item>

            <Form.Item
              name={"cell_phone"}
              label={"Cell Phone"}
              rules={[
                {
                  required: true,
                  message: "Please input Cell Phone!",
                },
              ]}
            >
              <CustomInput placeholder={"Cell Phone"} />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <CustomInput type={"email"} placeholder={"Email"} />
            </Form.Item>

            <Form.Item
              label={"Gender"}
              name={"gender"}
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
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
              label={"Perferred Pronoun"}
              rules={[
                {
                  required: true,
                  message: "Please select perferred pronoun!",
                },
              ]}
            >
              <CustomSelect
                options={[
                  { value: "He", label: "He" },
                  { value: "She", label: "She" },
                  { value: "Other", label: "Other" },
                ]}
                placeholder={"Select perferred pronoun!"}
              />
            </Form.Item>

            <Form.Item name={"medical_condition"} label={"Medical condition"}>
              <Input.TextArea
                placeholder={"Medical condition"}
                className={"border-black"}
              />
            </Form.Item>

            <Form.Item name={"driving_notes"} label={"Student driving notes"}>
              <Input.TextArea
                placeholder={"Student driving notes"}
                className={"border-black"}
              />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              label={"I have read and agreed to Terms and Conditions"}
            >
              <CustomCheckBox />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item name={"dl_permit"} label={"DL/Permit"}>
              <CustomInput placeholder={"DL/Permit #"} />
            </Form.Item>

            <Form.Item name={"dl_given_date"} label={"DL/Permit Issued"}>
              <DatePicker />
            </Form.Item>

            <Form.Item name={"dl_expire_date"} label={"DL Permit Expiration"}>
              <DatePicker />
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

            <Form.Item name={"extantion_date"} label={"Extantion Date"}>
              <DatePicker />
            </Form.Item>

            <Form.Item name={"high_school"} label={"High School"}>
              <CustomSelect
                options={SchoolsSelect}
                placeholder={"High School"}
                disabled={isSchools}
              />
            </Form.Item>

            <Form.Item name={"parent_name"} label={"Parent name"}>
              <CustomInput placeholder={"Parent name"} />
            </Form.Item>

            <Form.Item name={"parent_phone"} label={"Parent phone"}>
              <CustomInput placeholder={"Parent phone"} />
            </Form.Item>

            <Form.Item
              name={"parent_email"}
              label={"Parent email"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <CustomInput placeholder={"Parent email"} />
            </Form.Item>

            <Form.Item name={"parent_2_name"} label={"Parent name 2"}>
              <CustomInput placeholder={"Parent name"} />
            </Form.Item>

            <Form.Item name={"parent_2_phone"} label={"Parent phone 2"}>
              <CustomInput placeholder={"Parent phone"} />
            </Form.Item>

            <Form.Item
              name={"parent_2_email"}
              label={"Parent email 2"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <CustomInput placeholder={"Parent email"} />
            </Form.Item>

            <Form.Item
              name={"birth"}
              label={"Birth"}
              rules={[
                {
                  required: true,
                  message: "Please select birth!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item name={"lead"} label={"Lead"}>
              <CustomSelect
                disabled={isLead}
                options={LeadSelect}
                placeholder={"Select Lead"}
              />
            </Form.Item>

            <Form.Item name={"note"} label={"Student notes"}>
              <Input.TextArea placeholder={"Student notes"} />
            </Form.Item>

            <Form.Item
              name={"username"}
              label={"Username"}
              rules={[
                {
                  required: true,
                  message: "Please input username",
                },
              ]}
            >
              <CustomInput placeholder={"username"} />
            </Form.Item>
          </div>
        </div>

        <ButtonComponent
          type={"submit"}
          defaultColor={"black"}
          defaultHoverColor={"black"}
        >
          Save
        </ButtonComponent>
      </Form>

      {IsOpen && state?.status}
    </Fragment>
  );
};
