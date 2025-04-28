import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect, CustomTransfer } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { AlertDelete, AlertEdit } from "@/hooks/alert.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { FormOutlined } from "@ant-design/icons";
import { Form, Input, Switch } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";

const EditFormItems = ({ isLoading, onReset, handleStatus, statusOptions, PackagesMock, setPackages, Packages }) => {
  return (
    <Form
      layout={"vertical"}
      className="px-5 space-y-5"
    >
      <Form.Item
        name={"name"}
        label={"Category name"}
        rules={[
          {
            required: true,
            message: "Category name is empty",
          },
        ]}
      >
        <CustomInput
          disabled={isLoading}
          classNames={"w-full"}
          placeholder={"Category name"}
        />
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
          className={`w-full h-[50px]`}
          options={statusOptions}
          onChange={handleStatus}
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item name={"signature"} label={"Signature link:"}>
        <CustomInput
          type={"url"}
          classNames={"w-full"}
          placeholder={"Link"}
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item name={"note"} label={"Note"}>
        <Input.TextArea
          showCount
          maxLength={100}
          className={"border-[#667085] p-5"}
          placeholder={"Notes"}
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item name={"package"} label={"Packages:"}>
        <CustomTransfer
          dataSource={PackagesMock}
          listHeight={200}
          setSelectedKeys={setPackages}
          selectedKeys={Packages}
          disabled={isLoading}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item
          label={"Display on Student Portal:"}
          valuePropName="checked"
          name={"has_portal"}
          className="max-w-[250px]"
        >
          <Switch disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label={"Must Be Uploaded to Student Account:"}
          valuePropName="checked"
          name={"has_student_account"}
          className="max-w-[250px]"
        >
          <Switch disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label={
            "Disallow files associated with category from displaying on Student Portal:"
          }
          valuePropName="checked"
          name={"has_category_portal"}
          className="max-w-[250px]"
        >
          <Switch disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label={
            "Disallow files associated with this category  from displaying on Instructor/Teacher Portal:"
          }
          valuePropName="checked"
          name={"has_teacher_portal"}
          className="max-w-[250px]"
        >
          <Switch disabled={isLoading} />
        </Form.Item>
      </div>

      <div className="text-center space-x-5">
        <ButtonComponent
          defaultBg={colorsObject.success}
          defaultHoverBg={colorsObject.successHover}
          defaultColor={colorsObject.main}
          defaultHoverColor={colorsObject.main}
          borderRadius={5}
          paddingInline={44}
          type={"submit"}
          loading={isLoading}
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
          disabled={isLoading}
        >
          Cancel
        </ButtonComponent>
      </div>
    </Form>
  );
};

export const FileCategoryModule = () => {
  const { data, isLoading, error } = useRequestGetQuery({
    path: "/student_account/file_category/",
  });

  const [IsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(ModalReducer, { modal: null, form });
  const [Action, setAction] = useState({ id: null, type: undefined });
  const [requestDelete, { reset: DeleteReset, isLoading: isDeleteLoading }] = useRequestDeleteMutation();
  const [requestPatch, { reset: PatchReset, isLoading: isPatchLoading }] = useRequestPatchMutation();
  const [Packages, setPackages] = useState([]);
  const PackagesMock = [];
  const statusOptions = StatusSelect;

  const handleStatus = (value) => {
    form.setFieldsValue({ status: value });
  };

  const onReset = () => {
    form.resetFields();
    setIsOpen(false);
    setAction({ id: null, type: undefined });
  };

  const updateModalState = () => {
    dispatch({
      type: Action.type,
      onOk: handleOk,
      onCancel: onReset,
      open: IsOpen,
      form,
      onFinish: handleFinish,
      children: (
        <EditFormItems
          isLoading={isPatchLoading || isDeleteLoading}
          onReset={onReset}
          handleStatus={handleStatus}
          statusOptions={statusOptions}
          PackagesMock={PackagesMock}
          setPackages={setPackages}
          Packages={Packages}
        />
      ),
    });
  };

  const handleOk = async () => {
    try {
      await requestDelete({
        path: "/student_account/file_category/" + data[Action.id]?.id,
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
        path: "/student_account/file_category",
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
    } else {
      form.resetFields();
    }
    if (Action.type) {
      updateModalState();
    }
  }, [Action, data, IsOpen]);

  const columns = [
    {
      title: "Category",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "File status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            style={{ width: 81 }}
            borderRadius={10}
          >
            {text.toLowerCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
      align: "center",
      render: (text, _, index) => {
        return (
          <IconComponent
            className="text-xl text-indigo-500 border border-indigo-600"
            style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
            icon={<FormOutlined />}
            onClick={() => {
              setIsOpen(true);
              setAction({ id: index, type: "EDIT" });
            }}
            key={index}
          />
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      dataIndex: "delete",
      align: "center",
      render: (text, _, index) => {
        return (
          <Fragment key={index}>
            <IconComponent
              className={"w-7"}
              icon={<Icons type={"cross"} />}
              onClick={() => {
                setIsOpen(true);
                setAction({ id: index, type: "CONFIRM" });
              }}
            />
            {index === Action.id ? state?.modal : null}
          </Fragment>
        );
      },
    },
  ];

  // Table data fallback for empty state
  const tableData = (data && data.length > 0)
    ? data
    : [{ name: "-", status: "-", edit: null, delete: null, key: "no-records", empty: true }];

  // Error and loading state rendering
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading data</div>;

  return { data: tableData, columns };
};
