
import { useState } from "react";

const App = () => {
  // TASK 1 - ARRAY
  const [skills, setSkills] = useState([
    "HTML",
    "CSS",
    "JavaScript",
  ]);

  const addReact = () => {
    setSkills([...skills, "React"]);
  };

  const updateJavaScript = () => {
    setSkills(
      skills.map((skill) =>
        skill === "JavaScript"
          ? "Advanced JavaScript"
          : skill
      )
    );
  };

  // TASK 2 - OBJECT
  const [student, setStudent] = useState({
    name: "Arun",
    age: 22,
    course: "React",
  });

  const updateCourse = () => {
    setStudent({ ...student, course: "MERN" });
  };

  const addCity = () => {
    setStudent({ ...student, city: "Chennai" });
  };

  // TASK 3 - TOGGLE
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-6 bg-gray-100 p-6">

      {/* TASK 1 - ARRAY */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold">Task 1 - Array</h2>

        {skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}

        <div className="mt-4 flex gap-3">
          <button
            onClick={addReact}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add React
          </button>

          <button
            onClick={updateJavaScript}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Update JavaScript
          </button>
        </div>
      </div>

      {/* TASK 2 - OBJECT */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold">Task 2 - Object</h2>

        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>Course: {student.course}</p>
        <p>City: {student.city || "Not added"}</p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={updateCourse}
            className="rounded bg-purple-500 px-4 py-2 text-white"
          >
            Update Course
          </button>

          <button
            onClick={addCity}
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            Add City
          </button>
        </div>
      </div>

      {/* TASK 3 - TOGGLE */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-2xl font-bold">Task 3 - Toggle</h2>

        <button
          onClick={() => setShow((prev) => !prev)}
          className="rounded bg-pink-500 px-4 py-2 text-white"
        >
          {show ? "Hide Details" : "Show Details"}
        </button>

        {show ? (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Student Details</h3>
            <p>Name: Arun</p>
            <p>Age: 22</p>
            <p>Course: React</p>
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default App;
