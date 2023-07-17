import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Navbar from "./Navbar";
import { executeCode } from "../api/index";

const Home = () => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [userTheme, setUserTheme] = useState("vs-dark");

  const handleChange = (value) => {
    setValue(value);
  };

  const runCode = async () => {
    try {
      setOutput("");
      setIsCompiling(true); // Set isCompiling to true before making the API call
      const response = await executeCode({ code: value, language: language });
      const { data } = response;
      setOutput(data.output);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompiling(false); // Set isCompiling to false after the API call is completed (including error case)
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-col overflow-hidden px-2">
      <Navbar
        userLang={language}
        setUserLang={setLanguage}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
      />
      <div className="grid grid-cols-3 gap-4 my-2">
        <div className="col-span-3 sm:col-span-2 bg-black">
          <CodeEditor
            onChange={handleChange}
            code=""
            language="python"
            theme={userTheme}
            runCode={runCode}
          />
        </div>
        <div className="col-span-3 sm:col-span-1 w-full h-full rounded">
          <div className="w-full h-1/2 bg-neutral-800 p-4">
            <h2 className="text-green-600 text-xl font-bold "> Output: </h2>
            <p className="text-lg font-semibold text-white mt-3 ">{output}</p>
            {isCompiling && (
              <p className="font-medium text-lg text-white ">compiling</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
