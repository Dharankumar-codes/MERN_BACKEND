
import { useRef } from "react";

function App() {
  const boxRef = useRef(null);

  const changeColor = () => {
    boxRef.current.classList.remove("bg-gray-200");
    boxRef.current.classList.add("bg-blue-500");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <div
        ref={boxRef}
        className="bg-gray-200 p-12 rounded-xl text-center"
      >
        <h1 className="text-2xl font-bold">
          Change My Background
        </h1>
      </div>

      <button
        onClick={changeColor}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Change Color
      </button>

    </div>
  );
}

export default App;
