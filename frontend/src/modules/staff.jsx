import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
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
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const EditFormItems = () => {
  return (
    <div className={"space-y-5"}>
      <Form.Item
        label={"Component Name:"}
        name={"last_name"}
        rules={[
          {
            required: true,
            message: "Please enter last name!",
          },
        ]}
      >
        <Input className={"w-full h-[50px]"} placeholder={"Product name"} />
      </Form.Item>
      <Form.Item
        label={"Item#/Code:"}
        name={"first_name"}
        rules={[
          {
            required: true,
            message: "Please enter first name!",
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
