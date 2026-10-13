
import { useState } from "react";

const App = () => {
  // Task 1: Student Name List
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);

  const handleStudentChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleAddStudent = () => {
    if (studentName.trim() === "") return;

    setStudents([...students, studentName.trim()]);
    setStudentName("");
  };

  // Task 2: Course List
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);

  const handleCourseChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleAddCourse = () => {
    if (courseName.trim() === "") return;

    setCourses([...courses, courseName.trim()]);
    setCourseName("");
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // Task 3: Number List
  const [number, setNumber] = useState("");
  const [numbers, setNumbers] = useState([]);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleAddNumber = () => {
    if (number.trim() === "" || !Number.isFinite(Number(number))) return;

    setNumbers([...numbers, Number(number)]);
    setNumber("");
  };

  // Task 4: Fruit List Update
  const [fruitName, setFruitName] = useState("");
  const [fruits, setFruits] = useState([]);
  const [editFruitIndex, setEditFruitIndex] = useState(null);

  const handleFruitChange = (e) => {
    setFruitName(e.target.value);
  };

  const handleAddFruit = () => {
    if (fruitName.trim() === "") return;

    setFruits([...fruits, fruitName.trim()]);
    setFruitName("");
  };

  const handleUpdateFruit = () => {
    if (fruitName.trim() === "" || editFruitIndex === null) return;

    setFruits(
      fruits.map((fruit, index) =>
        index === editFruitIndex ? fruitName.trim() : fruit
      )
    );

    setFruitName("");
    setEditFruitIndex(null);
  };

  const handleSelectFruit = (index) => {
    setFruitName(fruits[index]);
    setEditFruitIndex(index);
  };

  // Task 5: Employee List
  const [employeeName, setEmployeeName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);

  const handleEmployeeChange = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleAddEmployee = () => {
    if (employeeName.trim() === "") return;

    setEmployees([...employees, employeeName.trim()]);
    setEmployeeName("");
  };

  const handleEditEmployee = (index) => {
    setEmployeeName(employees[index]);
    setEditEmployeeIndex(index);
  };

  const handleUpdateEmployee = () => {
    if (employeeName.trim() === "" || editEmployeeIndex === null) return;

    setEmployees(
      employees.map((employee, index) =>
        index === editEmployeeIndex ? employeeName.trim() : employee
      )
    );

    setEmployeeName("");
    setEditEmployeeIndex(null);
  };

  const handleDeleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));

    if (editEmployeeIndex === index) {
      setEmployeeName("");
      setEditEmployeeIndex(null);
    } else if (editEmployeeIndex !== null && editEmployeeIndex > index) {
      setEditEmployeeIndex(editEmployeeIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        React Form Handling - 5 Tasks
      </h1>

      {/* Task 1 */}
      <section className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">Task 1: Student Name List</h2>

        <input
          className="mr-2 rounded border p-2"
          type="text"
          placeholder="Enter student name"
          value={studentName}
          onChange={handleStudentChange}
        />

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={handleAddStudent}
        >
          Add Student
        </button>

        <ul className="mt-4 list-inside list-disc">
          {students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </section>

      {/* Task 2 */}
      <section className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">Task 2: Course List</h2>

        <input
          className="mr-2 rounded border p-2"
          type="text"
          placeholder="Enter course name"
          value={courseName}
          onChange={handleCourseChange}
        />

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={handleAddCourse}
        >
          Add Course
        </button>

        <ul className="mt-4">
          {courses.map((course, index) => (
            <li key={index} className="mb-2 flex items-center gap-3">
              {course}
              <button
                className="rounded bg-red-600 px-3 py-1 text-white"
                onClick={() => handleDeleteCourse(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Task 3 */}
      <section className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">Task 3: Number List</h2>

        <input
          className="mr-2 rounded border p-2"
          type="number"
          placeholder="Enter a number"
          value={number}
          onChange={handleNumberChange}
        />

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={handleAddNumber}
        >
          Add Number
        </button>

        <ul className="mt-4 list-inside list-disc">
          {numbers.map((num, index) => (
            <li key={index}>
              {num} - {num % 2 === 0 ? "Even" : "Odd"}
            </li>
          ))}
        </ul>
      </section>

      {/* Task 4 */}
      <section className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">Task 4: Fruit List Update</h2>

        <input
          className="mr-2 rounded border p-2"
          type="text"
          placeholder="Enter fruit name"
          value={fruitName}
          onChange={handleFruitChange}
        />

        {editFruitIndex === null ? (
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={handleAddFruit}
          >
            Add Fruit
          </button>
        ) : (
          <button
            className="rounded bg-green-600 px-4 py-2 text-white"
            onClick={handleUpdateFruit}
          >
            Save
          </button>
        )}

        <ul className="mt-4">
          {fruits.map((fruit, index) => (
            <li key={index} className="mb-2 flex items-center gap-3">
              {fruit}
              <button
                className="rounded bg-orange-500 px-3 py-1 text-white"
                onClick={() => handleSelectFruit(index)}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Task 5 */}
      <section className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">Task 5: Employee List</h2>

        <input
          className="mr-2 rounded border p-2"
          type="text"
          placeholder="Enter employee name"
          value={employeeName}
          onChange={handleEmployeeChange}
        />

        {editEmployeeIndex === null ? (
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        ) : (
          <button
            className="rounded bg-green-600 px-4 py-2 text-white"
            onClick={handleUpdateEmployee}
          >
            Save
          </button>
        )}

        <ul className="mt-4">
          {employees.map((employee, index) => (
            <li key={index} className="mb-2 flex items-center gap-3">
              {employee}
              <button
                className="rounded bg-orange-500 px-3 py-1 text-white"
                onClick={() => handleEditEmployee(index)}
              >
                Edit
              </button>
              <button
                className="rounded bg-red-600 px-3 py-1 text-white"
                onClick={() => handleDeleteEmployee(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
