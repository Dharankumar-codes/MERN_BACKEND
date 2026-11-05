import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + action.payload;

    case "subtract":
      return state - action.payload;

    case "reset":
      return 10;

    default:
      return state;
  }
};

const Task2 = () => {
  const [count, dispatch] = useReducer(reducer, 10);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-5">
          Custom Counter
        </h1>

        <h2 className="text-4xl font-bold mb-6">
          {count}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() =>
              dispatch({ type: "add", payload: 5 })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add 5
          </button>

          <button
            onClick={() =>
              dispatch({ type: "add", payload: 10 })
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add 10
          </button>

          <button
            onClick={() =>
              dispatch({ type: "subtract", payload: 5 })
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Subtract 5
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

export default Task2;