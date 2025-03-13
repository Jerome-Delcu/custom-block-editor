import { useRef, useState } from "react";
import CustomEditor from "./components/CustomEditor/CustomEditor";
import { Switch } from "antd";

function App() {
  const editorRef = useRef();
  const [read, setRead] = useState(true);

  const content = {
      time: 1635603431943,
      blocks: [
        {
          id: "sheNwCUP5A",
          type: "header",
          data: { text: "Editor.js", level: 2 },
        },
        {
          id: "12iM3lqzcm",
          type: "paragraph",
          data: {
            text: "Hey. Meet the new Editor. Try to edit this text.",
          },
        },
        {
          id: "FF1iyF3VwN",
          type: "image",
          data: {
            file: {
              url: "https://codex.so/public/app/img/external/codex2x.png",
            },
            caption: "Example Image",
            withBorder: false,
            stretched: false,
            withBackground: false,
          },
        },
        {
          type: "quiz",
          data: {
            question: "What is 2 + 2?",
            options: ["3", "4"],
            correctIndex: 1,
          },
        },
      ],
    }

  return (
    <>
    <div>
      <Switch checked={read} onChange={(e) => setRead(e)} />
    </div>
      <CustomEditor
        name={"custom"}
        editorRef={editorRef}
        readMode={read}
        content={content}
        // imageByFile={`${process.env.REACT_APP_BASE_URL}/upload/editor?org_uuid=${org?.id}&course_id=${courseId}`}
      />
    </>
  );
}

export default App;
