/* eslint-disable react/prop-types */
import Select from "react-select";

const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme }) => {
  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="navbar flex items-center pl-20 w-full h-16 text-center text-white bg-gray-700 gap-4">
      <h1>Online Code Compiler</h1>
      <Select
        options={languages}
        value={userLang}
        onChange={(e) => setUserLang(e.value)}
        placeholder={userLang}
        className="w-32 text-black bg-gray-700"
        classNamePrefix="tw-select"
      />
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
        className="w-32 text-black bg-gray-700"
        classNamePrefix="tw-select"
      />
    </div>
  );
};

export default Navbar;
