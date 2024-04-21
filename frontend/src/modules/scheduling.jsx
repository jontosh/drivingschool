import { Paragraph } from "@/components/title/index.jsx";

export const SchedulingModule = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => (
        <Paragraph
          fontSize={"text-base"}
          fontWeightStrong={500}
          className={"border border-indigo-700 px-2.5 py-4 rounded-xl"}
        >
          {date}
        </Paragraph>
      ),
    },
    {
      title: "Instructor name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
          {name}
        </Paragraph>
      ),
    },
    {
      title: "Pickup Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (location) => (
        <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
          {location}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      date: "Mon, Apr 15, 10:45 AM - 12:45 PM",
      name: "Aminov Makhsudjon",
      location: "Please select",
    },
    {
      date: "Mon, Apr 15, 10:45 AM - 12:45 PM",
      name: "Aminov Makhsudjon",
      location: "Please select",
    },
    {
      date: "Mon, Apr 15, 10:45 AM - 12:45 PM",
      name: "Aminov Makhsudjon",
      location: "Please select",
    },
  ];
  return { columns, data };
};
