
import { useState } from "react";

const App = () => {
  const [fruit, setFruit] = useState("");
  const [fruits, setFruits] = useState([]);

  const addFruit = () => {
    if (fruit.trim() === "") return;

    setFruits([...fruits, fruit]);
    setFruit("");
  };

  return (
    <div>
      <h1>Fruit List</h1>

      <input
        type="text"
        placeholder="Enter fruit name"
        value={fruit}
        onChange={(e) => setFruit(e.target.value)}
      />

      <button onClick={addFruit}>Add Fruit</button>

      {fruits.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default App;
