import { useRef, useState } from "react";
import CustomEditor from "./components/CustomEditor/CustomEditor";
import { Switch, Radio } from "antd";

function App() {
  const editorRef = useRef();
  const [read, setRead] = useState(true);
  const [selectedContentKey, setSelectedContentKey] = useState("one");

  const contents = {
    one: {
      time: 1635603431943,
      blocks: [
        {
          id: "header1",
          type: "header",
          data: { text: "Editor.js - Version 1", level: 2 },
        },
        {
          id: "para1",
          type: "paragraph",
          data: {
            text: "This is the first version of the content.",
          },
        },
      ],
    },
    two: {
      time: 1635603431944,
      blocks: [
        {
          id: "header2",
          type: "header",
          data: { text: "Editor.js - Version 2", level: 2 },
        },
        {
          id: "para2",
          type: "paragraph",
          data: {
            text: "Now you're viewing the second version.",
          },
        },
      ],
    },
    three: {
      time: 1635603431945,
      blocks: [
        {
          id: "header3",
          type: "header",
          data: { text: "Editor.js - Version 3", level: 2 },
        },
        {
          id: "para3",
          type: "paragraph",
          data: {
            text: "This is the third content version.",
          },
        },
      ],
    },
  };

  const content = contents[selectedContentKey];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <Switch checked={read} onChange={(e) => setRead(e)} /> Read Mode
      </div>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group
          value={selectedContentKey}
          onChange={(e) => setSelectedContentKey(e.target.value)}
        >
          <Radio value="one">Version 1</Radio>
          <Radio value="two">Version 2</Radio>
          <Radio value="three">Version 3</Radio>
        </Radio.Group>
      </div>

      <CustomEditor
        name={`custom-${selectedContentKey}`} // update name to trigger full reinit
        editorRef={editorRef}
        readMode={read}
        content={content}
      />
    </div>
  );
}

export default App;