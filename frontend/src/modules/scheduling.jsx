import { Paragraph } from "@/components/title/index.jsx";
import { useMemo } from "react";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import dayjs from "dayjs";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const SchedulingModule = (value = []) => {
  const studentId = useURLSearchParams("studentId");

  const { data } = useRequestGetQuery({ path: "/scheduling/time_slot/" });
  const [requestPost] = useRequestPostMutation();
  const customData = useMemo(() => {
    const now = new Date();

    return (
      data?.reduce((acc, item) => {
        const futureSlots =
          item?.slots?.filter((slot) => now <= new Date(slot?.start)) || [];

        const formattedSlots = futureSlots.map((slot) => ({
          time_slot: item.id,
          location: item.location,
          staff: item.staff,
          date: dayjs(slot?.start).format("ddd, MMM D, h:mm A"),
          start: new Date(slot?.start),
        }));

        if (value.length !== 0) {
          return acc.concat(
            formattedSlots.filter(
              (slot, index) =>
                dayjs(value[index]).format("YYYY-MM-DD") ===
                dayjs(slot.start).format("YYYY-MM-DD"),
            ),
          );
        }

        return acc.concat(formattedSlots);
      }, []) || []
    );
  }, [data, value.length]);

  const onAppointment = async (values) => {
    try {
      await requestPost({
        path: "/scheduling/appointment/",
        data: {
          status: "ACTIVE",
          time_slot: values.time_slot,
          student: [studentId],
        },
      }).reset();
    } catch (e) {
      console.error(e);
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
            <b>Pickup Location:</b> {record?.location}
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

  return { columns, data: customData };
};
