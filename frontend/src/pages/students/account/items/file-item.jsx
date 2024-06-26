import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { AiFillPrinter } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { FaDownload, FaFilePdf } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";

export const FileItem = ({ ...props }) => {
  return (
    <div className="border rounded-2xl p-5">
      <div className="flex gap-6 items-center justify-between">
        <div className={"space-y-2.5"}>
          <IconComponent
            iconClass={"text-3xl"}
            icon={<FaFilePdf className={"bg-black p-1.5 rounded text-white"} />}
            vertical={"items-center"}
            spaceIconX={2.5}
            className={"cursor-default font-bold"}
          >
            Student Contract
          </IconComponent>

          <Paragraph>Mar 09, 2024 @ 01:37 PM</Paragraph>
        </div>

        <div className={"space-x-2.5"}>
          <IconComponent
            iconClass={"text-3xl"}
            icon={<AiFillPrinter className={"bg-gray-400 p-1.5 rounded"} />}
          />

          <IconComponent
            iconClass={"text-3xl"}
            icon={<MdRemoveRedEye className={"bg-gray-400 p-1.5 rounded"} />}
          />

          <IconComponent
            iconClass={"text-3xl"}
            icon={<BiSolidTrash className={"bg-gray-400 p-1.5 rounded"} />}
          />

          <IconComponent
            iconClass={"text-3xl"}
            icon={<FaDownload className={"bg-gray-400 p-1.5 rounded"} />}
          />
        </div>
      </div>
    </div>
  );
};
