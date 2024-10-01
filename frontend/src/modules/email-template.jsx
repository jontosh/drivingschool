import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { Form, Space } from "antd";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { LuSmartphone } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";

const EmailNameCell = ({ text }) => (
  <Paragraph className="text-start" fontSize="text-base" fontWeightStrong={400}>
    {text}
  </Paragraph>
);

const EmailSubjectCell = ({ text }) => (
  <Paragraph className="text-start" fontSize="text-base" fontWeightStrong={400}>
    {text}
  </Paragraph>
);

const ActionIcons = ({ keywords = [], data }) => {
  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [IsOpen, setIsOpen] = useState(false);
  const [Action, setAction] = useState({ id: undefined, index: undefined });
  const [form] = Form.useForm();

  const { data: TempItemData } = useRequestIdQuery({
    path: "/communication/template",
    id: Action?.index,
  });

  const [requestPatch, { reset }] = useRequestPatchMutation();

  useEffect(() => {
    form?.setFieldsValue(TempItemData);
  }, [TempItemData, IsOpen]);

  useEffect(() => {
    if (keywords.length > 0) {
      dispatch({
        type: "EMAIL",
        onFinish: async (values) => {
          const response = await requestPatch({
            path: "/communication/template",
            id: Action?.index,
            data: values,
          });

          if (response?.data) {
            setIsOpen(false);
            reset();
          } else {
            dispatch({
              type: "ERROR",
              data: response?.error?.data,
              open: IsOpen,
              onEvent: () => setIsOpen(false),
            });
          }
        },
        onCancel: () => {
          setIsOpen(false);
        },
        open: IsOpen,
        width: 1250,
        form,
        keywords,
      });
    }

    document.body.style.overflow = "";
  }, [IsOpen, keywords?.length]);

  return (
    <div className="space-x-2">
      {[TbEdit, LuSmartphone, AiOutlineEye, IoTimeOutline].map(
        (Icon, index) => {
          return (
            <Fragment key={index}>
              <IconComponent
                key={index}
                className="text-2xl border border-indigo-600 rounded-lg px-1 pt-1"
                icon={<Icon />}
                onClick={() => {
                  setAction({ id: index, index: data?.id });
                  setIsOpen(TbEdit === Icon);
                }}
              />
              {Action.id === index && state?.modal}
            </Fragment>
          );
        },
      )}
    </div>
  );
};

export const EmailTemplateModule = (keywords = []) => {
  const { colorsObject } = useContext(ColorsContext);

  const { data } = useRequestGetQuery({
    path: "/communication/template/",
  });

  const columns = useMemo(
    () => [
      {
        title: "Email name",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (text) => <EmailNameCell text={text} />,
      },
      {
        title: "Email text",
        dataIndex: "template",
        key: "template",
        align: "center",
        render: (text) => (
          <EmailSubjectCell
            text={text?.length > 255 ? text?.substring(0, 255) + "..." : text}
          />
        ),
      },
      {
        title: "Sending",
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
        dataIndex: "id",
        key: "id",
        align: "center",
        width: 200,
        render: (_, record) => (
          <ActionIcons keywords={keywords} data={record} />
        ),
      },
    ],
    [colorsObject],
  );

  return { columns, data };
};
