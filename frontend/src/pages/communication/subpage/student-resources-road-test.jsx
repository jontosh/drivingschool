import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export const StudentResourcesRoadTest = () => {
  const [value, setValue] = useState(`**Hello world Road test!!!**`);
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
