import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Editor(props) {
  const [editMode, setEditMode] = useState(true);
  const { data, setData } = props;

  useEffect(() => {
    console.log("useEffect editor with data: " + data);
  }, [data]);

  return (
    <div className="root">
      {console.log("rendering editor with data: " + data)}
      {editMode ? (
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => setData(editor.getData())}
          disabled={false}
        />
      ) : (
        <CKEditor
          config={{ toolbar: [] }}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          disabled={true}
        />
      )}
    </div>
  );
}
