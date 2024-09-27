import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
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
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { useParams } from "react-router-dom";

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

const ActionIcons = ({ data }) => {
  const [state, dispatch] = useReducer(ModalReducer, { modal: false });
  const [RowId, setRowId] = useState(null);
  const [IsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { subpage } = useParams();
  const portalPath = useMemo(
    () =>
      subpage === "student-portal"
        ? "/page_api/student_email_templates"
        : "/page_api/instructor_email_templates",
    [subpage],
  );
  const [requestPatch, { reset }] = useRequestPatchMutation();
  const { data: KeywordsData } = useRequestGetQuery({ path: portalPath });

  useEffect(() => {
    dispatch({
      type: "EMAIL",
      open: IsOpen,
      onCancel: () => setIsOpen(false),
      width: 1360,
      form,
      data,
      onFinish: async (values) => {
        try {
          await requestPatch({
            path: "/communication/template",
            id: data?.id,
            data: values,
          })
            .unwrap()
            .then(() => {
              reset();

              setTimeout(() => {
                setIsOpen(false);
              }, 1000);
            });
        } catch (e) {
          console.error(e);
        }
      },
      keywords: KeywordsData?.map((item) => `{{${item}}}`),
    });
  }, [IsOpen]);
  return (
    <div className="space-x-2">
      {[TbEdit, LuSmartphone, AiOutlineEye, IoTimeOutline].map(
        (Icon, index) => {
          return (
            <Fragment key={index}>
              <IconComponent
                key={index}
                className="text-2xl border border-indigo-600 rounded-lg p-1"
                icon={<Icon />}
                onClick={() => {
                  setRowId(index);
                  setIsOpen(true);
                }}
              />
              {index === RowId && state?.modal}
            </Fragment>
          );
        },
      )}
    </div>
  );
};

export const EmailTemplateModule = () => {
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
        width: 280,
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
        width: 320,
        render: (_, record) => {
          return <ActionIcons data={record} />;
        },
      },
    ],
    [colorsObject],
  );

  return { columns, data };
};
