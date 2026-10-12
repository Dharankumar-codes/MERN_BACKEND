
import React from "react";

function App() {

  // TASK 1: Primitive Data Rendering
  const studentName = "Arun";
  const age = 22;
  const course = "React";
  const fees = 15000;

  // TASK 2: Array Rendering
  const skills = ["HTML", "CSS", "JavaScript", "React", "Node"];

  // TASK 3: Object Rendering
  const student = {
    name: "Priya",
    age: 21,
    course: "MERN Stack",
    city: "Chennai"
  };

  // TASK 4: Array of Objects
  const students = [
    { id: 1, name: "Arun", course: "React" },
    { id: 2, name: "Priya", course: "Node" },
    { id: 3, name: "Kumar", course: "MongoDB" }
  ];

  return (
    <div>
      <h1>React Rendering Tasks</h1>

      {/* TASK 1 */}
      <h2>Task 1: Primitive Data</h2>
      <h2>{studentName}</h2>
      <p>Age: {age}</p>
      <p>Course: {course}</p>
      <p>Fees: {fees}</p>

      <hr />

      {/* TASK 2 */}
      <h2>Task 2: Skills Array</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <hr />

      {/* TASK 3 */}
      <h2>Task 3: Student Object</h2>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <p>City: {student.city}</p>

      <hr />

      {/* TASK 4 */}
      <h2>Task 4: Students List</h2>
      {students.map((student) => (
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
