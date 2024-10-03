import Title from "@/components/title/index.jsx";
import { FileItem } from "@/pages/student/items/file-item.jsx";
import Upload from "@/pages/student/upload.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";

export const Files = () => {
  const studentId = useURLSearchParams("studentId");
  const { data } = useRequestGetQuery({ path: "/student_account/files/" });

  const fileItem = data?.map((file, index) => (
    <Fragment key={index}>
      <FileItem {...file} />
    </Fragment>
  ));

  return (
    <div className={"pt-5"}>
      <div className="grid  xl:grid-cols-2 gap-5">
        <div>
          <Title fontSize={"text-2xl text-indigo-700"} titleMarginBottom={28}>
            Files
          </Title>

          <div className="space-y-5">{fileItem}</div>
        </div>
        <div>
          <Title fontSize={"text-2xl text-indigo-700"} titleMarginBottom={28}>
            Upload files
          </Title>

          <Upload className={"w-3/4 mx-auto"} id={studentId} />
        </div>
      </div>
    </div>
  );
};
