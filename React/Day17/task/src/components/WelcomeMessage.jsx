
import { useState, useEffect } from "react";

const WelcomeMessage = () => {
  const [message, setMessage] = useState("Please Wait...");
  const [restart, setRestart] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Welcome to React!");
    }, 3000);

    return () => clearTimeout(timer);
  }, [restart]);

  const handleRestart = () => {
    setMessage("Please Wait...");
    setRestart((prev) => prev + 1);
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default WelcomeMessage;
