import React, { useEffect, useState } from "react";
import "../../index.css";
import EditorJS from "@editorjs/editorjs";
import { getEditorJsTools } from "../../helper/tools";

const CustomEditor = ({ name, editorRef, readMode, content, imageByFile }) => {
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    // Delay mount to ensure container div is in the DOM
    setReadyToRender(true);
  }, []);

  useEffect(() => {
    if (!readyToRender) return;

    let editor;

    const initEditor = async () => {
      try {
        editor = new EditorJS({
          holder: name,
          readOnly: readMode,
          tools: getEditorJsTools(imageByFile),
          data: content,
          onReady: () => {
            editorRef.current = editor;
          },
        });
      } catch (err) {
        console.error("EditorJS initialization error:", err);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.isReady
          .then(() => editor.destroy())
          .catch((e) => console.warn("Error destroying editor", e));
      }
    };
  }, [readyToRender, name, content, readMode, imageByFile]);

  return <div id={name} />;
};

export default CustomEditor;