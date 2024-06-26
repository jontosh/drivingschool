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

          <Paragraph fontSize={"text-xs font-semibold"}>Mar 09, 2024 @ 01:37 PM</Paragraph>
        </div>

        <div className={"space-x-2.5"}>
          <IconComponent
            iconClass={"text-2xl"}
            icon={<AiFillPrinter className={"bg-[#ECECEC] p-2.5 rounded-xl"} />}
          />

          <IconComponent
            iconClass={"text-2xl"}
            icon={<MdRemoveRedEye className={"bg-[#ECECEC] p-2.5 rounded-xl"} />}
          />

          <IconComponent
            iconClass={"text-2xl"}
            icon={<BiSolidTrash className={"bg-[#ECECEC] p-2.5 rounded-xl"} />}
          />

          <IconComponent
            iconClass={"text-2xl"}
            icon={<FaDownload className={"bg-[#ECECEC] p-2.5 rounded-xl"} />}
          />
        </div>
      </div>
    </div>
  );
};
