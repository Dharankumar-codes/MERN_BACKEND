import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeDisplay = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        theme === "Light"
          ? "bg-gray-100 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-5">
          Current Theme: {theme}
        </h1>

        <button
          onClick={toggleTheme}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeDisplay;