import Title from "@/components/title/index.jsx";
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { Checkbox, Form, Input, Modal, Select, Timeline } from "antd";
import { useContext, useEffect, useMemo } from "react";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ActiveData } from "@/hooks/filter.jsx";

export const Emergency = () => {
  const { colorsObject } = useContext(ColorsContext);
  const studentId = useURLSearchParams("studentId");
  const [form] = Form.useForm();

  const { data, isSuccess } = useRequestGetQuery({
    path: "/student_account/emergency_contact/",
  });
  const { data: Leads } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });
  const [requestPatch, {}] = useRequestPatchMutation();

  const leadsOptions = useMemo(
    () =>
      ActiveData(Leads)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Leads],
  );

  const emergency = useMemo(
    () => data?.filter((item) => item?.student === studentId)[0] || {},
    [data],
  );

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(emergency);
    }
  }, [isSuccess]);

  const onFinish = async (values) => {
    try {
      const { error } = await requestPatch({
        path: "/student_account/emergency_contact",
        id: emergency?.id,
        data: values,
      });

      if (error?.status >= 400) {
        Modal.error({
          title: "Error message",
          content: (
            <Timeline
              items={Object.values(error?.data).map((item) => ({
                children: item[0],
              }))}
            />
          ),
        });
      } else {
        Modal.success({
          title: "Success message",
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <Form
        className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
        form={form}
        layout={"vertical"}
        onFinish={onFinish}
      >
        <div className="flex items-center justify-between">
          <Title fontSize={"text-2xl text-indigo-700"} fontWeightStrong={600}>
            Emergency
          </Title>

          <ButtonComponent
            controlHeight={40}
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultColor={colorsObject.primary}
            defaultActiveColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            defaultBorderColor={colorsObject.primary}
            paddingInline={53}
            borderRadius={5}
          >
            Update
          </ButtonComponent>
        </div>

        <Form.Item
          label={"Emergency name"}
          className={"flex-grow"}
          name={"name"}
        >
          <Input placeholder={"Emergency name"} className={`h-[50px]`} />
        </Form.Item>

        <Form.Item name={"relation"} label={"Emergency relationship"}>
          <Input
            placeholder={"Emergency relationship"}
            className={`h-[50px]`}
          />
        </Form.Item>

        <Form.Item name={"phone"} label={"Emergency phone"}>
          <Input placeholder={"Emergency phone"} className={`h-[50px]`} />
        </Form.Item>

        <Form.Item name={"how_did_you_hear_us"} label={"Lead"}>
          <Select
            placeholder={"Lead"}
            className={`h-[50px]`}
            options={leadsOptions}
          />
        </Form.Item>

        <Form.Item name={"medical_condition"} label={"Medial condition"}>
          <Input.TextArea placeholder={"Notes"} />
        </Form.Item>

        <Form.Item
          label={"Wear glasses contact"}
          name={"wear_glass"}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        <Form.Item
          label={"Terms & Conditions"}
          name={"terms_conditions"}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </>
  );
};
