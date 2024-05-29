import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";

export const SchedulingModule = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Fragment>
          <Paragraph
            fontSize={"text-xs text-white"}
            fontWeightStrong={500}
            className={"bg-[#24C18F] px-2.5 py-4 rounded-xl text-center"}
          >
            {date}
          </Paragraph>
          <Paragraph fontSize={"text-[10px]"} className={"mt-2.5"}>
            <b>Pickup Location:</b> Mason + Weschester + Mainville
          </Paragraph>
        </Fragment>
      ),
    },
    {
      title: "Instructor name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <Paragraph fontWeightStrong={400} fontSize={"text-xs"} className={"ml-10"}>
          {name}
        </Paragraph>
      ),
    },
  ];
  const data = [
    {
      date: "FRI, JUN 7, 3:00 PM-5:00 PM",
      name: "Aminov Makhsudjon",
    },
    {
      date: "FRI, JUN 7, 3:00 PM-5:00 PM",
      name: "Aminov Makhsudjon",
    },
    {
      date: "FRI, JUN 7, 3:00 PM-5:00 PM",
      name: "Aminov Makhsudjon",
    },
  ];
  return { columns, data };
};
