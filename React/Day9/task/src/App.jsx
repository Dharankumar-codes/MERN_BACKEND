
import { useState } from "react";

const App = () => {
  // Task 1: Name Change
  const [name, setName] = useState("Arun");

  // Task 2: Counter
  const [count, setCount] = useState(0);

  // Task 3: Show / Hide
  const [show, setShow] = useState(false);

  // Task 4: Input Name
  const [inputName, setInputName] = useState("");

  // Task 5: Like Button
  const [likes, setLikes] = useState(0);

  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-8">

      {/* Task 1: Name Change */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">1. Name Change</h2>
        <p className="my-3">Name: {name}</p>
        <button
          onClick={() => setName("Kumar")}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Change Name
        </button>
      </div>

      {/* Task 2: Counter */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">2. Counter</h2>
        <p className="my-3 text-2xl">{count}</p>

        <div className="flex gap-3">
          <button
            onClick={() => setCount(count + 1)}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Increase
          </button>

          <button
            onClick={() => setCount(count - 1)}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Decrease
          </button>

          <button
            onClick={() => setCount(0)}
            className="rounded bg-gray-700 px-4 py-2 text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Task 3: Show / Hide */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">3. Show / Hide</h2>

        <button
          onClick={() => setShow(!show)}
          className="my-3 rounded bg-purple-500 px-4 py-2 text-white"
        >
          {show ? "Hide" : "Show"}
        </button>

        {show && <p>Welcome to React</p>}
      </div>

      {/* Task 4: Input Name */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">4. Input Name</h2>

        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter your name"
          className="my-3 rounded border border-gray-300 p-2"
        />

        <p>Your name: {inputName}</p>
      </div>

      {/* Task 5: Like Button */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">5. Like Button</h2>
        <p className="my-3 text-2xl">Likes: {likes}</p>

        <button
          onClick={() => setLikes(likes + 1)}
          className="rounded bg-pink-500 px-4 py-2 text-white"
        >
          ❤️ Like
        </button>
      </div>

    </div>
  );
};

export default App;
