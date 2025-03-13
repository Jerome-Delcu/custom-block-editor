import React, { useEffect } from "react";
import '../../index.css'
import EditorJS from '@editorjs/editorjs'
import { getEditorJsTools } from "../../helper/tools";

const CustomEditor = ({ name, editorRef, readMode, content, imageByFile }) => {

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: name,
        readOnly: readMode,
        tools: getEditorJsTools(imageByFile),
        data: content
        // data: {
        //   time: 1635603431943,
        //   blocks: [
        //     {
        //       id: "sheNwCUP5A",
        //       type: "header",
        //       data: { text: "Editor.js", level: 2 },
        //     },
        //     {
        //       id: "12iM3lqzcm",
        //       type: "paragraph",
        //       data: {
        //         text: "Hey. Meet the new Editor. Try to edit this text.",
        //       },
        //     },
        //     {
        //       id: "FF1iyF3VwN",
        //       type: "image",
        //       data: {
        //         file: {
        //           url: "https://codex.so/public/app/img/external/codex2x.png",
        //         },
        //         caption: "Example Image",
        //         withBorder: false,
        //         stretched: false,
        //         withBackground: false,
        //       },
        //     },
        //     {
        //       type: "quiz",
        //       data: {
        //         question: "What is 2 + 2?",
        //         options: ["3", "4"],
        //         correctIndex: 1,
        //       },
        //     },
        //   ],
        // },
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id={name} />;
};

export default CustomEditor