import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export const StudentResourcesInCar = () => {
  const [value, setValue] = useState(`**Hello world In-car!!!**`);
  return (
    <MDEditor
      value={value}
      onChange={setValue}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
};
