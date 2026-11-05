import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;

    case "reset":
      return 0;

    default:
      return state;
  }
};

const Task1 = () => {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-5">
          Counter Application
        </h1>

        <h2 className="text-4xl font-bold mb-6">
          {count}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Increment
          </button>

          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decrement
          </button>

          <button
            onClick={() => dispatch({ type: "reset" })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task1;