/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = ({ onChange, language, code, theme, runCode }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl relative">
      <Editor
        height="90vh"
        width={`100%`}
        language={language || "javascript"}
        theme={theme}
        defaultValue="// some comment"
        value={value}
        onChange={handleEditorChange}
      />
      <button
        onClick={runCode}
        className="absolute bottom-10 right-10 rounded bg-blue-700 px-2 py-1 text-xl text-black hover:bg-blue-500 font-semibold"
      >
        RUN CODE
      </button>
    </div>
  );
};

export default CodeEditor;
