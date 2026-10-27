
import { useState } from "react";

const UserDetails = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      age: age,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    setName("");
    setAge("");
    setEmail("");
  };

  const handleClear = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <h1>User Details Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Save Details</button>
      </form>

      {user && (
        <div>
          <h2>Saved Details</h2>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Email: {user.email}</p>

          <button onClick={handleClear}>Clear Details</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
