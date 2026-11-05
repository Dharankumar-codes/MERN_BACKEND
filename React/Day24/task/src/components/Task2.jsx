import { useState, useMemo } from "react";

// Product array outside component
const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Keyboard", price: 1500 },
  { id: 4, name: "Mouse", price: 800 },
  { id: 5, name: "Monitor", price: 12000 },
];

// Function outside component
const filterProducts = (products, search) => {
  console.log("Filtering Products...");

  return products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
};

const Task2 = () => {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, search);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-5">
          Product Search
        </h1>

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mb-5"
        />

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between bg-gray-100 p-3 rounded"
            >
              <p>{product.name}</p>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-red-500 mt-4">
            No Products Found
          </p>
        )}

        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold mb-3">
            Counter: {count}
          </h2>

          <button
            onClick={() => setCount(count + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task2;