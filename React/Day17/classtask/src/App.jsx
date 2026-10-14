import { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("timer");
    return savedCount ? Number(savedCount) : 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("timer", count);
  }, [count]);

  const resetTimer = () => {
    setCount(0);
    localStorage.setItem("timer", 0);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Timer</h1>

      <h2 className="text-2xl mt-4">{count} seconds</h2>

      <button
        onClick={resetTimer}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Reset Timer
      </button>
    </div>
  );
};

export default App;
