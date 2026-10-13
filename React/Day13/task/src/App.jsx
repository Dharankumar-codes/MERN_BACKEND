
import { useState } from "react";

const App = () => {
  // TASK 1: Toggle True / False
  const [isOn, setIsOn] = useState(false);

  // TASK 2: Like Button
  const [isLiked, setIsLiked] = useState(false);

  // TASK 3: Update Object
  const [user, setUser] = useState({
    name: "Rahul",
    age: 22,
    city: "Chennai",
  });

  // TASK 4: Update Object Inside an Array
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, inStock: true },
    { id: 2, name: "Phone", price: 20000, inStock: false },
    { id: 3, name: "Tablet", price: 15000, inStock: true },
  ]);

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  };

  // TASK 5: Student Management
  const [students, setStudents] = useState([
    { id: 1, name: "Ravi", marks: 75, isPassed: true },
    { id: 2, name: "Priya", marks: 35, isPassed: false },
    { id: 3, name: "Kumar", marks: 90, isPassed: true },
  ]);

  const increaseMarks = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, marks: student.marks + 5 }
          : student
      )
    );
  };

  const toggleResult = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isPassed: !student.isPassed }
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );
  };

  return (
    <div className="space-y-6 bg-gray-100 p-6">

      {/* TASK 1 */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 1 - Toggle True / False
        </h2>

        <p>Status: {isOn ? "ON" : "OFF"}</p>

        <button
          onClick={() => setIsOn((prev) => !prev)}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white"
        >
          {isOn ? "Turn OFF" : "Turn ON"}
        </button>
      </section>

      {/* TASK 2 */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="text-xl font-bold">Task 2 - Like Button</h2>

        <h3 className="mt-3 text-lg">My Post</h3>
        <p>Click the Like button!</p>

        <button
          onClick={() => setIsLiked((prev) => !prev)}
          className="mt-3 rounded bg-pink-500 px-4 py-2 text-white"
        >
          {isLiked ? "Liked ❤️" : "Like"}
        </button>

        {isLiked && <p className="mt-3">You liked this post!</p>}
      </section>

      {/* TASK 3 */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">Task 3 - Update Object</h2>

        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>City: {user.city}</p>

        <div className="mt-3 flex flex-wrap gap-3">
          <button
            onClick={() => setUser({ ...user, name: "Arjun" })}
            className="rounded bg-green-600 px-3 py-2 text-white"
          >
            Change Name
          </button>

          <button
            onClick={() =>
              setUser((prev) => ({ ...prev, age: prev.age + 1 }))
            }
            className="rounded bg-blue-600 px-3 py-2 text-white"
          >
            Increase Age
          </button>

          <button
            onClick={() => setUser({ ...user, city: "Bangalore" })}
            className="rounded bg-purple-600 px-3 py-2 text-white"
          >
            Change City
          </button>
        </div>
      </section>

      {/* TASK 4 */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 4 - Product Stock
        </h2>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="rounded border p-3">
              <h3 className="font-bold">{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>
                Status: {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <button
                onClick={() => toggleStock(product.id)}
                className="mt-2 rounded bg-orange-500 px-3 py-2 text-white"
              >
                Toggle Stock
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TASK 5 */}
      <section className="rounded-lg bg-white p-5 shadow">
        <h2 className="mb-3 text-xl font-bold">
          Task 5 - Student Management
        </h2>

        {students.length === 0 && <p>No students remaining.</p>}

        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="rounded border p-3">
              <h3 className="font-bold">{student.name}</h3>
              <p>Marks: {student.marks}</p>
              <p>
                Result: {student.isPassed ? "Pass" : "Fail"}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => increaseMarks(student.id)}
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Increase Marks
                </button>

                <button
                  onClick={() => toggleResult(student.id)}
                  className="rounded bg-blue-600 px-3 py-2 text-white"
                >
                  Toggle Result
                </button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Delete Student
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default App;
