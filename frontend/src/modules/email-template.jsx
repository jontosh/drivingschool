import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { Form } from "antd";
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
  <Paragraph
    className="text-center"
    fontSize="text-base"
    fontWeightStrong={400}
  >
    {text}
  </Paragraph>
);

const SendingStatusButton = ({ status, colorsObject }) => (
  <ButtonComponent
    defaultBg={status ? colorsObject.success : colorsObject.danger}
    defaultHoverBg={status ? colorsObject.success : colorsObject.danger}
    defaultColor={colorsObject.main}
    defaultHoverColor={colorsObject.main}
    borderRadius={5}
    paddingInline={43}
    controlHeight={40}
    className="shadow-[#00000040]"
  >
    {status ? "Active" : "Not active"}
  </ButtonComponent>
);

const ActionIcons = () => {
  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [IsOpen, setIsOpen] = useState(false);
  const [Action, setAction] = useState({ id: undefined });
  const [form] = Form.useForm();

  useEffect(() => {
    document.body.style.overflow = "";

    dispatch({
      type: "EMAIL",
      onFinish: async (values) => {
        console.log(values);
        setIsOpen(false);
      },
      onCancel: () => {
        setIsOpen(false);
      },
      open: IsOpen,
      width: 1250,
      form,
    });
  }, [IsOpen]);

  return (
    <div className="space-x-2">
      {[TbEdit, LuSmartphone, AiOutlineEye, IoTimeOutline].map(
        (Icon, index) => (
          <Fragment key={index}>
            <IconComponent
              key={index}
              className="text-2xl border border-indigo-600 rounded-lg p-1"
              icon={<Icon />}
              onClick={() => {
                setAction({ id: index });
                setIsOpen(TbEdit === Icon);
              }}
            />
            {Action.id === index && state?.modal}
          </Fragment>
        ),
      )}
    </div>
  );
};

export const EmailTemplateModule = () => {
  const { colorsObject } = useContext(ColorsContext);

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
        title: "Email subject",
        dataIndex: "subject",
        key: "subject",
        align: "center",
        render: (text) => <EmailSubjectCell text={text} />,
      },
      {
        title: "Sending",
        dataIndex: "sending",
        key: "sending",
        align: "center",
        render: (status) => (
          <SendingStatusButton status={status} colorsObject={colorsObject} />
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        render: () => <ActionIcons />,
      },
    ],
    [colorsObject],
  );

  const data = useMemo(
    () => [
      {
        name: "Billing payment Confirmation",
        subject: "Payment successful",
        sending: true,
      },
      {
        name: "Billing payment Confirmation",
        subject: "Payment successful",
        sending: true,
      },
      {
        name: "Billing payment Confirmation",
        subject: "Payment successful",
        sending: true,
      },
    ],
    [],
  );

  return { columns, data };
};
