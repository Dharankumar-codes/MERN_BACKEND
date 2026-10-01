import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold">
          MyWebsite
        </Link>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-blue-200"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-200"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-200"
          >
            Contact
          </Link>

          <Link
            to="/help"
            className="hover:text-blue-200"
          >
            Help
          </Link>

          <Link
            to="/register"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;