import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { useContext, useMemo } from "react";
import ColorsContext from "@/context/colors.jsx";
import dayjs from "dayjs";

export const AppointmentsModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const studentId = useURLSearchParams("studentId");
  const { data: StudentAPI } = useRequestIdQuery({
    path: "/page_api/student",
    id: studentId,
  });
  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });

  const appointments = useMemo(() => {
    if (!StudentAPI || !Instructors) return [];

    return StudentAPI?.appointments?.map((appointment) => {
      const staff = appointment?.student[0];
      const instructor = Instructors?.find(
        (instructor) => instructor?.id === staff?.staff,
      );
      return {
        date: dayjs(appointment?.time_slot?.date)?.format("DD/MM/YYYY"),
        by: `${instructor?.first_name} ${instructor?.last_name}`,
        appnt: dayjs(appointment?.time_slot?.date)?.format("dddd, MMM D, YYYY"),
        status: appointment?.time_slot?.status,
      };
    });
  }, [Instructors, StudentAPI]);

  const columns = [
    {
      title: "Appt Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => <Paragraph fontSize={"text-lg"}>{date}</Paragraph>,
    },
    {
      title: "Appt Modified",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (time) => <Paragraph fontSize={"text-lg"}>{time}</Paragraph>,
    },
    {
      title: "Appt Modified By",
      dataIndex: "by",
      key: "by",
      align: "center",
      render: (by) => <Paragraph fontSize={"text-lg"}>{by}</Paragraph>,
    },
    {
      title: "Appt Created By",
      dataIndex: "by",
      key: "by",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Appnt Date",
      dataIndex: "appnt",
      key: "appnt",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => <Paragraph fontSize={"text-lg"}>{time}</Paragraph>,
    },
    {
      title: "App Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const { hover, bg } = CheckProgress(status);
        return (
          <ButtonComponent
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            defaultHoverBg={hover}
            defaultBg={bg}
            paddingInline={43}
            borderRadius={5}
          >
            {status?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
  ];

  return { columns, data: appointments };
};
