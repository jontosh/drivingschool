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
import { Form, Input, InputNumber, Space } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

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
        <Input className={"w-full h-[50px] border-[#667085]"} placeholder={"Product name"} />
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
        <Input className={"w-full h-[50px] border-[#667085]"} placeholder={"Item#"} />
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
      <Form.Item
        label="Public Name:"
        name={"publicName"}
      >
        <Input className="wfull h-[50px] border-[#667085]" placeholder="Public Name" />
      </Form.Item>
      <Form.Item
        label={"Type:"}
        name={"type"}
        rules={[
          {
            required: true,
            message: "Please select status!",
          },
        ]}
      >
        <CustomSelect
          options={[
            {
              label: "BTW",
              value: "BTW",
            },
            {
              label: "CR",
              value: "CR",
            },
            {
              label: "WEB BASED",
              value: "WEB BASED",
            },
          ]}
          className={"w-full h-[50px]"}
          placeholder={"Please Select"}
        />
      </Form.Item>
      <Form.Item
        label={"Sub Type:"}
        name={"subType"}
        rules={[
          {
            required: true,
            message: "Please select status!",
          },
        ]}
      >
        <CustomSelect
          options={[
            {
              label: "TEEN BTW",
              value: "TEEN BTW",
            },
          ]}
          className={"w-full h-[50px]"}
          placeholder={"Please Select"}
        />
      </Form.Item>
      <Form.Item
        label={"Driving Time:"}
        name={"drivingTime"}
        rules={[
          {
            required: true,
            message: "Please select status!",
          },
        ]}
      >
        <div className="flex space-x-2.5">
          <InputNumber className="w-full h-[50px] border-[#667085] py-2.5" placeholder="Hours" />
          <CustomSelect
            options={[
              {
                label: 0,
                value: 0,
              },
              {
                label: "15 minutes",
                value: "15 minutes",
              },
            ]}
            className={"w-full h-[50px]"}
            placeholder={"Please Select"}
          />
        </div>
      </Form.Item>
      <Form.Item
        label="Duration:"
        name={"duration"}
      >
        <CustomSelect
          options={[
            {
              label: "00:15",
              value: "00:15",
            }
          ]}
          className={"w-full h-[50px]"}
          placeholder={"Please Select"}
        />
      </Form.Item>
    </div>
  );
};

export const ProductModule = () => {
  const { data: ProductData } = useRequestGetQuery({
    path: "/account_management/services/component/",
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
        path:
          "/account_management/services/component/" +
          ProductData[Action.id]?.id,
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
        id: ProductData[Action.id]?.id,
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
    if (ProductData && Action.id !== null) {
      form.setFieldsValue(ProductData[Action.id]);
    }
    if (Action.type) {
      updateModalState();
    }
  }, [Action, ProductData, IsOpen]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize="text-lg" fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code number",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type_component",
      key: "type_component",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Sub type",
      dataIndex: "subtype_btw",
      key: "subtype_btw",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "BTW HOURS",
      dataIndex: "driving_hours",
      key: "driving_hours",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text?.substring(0, text?.indexOf(":")).toUpperCase()}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Observation Hours",
      dataIndex: "observation",
      key: "observation",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text ?? 0}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <Space size="middle">
            <ButtonComponent
              defaultBg={bg}
              defaultHoverBg={hover}
              borderRadius={5}
              style={{ width: 128 }}
            >
              {text.toUpperCase()}
            </ButtonComponent>
          </Space>
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
              to={"/admin/modals/management-service/product/" + item?.id}
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

  return { data: ProductData, columns };
};
