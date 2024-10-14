import { Paragraph } from "@/components/title/index.jsx";
import { useMemo } from "react";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import dayjs from "dayjs";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { ActiveData } from "@/hooks/filter.jsx";
import { Modal, Timeline } from "antd";

export const SchedulingModule = (values = []) => {
  const studentId = useURLSearchParams("studentId");

  const { data } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const [requestPost, { reset }] = useRequestPostMutation();

  const TimeSlot = useMemo(() => {
    if (!data) return [];

    const openSlot = ActiveData(data)
      ?.map((timeSlot) => {
        if (
          dayjs(new Date()).format("YYYY-MM-DD") <=
          dayjs(timeSlot?.date).format("YYYY-MM-DD")
        ) {
          return timeSlot?.slots?.reduce(
            (_, currentValue) => ({
              staff: timeSlot?.staff_name,
              date: dayjs(currentValue?.start).format("ddd, MMM D, hh:mm A"),
              time: currentValue?.start,
              location_name: timeSlot?.pu_location,
              id: timeSlot?.id,
            }),
            0,
          );
        }
      })
      .filter(Boolean);

    if (values?.length > 0) {
      return values
        ?.map((value) =>
          openSlot?.find(
            (slot) =>
              dayjs(slot?.time).format("YYYY-MM-DD") ===
              dayjs(value).format("YYYY-MM-DD"),
          ),
        )
        .filter(Boolean);
    }

    return openSlot;
  }, [data, values]);

  const onAppointment = async (data) => {
    try {
      const { error } = await requestPost({
        path: "/scheduling/appointment/",
        data: {
          status: "ACTIVE",
          time_slot: data?.id,
          student: [studentId],
        },
      }).catch(console.error);

      if (error?.status >= 400) {
        Modal.error({
          title: "Error message",
          content: (
            <Timeline
              items={Object.values(error?.data).map((item) => ({
                children: item[0],
              }))}
            />
          ),
        });
      } else {
        Modal.success({
          title: "Success",
          onOk: () => reset(),
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <>
          <Paragraph
            fontSize="text-xs text-white"
            fontWeightStrong={500}
            className="bg-[#24C18F] px-2.5 py-4 rounded-xl text-center cursor-pointer"
            onClick={() => onAppointment(record)}
          >
            {record?.date}
          </Paragraph>
          <Paragraph fontSize="text-[10px]" className="mt-2.5">
            <b>Pickup Location:</b> {record?.location_name}
          </Paragraph>
        </>
      ),
    },
    {
      title: "Instructor name",
      dataIndex: "staff",
      key: "staff",
      align: "center",
      render: (name) => (
        <Paragraph fontWeightStrong={400} fontSize="text-xs" className="ml-10">
          {name}
        </Paragraph>
      ),
    },
  ];

  return { columns, data: TimeSlot };
};
