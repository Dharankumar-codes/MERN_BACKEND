
import { useState } from "react";

const App = () => {
  // TASK 1 - Employee Salary
  const [name] = useState("Arun");
  const [salary, setSalary] = useState(25000);

  // TASK 2 - Course List
  const [courses, setCourses] = useState([
    "HTML",
    "CSS",
    "JavaScript",
  ]);

  const addReact = () => {
    setCourses([...courses, "React"]);
  };

  const updateCSS = () => {
    setCourses(
      courses.map((course) =>
        course === "CSS" ? "Advanced CSS" : course
      )
    );
  };

  // TASK 3 - Product Details
  const [product, setProduct] = useState({
    name: "Laptop",
    price: 45000,
    stock: 10,
  });

  const updatePrice = () => {
    setProduct({ ...product, price: 50000 });
  };

  const addBrand = () => {
    setProduct({ ...product, brand: "Dell" });
  };

  // TASK 4 - Employee List
  const [employees, setEmployees] = useState([
    { id: 1, name: "Arun", salary: 25000 },
    { id: 2, name: "Priya", salary: 30000 },
    { id: 3, name: "Kumar", salary: 28000 },
  ]);

  const addEmployee = () => {
    setEmployees([
      ...employees,
      { id: 4, name: "Bala", salary: 32000 },
    ]);
  };

  const updateEmployeeSalary = () => {
    setEmployees(
      employees.map((employee) =>
        employee.id === 2
          ? { ...employee, salary: 35000 }
          : employee
      )
    );
  };

  // TASK 5 - Show / Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const password = "react123";

  return (
    <div className="space-y-6 bg-gray-100 p-6">

      {/* TASK 1 */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 1 - Employee Salary
        </h2>

        <p>Employee Name: {name}</p>
        <p>Salary: ₹{salary}</p>

        <button
          onClick={() => setSalary(salary + 5000)}
          className="mt-3 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Increase Salary
        </button>
      </div>

      {/* TASK 2 */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 2 - Course List
        </h2>

        {courses.map((course, index) => (
          <p key={index}>{course}</p>
        ))}

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            onClick={addReact}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Add React
          </button>

          <button
            onClick={updateCSS}
            className="rounded bg-purple-500 px-4 py-2 text-white"
          >
            Update CSS
          </button>
        </div>
      </div>

      {/* TASK 3 */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 3 - Product Details
        </h2>

        <p>Name: {product.name}</p>
        <p>Price: ₹{product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Brand: {product.brand || "Not added"}</p>

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            onClick={updatePrice}
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            Update Price
          </button>

          <button
            onClick={addBrand}
            className="rounded bg-indigo-500 px-4 py-2 text-white"
          >
            Add Brand
          </button>
        </div>
      </div>

      {/* TASK 4 */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 4 - Employee List
        </h2>

        {employees.map((employee) => (
          <div key={employee.id} className="mb-3 border-b pb-2">
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Salary: ₹{employee.salary}</p>
          </div>
        ))}

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            onClick={addEmployee}
            className="rounded bg-teal-600 px-4 py-2 text-white"
          >
            Add Employee
          </button>

          <button
            onClick={updateEmployeeSalary}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Update Salary
          </button>
        </div>
      </div>

      {/* TASK 5 */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 5 - Show / Hide Password
        </h2>

        <p className="mb-3">
          Password: {showPassword ? password : "••••••••"}
        </p>

        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="rounded bg-pink-500 px-4 py-2 text-white"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
      </div>

    </div>
  );
};

export default App;
