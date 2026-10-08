import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const addStudent = () => {
    const student = {
      name: "",
      age: 24
    };

    if (student.name === "") {
      setError("Name is required");
      return;
    }

    setStudents([...students, student]);
    setError("");
  };

  return (
    <div>
      <button onClick={addStudent}>Add Student</button>

      {error && <p>{error}</p>}

      {students.map((student, index) => (
        <p key={index}>
          {student.name} - {student.age}
        </p>
      ))}
    </div>
  );
}

export default App;