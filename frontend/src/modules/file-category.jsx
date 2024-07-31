import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
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
import { Form, Input } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";

const EditFormItems = () => {
  return (
    <div className={"space-y-5"}>
      <Form.Item
        label={"Component Name:"}
        name={"name"}
        rules={[
          {
            required: true,
            message: "Please enter component name!",
          },
        ]}
      >
        <Input className={"w-full h-[50px]"} placeholder={"Product name"} />
      </Form.Item>
      <Form.Item
        label={"Item#/Code:"}
        name={"code"}
        rules={[
          {
            required: true,
            message: "Please enter code!",
          },
        ]}
      >
        <Input className={"w-full h-[50px]"} placeholder={"Item#"} />
      </Form.Item>
      <Form.Item
        label={"Status:"}
        name={"status"}
        rules={[
          {
            required: true,
            message: "Please select status!",
          },
        ]}
      >
        <CustomSelect
          options={StatusSelect}
          className={"w-full h-[50px]"}
          placeholder={"status"}
        />
      </Form.Item>
      @todo
    </div>
  );
};

export const FileCategoryModule = () => {
  const { data } = useRequestGetQuery({
    path: "/student_account/file_category/",
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

  return { data, columns };
};
