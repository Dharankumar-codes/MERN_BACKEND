import { useState, useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const getData = await fetch("https://dummyjson.com/products");

    const data = await getData.json();

    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <> <div>
      <h1>Product Search</h1>

      <input
        type="text"
        placeholder="Search product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div></>
  );
};

export default App;