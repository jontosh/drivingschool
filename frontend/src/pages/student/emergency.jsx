import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Form, Input } from "antd";
import { Fragment, useState, useEffect } from "react";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const Emergency = () => {
  const { data: EmergencyData, isLoading } = useRequestGetQuery({
    path: "/student_account/emergency_contact/",
  });

  const studentId = useURLSearchParams("studentId");

  const { data: LeadData } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });

  const [LeadOptions, setLeadOptions] = useState([]);
  const [form] = Form.useForm();

  // Emergency
  useEffect(() => {
    for (let i = 0; i < EmergencyData?.length; i++) {
      const item = EmergencyData[i];

      if (item?.student === studentId) {
        form.setFieldsValue(item);
        break;
      }
    }
  }, [isLoading, studentId]);

  // LeadData
  useEffect(() => {
    const options = [];

    for (let i = 0; i < LeadData?.length; i++) {
      const lead = LeadData[i];

      if (lead?.status?.toLowerCase() === "active") {
        options.push({
          ...lead,
          value: lead?.id,
          label: lead?.name,
        });
      }
    }

    setLeadOptions(options);
  }, [LeadData]);

  return (
    <Fragment>
      <Form
        className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
        form={form}
        layout={"vertical"}
        disabled={isLoading}
      >
        <Title fontSize={"text-2xl text-indigo-700"} fontWeightStrong={600}>
          Emergency
        </Title>

        <Form.Item
          label={"Emergency name"}
          className={"flex-grow"}
          name={"name"}
        >
          <CustomInput placeholder={"Emergency name"} classNames={`w-full`} />
        </Form.Item>

        <Form.Item name={"relation"} label={"Emergency relationship"}>
          <CustomInput
            placeholder={"Emergency relationship"}
            classNames={`w-full`}
          />
        </Form.Item>

        <Form.Item name={"phone"} label={"Emergency phone"}>
          <CustomInput placeholder={"Emergency phone"} classNames={`w-full`} />
        </Form.Item>

        <Form.Item name={"how_did_you_hear_us"} label={"Lead"}>
          <CustomSelect
            placeholder={"Lead"}
            className={`w-full h-[50px]`}
            options={LeadOptions}
          />
        </Form.Item>

        <Form.Item name={"medical_condition"} label={"Medial condition"}>
          <Input.TextArea
            className={"border-[#667085]"}
            placeholder={"Notes"}
          />
        </Form.Item>

        <Form.Item
          label={"Wear glasses contact"}
          name={"wear_glass"}
          valuePropName="checked"
        >
          <CustomCheckBox />
        </Form.Item>

        <Form.Item
          label={"Terms & Conditions"}
          name={"terms_conditions"}
          valuePropName="checked"
        >
          <CustomCheckBox />
        </Form.Item>
      </Form>
    </Fragment>
  );
};
