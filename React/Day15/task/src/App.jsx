
import { useState } from "react";

const App = () => {
  // TASK 1: EMPLOYEE FORM
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleEmployeeChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    if (!employee.name.trim() || !employee.department.trim() || employee.salary === "") return;

    if (editEmployee !== null) {
      setEmployees(
        employees.map((item, index) =>
          index === editEmployee ? { ...employee } : item
        )
      );
      setEditEmployee(null);
    } else {
      setEmployees([...employees, { ...employee }]);
    }

    setEmployee({ name: "", department: "", salary: "" });
  };

  const handleEditEmployee = (index) => {
    setEmployee({ ...employees[index] });
    setEditEmployee(index);
  };

  const handleDeleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));

    if (editEmployee === index) {
      setEmployee({ name: "", department: "", salary: "" });
      setEditEmployee(null);
    } else if (editEmployee !== null && editEmployee > index) {
      setEditEmployee(editEmployee - 1);
    }
  };

  // TASK 2: PRODUCT FORM
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (!product.name.trim() || product.price === "" || product.quantity === "") return;

    if (editProduct !== null) {
      setProducts(
        products.map((item, index) =>
          index === editProduct ? { ...product } : item
        )
      );
      setEditProduct(null);
    } else {
      setProducts([...products, { ...product }]);
    }

    setProduct({ name: "", price: "", quantity: "" });
  };

  const handleEditProduct = (index) => {
    setProduct({ ...products[index] });
    setEditProduct(index);
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));

    if (editProduct === index) {
      setProduct({ name: "", price: "", quantity: "" });
      setEditProduct(null);
    } else if (editProduct !== null && editProduct > index) {
      setEditProduct(editProduct - 1);
    }
  };

  // TASK 3: COURSE FORM
  const [course, setCourse] = useState({
    name: "",
    trainer: "",
    duration: "",
  });
  const [courses, setCourses] = useState([]);

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleAddCourse = () => {
    if (!course.name.trim() || !course.trainer.trim() || !course.duration.trim()) return;

    setCourses([...courses, { ...course }]);
    setCourse({ name: "", trainer: "", duration: "" });
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // TASK 4: EXPENSE FORM
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (!expense.title.trim() || expense.amount === "" || !expense.category.trim()) return;

    if (editExpense !== null) {
      setExpenses(
        expenses.map((item, index) =>
          index === editExpense ? { ...expense } : item
        )
      );
      setEditExpense(null);
    } else {
      setExpenses([...expenses, { ...expense }]);
    }

    setExpense({ title: "", amount: "", category: "" });
  };

  const handleEditExpense = (index) => {
    setExpense({ ...expenses[index] });
    setEditExpense(index);
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));

    if (editExpense === index) {
      setExpense({ title: "", amount: "", category: "" });
      setEditExpense(null);
    } else if (editExpense !== null && editExpense > index) {
      setEditExpense(editExpense - 1);
    }
  };

  // TASK 5: STUDENT MARKS FORM
  const [student, setStudent] = useState({
    name: "",
    tamil: "",
    english: "",
    maths: "",
  });
  const [students, setStudents] = useState([]);

  const handleStudentChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    if (
      !student.name.trim() ||
      student.tamil === "" ||
      student.english === "" ||
      student.maths === ""
    ) return;

    setStudents([...students, { ...student }]);
    setStudent({ name: "", tamil: "", english: "", maths: "" });
  };

  return (
    <div className="min-h-screen space-y-8 bg-gray-100 p-6">
      <h1 className="text-center text-3xl font-bold">
        React Form Practice Tasks
      </h1>

      {/* TASK 1: EMPLOYEE */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">1. Employee Form</h2>

        <div className="flex flex-wrap gap-3">
          <input className="rounded border p-2" name="name" placeholder="Employee name" value={employee.name} onChange={handleEmployeeChange} />
          <input className="rounded border p-2" name="department" placeholder="Department" value={employee.department} onChange={handleEmployeeChange} />
  <input
  className="rounded border p-2"
  type="number"
  step="1"
  name="salary"
  placeholder="Enter salary"
  value={employee.salary}
  onChange={handleEmployeeChange}
/>
          <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleAddEmployee}>
            {editEmployee !== null ? "Save Employee" : "Add Employee"}
          </button>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <thead><tr className="bg-gray-200"><th className="border p-2">Name</th><th className="border p-2">Department</th><th className="border p-2">Salary</th><th className="border p-2">Actions</th></tr></thead>
          <tbody>
            {employees.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.department}</td>
                <td className="border p-2">{item.salary}</td>
                <td className="border p-2">
                  <button className="mr-2 text-blue-600" onClick={() => handleEditEmployee(index)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDeleteEmployee(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TASK 2: PRODUCT */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">2. Product Form</h2>

        <div className="flex flex-wrap gap-3">
          <input className="rounded border p-2" name="name" placeholder="Product name" value={product.name} onChange={handleProductChange} />
          <input className="rounded border p-2" type="number" name="price" placeholder="Price" value={product.price} onChange={handleProductChange} />
          <input className="rounded border p-2" type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleProductChange} />
          <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleAddProduct}>
            {editProduct !== null ? "Update Product" : "Add Product"}
          </button>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <thead><tr className="bg-gray-200"><th className="border p-2">Name</th><th className="border p-2">Price</th><th className="border p-2">Quantity</th><th className="border p-2">Actions</th></tr></thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.price}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">
                  <button className="mr-2 text-blue-600" onClick={() => handleEditProduct(index)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDeleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TASK 3: COURSE */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">3. Course Form</h2>

        <div className="flex flex-wrap gap-3">
          <input className="rounded border p-2" name="name" placeholder="Course name" value={course.name} onChange={handleCourseChange} />
          <input className="rounded border p-2" name="trainer" placeholder="Trainer" value={course.trainer} onChange={handleCourseChange} />
          <input className="rounded border p-2" name="duration" placeholder="Duration" value={course.duration} onChange={handleCourseChange} />
          <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleAddCourse}>Add Course</button>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <thead><tr className="bg-gray-200"><th className="border p-2">Course</th><th className="border p-2">Trainer</th><th className="border p-2">Duration</th><th className="border p-2">Action</th></tr></thead>
          <tbody>
            {courses.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.trainer}</td>
                <td className="border p-2">{item.duration}</td>
                <td className="border p-2">
                  <button className="text-red-600" onClick={() => handleDeleteCourse(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TASK 4: EXPENSE */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">4. Expense Form</h2>

        <div className="flex flex-wrap gap-3">
          <input className="rounded border p-2" name="title" placeholder="Expense title" value={expense.title} onChange={handleExpenseChange} />
          <input className="rounded border p-2" type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleExpenseChange} />
          <input className="rounded border p-2" name="category" placeholder="Category" value={expense.category} onChange={handleExpenseChange} />
          <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleAddExpense}>
            {editExpense !== null ? "Save Expense" : "Add Expense"}
          </button>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <thead><tr className="bg-gray-200"><th className="border p-2">Title</th><th className="border p-2">Amount</th><th className="border p-2">Category</th><th className="border p-2">Actions</th></tr></thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.amount}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">
                  <button className="mr-2 text-blue-600" onClick={() => handleEditExpense(index)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDeleteExpense(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TASK 5: STUDENT MARKS */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-4 text-xl font-bold">5. Student Marks Form</h2>

        <div className="flex flex-wrap gap-3">
          <input className="rounded border p-2" name="name" placeholder="Student name" value={student.name} onChange={handleStudentChange} />
          <input className="rounded border p-2" type="number" name="tamil" placeholder="Tamil marks" value={student.tamil} onChange={handleStudentChange} />
          <input className="rounded border p-2" type="number" name="english" placeholder="English marks" value={student.english} onChange={handleStudentChange} />
          <input className="rounded border p-2" type="number" name="maths" placeholder="Maths marks" value={student.maths} onChange={handleStudentChange} />
          <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={handleAddStudent}>Add Student</button>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <thead><tr className="bg-gray-200"><th className="border p-2">Name</th><th className="border p-2">Tamil</th><th className="border p-2">English</th><th className="border p-2">Maths</th><th className="border p-2">Total</th></tr></thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.tamil}</td>
                <td className="border p-2">{item.english}</td>
                <td className="border p-2">{item.maths}</td>
                <td className="border p-2">
                  {Number(item.tamil) + Number(item.english) + Number(item.maths)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
