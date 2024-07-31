import { Paragraph } from "@/components/title/index.jsx";
import { SlCloudDownload } from "react-icons/sl";
import moment from "moment";

export const RecentItem = ({ name, date }) => {
  const now = moment();
  date = moment(date);

  const diffDays = now.diff(date, "days");

  let displayDate;

  if (diffDays <= 1) {
    displayDate = date?.fromNow();
  } else {
    displayDate = date?.format("DD.MM.YYYY");
  }

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-5">
        <button className={"border-2 border-indigo-700 rounded p-1 text-black"}>
          <SlCloudDownload />
        </button>

        <Paragraph className={"text-gray-600"}>{name}</Paragraph>
      </div>

      <Paragraph className={"text-gray-500"} fontSize={"text-sm"}>
        {displayDate}
      </Paragraph>
    </div>
  );
};
