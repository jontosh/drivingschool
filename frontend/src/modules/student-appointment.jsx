import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { useEffect, useState } from "react";
import moment from "moment";

export const AppointmentsModule = (id) => {
  const { data } = useRequestIdQuery({
    path: "/page_api/student",
    id,
  });
  const { data: StaffData } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });

  const [StudentAppointment, setStudentAppointment] = useState(null);

  useEffect(() => {
    const appointments = [];

    for (let i = 0; i < StaffData?.length; i++) {
      const staff = StaffData[i];

      for (let j = 0; j < data?.appointments[0]?.student?.length; j++) {
        const appointment = data?.appointments[0]?.student[j];

        if (staff?.id === appointment?.staff) {
          appointments.push({
            // ...appointment,
            status: appointment?.status,
            instructor: staff?.first_name + " " + staff?.last_name,
            type: appointment?.type,
            note: appointment?.note,
            vehicle: data?.appointments[0]?.time_slot?.vehicle?.name,
            date: moment(data?.appointments[0]?.time_slot?.date)?.format(
              "ddd, MMM D YYYY",
            ),
            location: data?.appointments[0]?.time_slot?.location?.name,
            pu_location: data?.appointments[0]?.time_slot?.pu_location,
            product: data?.appointments[0]?.time_slot?.type,
          });
        }
      }
    }
    setStudentAppointment(appointments);
  }, [StaffData, data]);

  const columns = [
    {
      title: "Appent Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => <Paragraph fontSize={"text-lg"}>{date}</Paragraph>,
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
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Pickup Location",
      dataIndex: "pu_location",
      key: "pu_location",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Position",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Notes",
      dataIndex: "note",
      key: "note",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
    {
      title: "Vehicle Name",
      dataIndex: "vehicle",
      key: "vehicle",
      align: "center",
      render: (text) => <Paragraph fontSize={"text-lg"}>{text}</Paragraph>,
    },
  ];

  // console.log(data?.appointments[0]?.student);

  return { columns, data: StudentAppointment };
};
