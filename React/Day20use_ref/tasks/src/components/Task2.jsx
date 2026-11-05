import { useRef } from "react";

const Task2 = () => {
  const passwordRef = useRef(null);

  const showPassword = () => {
    passwordRef.current.type = "text";
  };

  const hidePassword = () => {
    passwordRef.current.type = "password";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-5">
          Show / Hide Password
        </h1>

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          className="border p-3 rounded w-full mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={showPassword}
            className="bg-green-500 text-white p-3 rounded w-full"
          >
            Show
          </button>

          <button
            onClick={hidePassword}
            className="bg-red-500 text-white p-3 rounded w-full"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task2;