import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput, CustomSelect, CustomTransfer } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Form, InputNumber, Space } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const EditFormItems = () => {
  return (
    <Form
      layout={"vertical"}
      className="grid grid-cols-2 gap-x-10 px-5 max-[1200px]:grid-cols-1"
    >
      <div className={"space-y-5"}>
        <Form.Item
          label={"Service Name"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Service name is empty",
            },
          ]}
        >
          <CustomInput placeholder={"Service name"} classNames={"w-full"} />
        </Form.Item>

        <Form.Item
          label={"Service code"}
          name={"code"}
          rules={[
            {
              required: true,
              message: "Service code is empty",
            },
          ]}
        >
          <CustomInput placeholder={"Service name"} classNames={"w-full"} />
        </Form.Item>

        <Form.Item
          name={"status"}
          label={"Status"}
          rules={[
            {
              required: true,
              message: "Status is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select status"}
            className={`w-full h-[50px] rounded`}
            options={StatusSelect}
          />
        </Form.Item>

        <Form.Item name={"locations"} label={"Assign Locations"}>
          <CustomTransfer
            // dataSource={Location}
            listHeight={200}
          />
        </Form.Item>

        <Form.Item
          name={"items"}
          label={"Service Items:"}
          rules={[{ required: true }]}
        >
          <CustomTransfer
            listHeight={200}
          />
        </Form.Item>

        <Form.Item name={"taxable"} valuePropName="checked">
          <CustomCheckBox className={"gap-x-2.5 text-sm"}>
            Is Service Taxable
          </CustomCheckBox>
        </Form.Item>

        <Form.Item
          name={"price"}
          label={"Service Price:"}
          rules={[
            {
              required: true,
              message: "Price is empty",
              type: "number",
            },
          ]}
        >
          <InputNumber
            placeholder={"Service Price"}
            className={"w-full h-[50px] border-[#667085] py-2.5"}
          />
        </Form.Item>

        <Form.Item
          name={"web_name"}
          label={"Web Name"}
          rules={[
            {
              required: true,
              message: "Web Name is empty",
            },
          ]}
        >
          <CustomInput
            placeholder={"Web Name"}
            classNames={"w-full"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"web_description"}
          label={"Web description"}
          rules={[
            {
              required: true,
              message: "Service name is empty",
            },
          ]}
        >
          <MDEditor
            placeholder={"Text"}
          // previewOptions={{
          //   rehypePlugins: [[rehypeSanitize]],
          // }}
          />
        </Form.Item>

        <Form.Item
          name={"enrolment_email"}
          label={"Enrollment Email Content"}
        >
          <MDEditor
            placeholder={"Text"}
          // onChange={handleEnrollmentEmail}
          // previewOptions={{
          //   rehypePlugins: [[rehypeSanitize]],
          // }}
          />
        </Form.Item>
      </div>
      {/*------------*/}
      <div className={`space-y-5`}>
        <Form.Item
          name={"purchase"}
          label={"Allow Web Purchase:"}
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "purchase is empty",
            },
          ]}
        >
          <CustomCheckBox />
        </Form.Item>

        <Form.Item
          name={"portal_purchase"}
          label={"Allow Web Purchase:"}
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Allow Portal Purchase is empty",
            },
          ]}
        >
          <CustomCheckBox />
        </Form.Item>

        <Form.Item name={"add_ons"} label={"Add-On Services"}>
          <CustomTransfer
            // dataSource={AddOn}
            listHeight={200}
          // setSelectedKeys={setAddOnServices}
          // selectedKeys={AddOnServices}
          />
        </Form.Item>

        <Form.Item name={"discount"} label={"Eligible Discounts"}>
          <CustomTransfer
            // dataSource={DiscountMock}
            listHeight={200}
          // setSelectedKeys={setDiscount}
          // selectedKeys={Discount}
          />
        </Form.Item>

        <Form.Item name={"oe"} label={"Associate Contract From OE"}>
          <CustomSelect
            className={`w-full h-[50px]`}
            placeholder={"Associate Contract From OE"}
            // onChange={handleOE}
            options={[
              { value: "TEEN", label: "TEEN" },
              { value: "ADULT", label: "ADULT" },
              { value: "KNOWLEDGE TEST(KT)", label: "KNOWLEDGE TEST(KT)" },
              { value: "ROAD TEST(RT)", label: "ROAD TEST(RT)" },
              { value: "UPLOAD DOCUMENTS", label: "UPLOAD DOCUMENTS" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name={"notes"}
          label={"Service Notes"}
          rules={[
            {
              required: true,
              message: "Service Notes is empty",
            },
          ]}
        >
          <MDEditor
            placeholder={"Text"}
          // onChange={handleServiceNotes}
          // previewOptions={{
          //   rehypePlugins: [[rehypeSanitize]],
          // }}
          />
        </Form.Item>
      </div>

      {/* <div className="text-center space-x-5">
        <ButtonComponent
          defaultBg={colorsObject.success}
          defaultHoverBg={colorsObject.successHover}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          borderRadius={5}
          paddingInline={44}
          type={"submit"}
        >
          Save
        </ButtonComponent>

        <ButtonComponent
          defaultBg={colorsObject.main}
          defaultHoverBg={colorsObject.main}
          defaultBorderColor={colorsObject.primary}
          defaultHoverBorderColor={colorsObject.primary}
          defaultColor={colorsObject.primary}
          defaultHoverColor={colorsObject.primary}
          borderRadius={5}
          paddingInline={44}
        >
          Cancel
        </ButtonComponent>
      </div> */}
    </Form>
  );
};

export const PackagesModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });

  const [IsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(ModalReducer, { modal: null, form });
  const [Action, setAction] = useState({ id: null, type: undefined });

  const [requestDelete, { reset: DeleteReset }] = useRequestDeleteMutation();
  const [requestPatch, { reset: PatchReset }] = useRequestPatchMutation();

  const updateModalState = () => {
    dispatch({
      type: Action.type,
      onOk: handleOk,
      onCancel: () => {
        setIsOpen(false);
      },
      open: IsOpen,
      form,
      onFinish: handleFinish,
      children: <EditFormItems />,
      width: 1000
    });
  };

  const handleOk = async () => {
    try {
      await requestDelete({
        path: "/account_management/services/component/" + data[Action.id]?.id,
      }).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      DeleteReset();
    }
  };

  const handleFinish = async (values) => {
    try {
      await requestPatch({
        path: "/account_management/services/component",
        id: data[Action.id]?.id,
        data: values,
      }).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      PatchReset();
    }
  };

  useEffect(() => {
    if (data && Action.id !== null) {
      form.setFieldsValue(data[Action.id]);
    }
    if (Action.type) {
      updateModalState();
    }
  }, [Action, data, IsOpen]);

  const columns = [
    {
      title: "Service name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Service price",
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (text) => (
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Service content",
      key: "items",
      dataIndex: "items",
      align: "center",
      render: (text) => {
        return (
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <Space size={"middle"}>
            <ButtonComponent
              defaultBg={bg}
              defaultHoverBg={hover}
              borderRadius={5}
              style={{ width: "128px" }}
            >
              {text.toUpperCase()}
            </ButtonComponent>
          </Space>
        );
      },
    },
    {
      title: "Web Purchase",
      key: "purchase",
      dataIndex: "purchase",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Student Portal Purchase",
      key: "portal_purchase",
      dataIndex: "portal_purchase",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Students Enrolled",
      key: "enrolled",
      dataIndex: "enrolled",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item, _, index) => (
        <Fragment>
          <div className="space-x-2.5">
            <IconComponent
              className="text-xl text-indigo-500 border border-indigo-600"
              style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
              icon={<FormOutlined />}
              onClick={() => {
                setIsOpen(true);
                setAction({ id: index, type: "EDIT" });
              }}
            />
            <IconComponent
              className="text-xl text-red-600 border border-indigo-600"
              style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
              icon={<DeleteOutlined />}
              onClick={() => {
                setIsOpen(true);
                setAction({ id: index, type: "CONFIRM" });
              }}
            />
            <Link
              to={"/admin/modals/management-service/packages/" + item?.id}
              target={"_blank"}
            >
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<ExportOutlined />}
              />
            </Link>
          </div>
          {index === Action.id ? state?.modal : null}
        </Fragment>
      ),
    },
  ];

  return { columns, data };
};
