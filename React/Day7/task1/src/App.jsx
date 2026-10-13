
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">Home Page</h1>
      <p className="mt-2 text-gray-600">
        Welcome to my React application.
      </p>
    </div>
  );
};

const About = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-600">About Page</h1>
      <p className="mt-2 text-gray-600">
        Learn more about me.
      </p>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-600">Contact Page</h1>
      <p className="mt-2 text-gray-600">
        Get in touch with me.
      </p>
    </div>
  );
};

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    `rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-md">
      <h2 className="text-2xl font-bold text-blue-600">
        MyWebsite
      </h2>

      <div className="flex gap-3">
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/about" className={linkStyle}>
          About
        </NavLink>

        <NavLink to="/contact" className={linkStyle}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
