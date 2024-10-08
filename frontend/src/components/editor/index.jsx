import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export const Editor = ({ data, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "|",
            "alignment",
            "|",
            "fontfamily",
            "fontsize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "alignment",
            "|",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "blockQuote",
            "|",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "imageUpload",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
          ],
          upload: {
            types: ["jpeg", "png", "gif", "bmp", "webp", "tiff"],
          },
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          tableToolbar: ["bold", "italic"],
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
          ],
        },
        mediaEmbed: {
          previewsInData: true,
        },
        simpleUpload: {
          uploadUrl: import.meta.env.VITE_API_URL + "/student_account/files/",
        },
      }}
      data={`
                    ${data?.template}
                    <br>
                    
                    <img src="${import.meta.env.VITE_LOGO}" alt="Logo" height="200" width="400" />
                    
                    <p class="footer-text">This is an automatically generated email. Please do not reply to this email.</p>
                `}
      onReady={(editor) => {
        console.log("Index is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data, { event, editor });
      }}
    />
  );
};
