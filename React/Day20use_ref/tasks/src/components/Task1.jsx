import { useRef } from "react";

const Task1 = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleClear = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Name: ${nameRef.current.value}
Email: ${emailRef.current.value}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">
          Input Focus and Clear
        </h1>

        <input
          ref={nameRef}
          type="text"
          placeholder="Enter Name"
          className="border p-3 rounded w-full mb-3"
        />

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          className="border p-3 rounded w-full mb-4"
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => nameRef.current.focus()}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Focus Name
          </button>

          <button
            type="button"
            onClick={() => emailRef.current.focus()}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Focus Email
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 text-white p-2 rounded"
          >
            Clear
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Task1;