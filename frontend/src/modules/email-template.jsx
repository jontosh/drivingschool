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
  const { subpage } = useParams();

  // Demo shablonlar
  const demoTemplates = [
    // Student portal shablonlari
    {
      id: 1,
      name: "Welcome Email",
      template: "Dear {{student_name}}, welcome to our driving school! We are excited to have you as our student.",
      status: "active",
      type: "student",
      studentInfo: "New Student",
    },
    {
      id: 2,
      name: "Exam Reminder",
      template: "Dear {{student_name}}, this is a reminder that your driving exam is scheduled for {{exam_date}}.",
      status: "active",
      type: "student",
      studentInfo: "Enrolled Student",
    },

    // Staff mobile shablonlari
    {
      id: 3,
      name: "Schedule Update",
      template: "Dear {{instructor_name}}, your teaching schedule has been updated for the week of {{week_start}}.",
      status: "active",
      type: "staff",
      staffType: "Instructor",
    },
    {
      id: 4,
      name: "New Student Assignment",
      template: "Dear {{instructor_name}}, a new student {{student_name}} has been assigned to you.",
      status: "active",
      type: "staff",
      staffType: "Instructor",
    },

    // Admin portal shablonlari
    {
      id: 5,
      name: "Monthly Report",
      template: "Dear {{admin_name}}, the monthly report for {{month}} is now available.",
      status: "active",
      type: "admin",
      adminPermission: "Full Access",
    },
    {
      id: 6,
      name: "System Update",
      template: "Dear {{admin_name}}, the system will be updated on {{update_date}}. Please prepare accordingly.",
      status: "active",
      type: "admin",
      adminPermission: "System Admin",
    },

    // Reminders shablonlari
    {
      id: 7,
      name: "Payment Reminder",
      template: "Dear {{student_name}}, this is a reminder that your payment of {{payment_amount}} is due on {{payment_date}}.",
      status: "active",
      type: "reminder",
      reminderTime: "3 days before due date",
      repeat: "Weekly",
    },
    {
      id: 8,
      name: "Lesson Reminder",
      template: "Dear {{student_name}}, this is a reminder that your driving lesson is scheduled for {{lesson_date}} with {{instructor_name}}.",
      status: "active",
      type: "reminder",
      reminderTime: "1 day before lesson",
      repeat: "No",
    },
  ];

  const { data: allTemplates, isLoading, isError } = useRequestGetQuery({
    path: "/communication/template/",
  });

  // Agar API dan ma'lumotlar kelsa, ularni ishlat, aks holda demo shablonlarni ko'rsat
  const templatesData = useMemo(() => {
    // API so'rovi yuborilayotgan bo'lsa yoki xatolik bo'lsa, demo shablonlarni ko'rsat
    if (isLoading || isError || !allTemplates || allTemplates.length === 0) {
      return demoTemplates;
    }
    return allTemplates;
  }, [allTemplates, isLoading, isError, demoTemplates]);

  // Subpage asosida ma'lumotlarni filtrlash
  const filteredData = useMemo(() => {
    if (!templatesData) return [];

    switch (subpage) {
      case "student-portal":
        return templatesData.filter((template) => template.type === "student");
      case "staff-mobile":
        return templatesData.filter((template) => template.type === "staff");
      case "admin-portal":
        return templatesData.filter((template) => template.type === "admin");
      case "reminders":
        return templatesData.filter((template) => template.type === "reminder");
      default:
        return templatesData;
    }
  }, [templatesData, subpage]);

  // Har bir subpage uchun alohida ustunlar
  const columns = useMemo(() => {
    // Asosiy ustunlar
    const baseColumns = [
      {
        title: "Email Name",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (text) => <EmailNameCell text={text} />,
        width: 280,
      },
      {
        title: "Email Text",
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
    ];

    // Subpage asosida qo'shimcha ustunlar
    switch (subpage) {
      case "student-portal":
        return [
          ...baseColumns,
          {
            title: "Student Information",
            dataIndex: "studentInfo",
            key: "studentInfo",
            align: "center",
            render: (text) => <EmailSubjectCell text={text || "Not available"} />,
          },
        ];
      case "staff-mobile":
        return [
          ...baseColumns,
          {
            title: "Staff Type",
            dataIndex: "staffType",
            key: "staffType",
            align: "center",
            render: (text) => <EmailSubjectCell text={text || "Not available"} />,
          },
        ];
      case "admin-portal":
        return [
          ...baseColumns,
          {
            title: "Admin Permission",
            dataIndex: "adminPermission",
            key: "adminPermission",
            align: "center",
            render: (text) => <EmailSubjectCell text={text || "Not available"} />,
          },
        ];
      case "reminders":
        return [
          ...baseColumns,
          {
            title: "Reminder Time",
            dataIndex: "reminderTime",
            key: "reminderTime",
            align: "center",
            render: (text) => <EmailSubjectCell text={text || "Not available"} />,
          },
          {
            title: "Repeat",
            dataIndex: "repeat",
            key: "repeat",
            align: "center",
            render: (text) => <EmailSubjectCell text={text || "No"} />,
          },
        ];
      default:
        return baseColumns;
    }
  }, [colorsObject, subpage]);

  return { columns, data: filteredData };
};
