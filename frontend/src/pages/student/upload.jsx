import IconComponent from "@/components/icons/index.jsx";
import { message, Upload as UPLOAD } from "antd";
import classNames from "classnames";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = UPLOAD;
const props = {
  name: "file",
  multiple: true,
  action: "http://localhost:5173/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  defaultFileList: [
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      url: "http://www.baidu.com/xxx.png",
      percent: 33,
    },
    {
      uid: "2",
      name: "zzz.png",
      status: "error",
      response: "Server Error 500",
      // custom error message to show
      url: "http://www.baidu.com/zzz.png",
    },
  ],
};
const Upload = ({ children, className }) => {
  className = classNames(className);
  return (
    <Dragger {...props} className={className} style={{ background: "#fff" }}>
      <IconComponent
        className={"text-indigo-700 text-6xl mb-2.5"}
        icon={<AiOutlineCloudUpload />}
      />
      {children}
    </Dragger>
  );
};
export default Upload;
