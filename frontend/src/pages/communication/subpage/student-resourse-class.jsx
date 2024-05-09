import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useState } from "react";

export const StudentResourcesClass = () => {
  const [value, setValue] = useState(`**Hello world class!!!**`);
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
