import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import FilesStyle from "@/pages/student/student-account.module.scss";
import {
  useRequestDeleteMutation,
  useRequestIdQuery,
} from "@/redux/query/index.jsx";
import { Tooltip } from "antd";
import classNames from "classnames";
import { useContext } from "react";
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlCloudDownload } from "react-icons/sl";
import moment from "moment";
import { Link } from "react-router-dom";

export const FileItem = ({ note, name, file, date, category, by, id }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestDelete] = useRequestDeleteMutation();
  const { data: Staffdata } = useRequestIdQuery({
    path: "/student_account/instructor",
    id: by ?? 0,
  });

  const onDelete = async () => {
    try {
      const response = await requestDelete({
        path: "/student_account/files",
        id,
      });

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <div
        className={classNames(
          FilesStyle["File__item"],
          "py-3.5 flex justify-between items-center w-80 justify-between px-5 bg-white border border-indigo-700 rounded-2xl",
        )}
      >
        <Paragraph className={"text-base"}>{name ?? "File name"}</Paragraph>
        <Paragraph className={"text-base"}>
          {category ?? "File format"}
        </Paragraph>
      </div>

      <div className={"space-x-1 items-center"}>
        <Link to={file} target={"_blank"}>
          <IconComponent
            className={`text-base border border-indigo-700 rounded-lg ${FilesStyle["File__item"]}`}
            icon={<AiOutlineEye />}
            style={{ padding: "4px 4px 0" }}
          />
        </Link>

        <Link to={file} download target={"_blank"}>
          <IconComponent
            className={`text-base border border-indigo-700 rounded-lg ${FilesStyle["File__item"]}`}
            icon={<SlCloudDownload />}
            style={{ padding: "4px 4px 0" }}
          />
        </Link>

        <Tooltip
          title={
            <div className={"px-5 py-3 space-y-2.5"}>
              <Paragraph>
                Uploaded By Staff: {Staffdata?.first_name}{" "}
                {Staffdata?.last_name}
              </Paragraph>
              <Paragraph>
                Uploaded Date: {moment(date)?.format("YYYY-MM-DD")}
              </Paragraph>
            </div>
          }
          color={colorsObject.main}
        >
          <IconComponent
            className={`text-base border border-indigo-700 rounded-lg ${FilesStyle["File__item"]}`}
            icon={<AiOutlineInfoCircle />}
            style={{ padding: "4px 4px 0" }}
          />
        </Tooltip>
        <IconComponent
          className={`text-base border border-indigo-700 rounded-lg ${FilesStyle["File__item"]}`}
          icon={<RiDeleteBin6Line />}
          style={{ padding: "4px 4px 0" }}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
