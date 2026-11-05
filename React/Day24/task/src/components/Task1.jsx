import { useState, useMemo } from "react";

// Function outside component
const calculateDouble = (num) => {
  console.log("Calculation Running...");

  // Expensive calculation simulation
  for (let i = 0; i < 1000000; i++) {}

  return num * 2;
};

const Task1 = () => {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState("light");

  const result = useMemo(() => {
    return calculateDouble(number);
  }, [number]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      <div className="text-center space-y-5">
        <h1 className="text-3xl font-bold">
          Number Multiplication
        </h1>

        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="border p-3 rounded text-black bg-white"
        />

        <h2 className="text-2xl">
          Result: {result}
        </h2>

        <button
          onClick={toggleTheme}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default Task1;