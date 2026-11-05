import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "show":
      return true;

    case "hide":
      return false;

    default:
      return state;
  }
};

const Task3 = () => {
  const [showPassword, dispatch] = useReducer(reducer, false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-5">
          Show / Hide Password
        </h1>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-5"
        />

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "show" })}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Show Password
          </button>

          <button
            onClick={() => dispatch({ type: "hide" })}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Hide Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task3;