import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
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
  PlusOutlined,
} from "@ant-design/icons";
import { ColorPicker, DatePicker, Form, Input, Upload } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import ManagementStyle from "@/pages/managment/management.module.scss";

const EditFormItems = () => {
  return (
    <Form
      layout={"vertical"}
      className={"grid grid-cols-2 gap-5 px-5 max-[1000px]:grid-cols-1"}
    >
      <div className={"space-y-5"}>
        <Form.Item name={"status"} label={"Status"}>
          <CustomSelect
            placeholder={"Status"}
            className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          // options={StatusSelect}
          />
        </Form.Item>

        <Form.Item name={"staff_type"} label={"Staff type"}>
          <CustomSelect
            placeholder={"Staff type"}
            className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={[
              {
                value: "Instructor",
                label: "Instructor",
              },
              {
                value: "Instructor / Teacher",
                label: "Instructor/Teacher",
              },
              {
                value: "Junior Admin",
                label: "Junior Admin",
              },
              {
                value: "Office Manager",
                label: "Office Manager",
              },
              {
                value: "Owner",
                label: "Owner",
              },
              {
                value: "Senior Admin",
                label: "Senior Admin",
              },
              {
                value: "Teacher",
                label: "Teacher",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name={"location"} label={"Location"}>
          <CustomSelect
            placeholder={"Select"}
            className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          // options={Location}
          />
        </Form.Item>

        <Form.Item name={"vehicle"} label={"Vehicle assigned"}>
          <CustomSelect
            placeholder={"Select"}
            className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
          // options={Vehicle}
          />
        </Form.Item>

        <Form.Item name={"code"} label={"Staff code"}>
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Staff code"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"first_name"}
          label={"First name"}
          rules={[
            {
              required: true,
              message: "First name is empty",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Staff code"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item name={"mid_name"} label={"Middle Name"}>
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Middle Name"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"last_name"}
          label={"Last Name"}
          rules={[
            {
              required: true,
              message: "Last Name is empty",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Last Name"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"address"}
          label={"Address"}
          rules={[
            {
              required: true,
              message: "Address is empty",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Address"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item name={"city"} label={"City"}>
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"City"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item name={"state"} label={"State"}>
          <CustomSelect
            placeholder={"Select"}
            className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            options={[
              {
                value: "USA",
                label: "USA",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name={"zip"} label={"Zip"}>
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Zip"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Email"}
            fontSize="text-base"
            type={"email"}
          />
        </Form.Item>

        <Form.Item name={"home_phone"} label={"Home Phone"}>
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Home phone"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"cell_phone"}
          label={"Cell Phone"}
          rules={[
            {
              required: true,
              message: "Cell phone is empty",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Cell phone"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item name={"emergency_name"} label={"Emergency Contact Name"}>
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Emergency Contact Name"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"emergency_relation"}
          label={"Emergency Contact Relation"}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Emergency Contact Relation"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"emergency_phone"}
          label={"Emergency Contact Phone"}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Emergency Contact Phone"}
            fontSize="text-base"
          />
        </Form.Item>
      </div>

      <div className={"space-y-5"}>
        <Form.Item
          label={"Date of birth"}
          rules={[
            {
              required: true,
              message: "Birth is empty",
              type: "object",
            },
          ]}
          name={"birth"}
        >
          <DatePicker
            className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            placeholder={"MM/DD/YYYY"}
          />
        </Form.Item>

        <Form.Item
          name={"permit_number"}
          label={"Instructor Permit Number"}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Instructor Permit Number"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          name={"car_permit_data"}
          label={"In Car Permit Issued Date"}
          rules={[
            {
              type: "object",
            },
          ]}
        >
          <DatePicker
            className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            placeholder={"MM/DD/YYYY"}
          />
        </Form.Item>

        <Form.Item
          name={"car_permit_expire"}
          label={"Permit Expiration Date"}
          rules={[
            {
              type: "object",
            },
          ]}
        >
          <DatePicker
            className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            placeholder={"MM/DD/YYYY"}
          />
        </Form.Item>

        <Form.Item
          name={"username"}
          label={"Username"}
          rules={[
            {
              required: true,
              message: "Username is invalid",
            },
          ]}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Username"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Password"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "The new password that you entered do not match!",
                  ),
                );
              },
            }),
          ]}
        >
          <CustomInput
            classNames={"w-full h-[50px]"}
            className={ManagementStyle["CheckModal__form-element__shadow"]}
            placeholder={"Password"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item valuePropName="checked" name={"assign_color"}>
          <CustomCheckBox className={"w-full"}>
            <span className={`text-sm`}>Assign Appointment Color</span>
          </CustomCheckBox>
        </Form.Item>

        <Form.Item name={"color"} label={"Appointment Color"}>
          <ColorPicker
            // onChange={handleColor}
            defaultValue="#1677FF"
            size="large"
            showText
          />
        </Form.Item>

        <Form.Item name={"zoom"} label={"Zoom PMI"}>
          <CustomInput
            placeholder={"Zoom PMI"}
            className={`text-gray-500 px-5 py-2 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
            classNames={"w-full h-[50px]"}
            fontSize="text-base"
          />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          // getValueFromEvent={normFile}
          name={"picture"}
        >
          <Upload
            // action={import.meta.env.VITE_API_URL + "/media/files/student/"}
            listType="picture-card"
            maxCount={1}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
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
          onClick={onReset}
        >
          Cancel
        </ButtonComponent>
      </div> */}
    </Form>
  );
};

export const StaffModule = () => {
  const { data } = useRequestGetQuery({ path: "/student_account/instructor/" });
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
        path: "/student_account/instructor/" + data[Action.id]?.id,
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
        path: "/student_account/instructor/",
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
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Cell phone",
      dataIndex: "cell_phone",
      key: "cell_phone",
      render: (text) => {
        return (
          <Paragraph
            className={"text-start"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text.toUpperCase()}
          </ButtonComponent>
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
              to={"/admin/modals/staff/add-staff/" + item?.id}
              target={"_blank"}
            >
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<ExportOutlined />}
              />
            </Link>
          </div>
          {index === Action.id && state?.modal}
        </Fragment>
      ),
    },
  ];

  return { data, columns };
};
