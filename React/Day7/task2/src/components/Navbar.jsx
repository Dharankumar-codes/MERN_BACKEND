
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-900 px-8 py-4 text-white">
      <h1 className="text-2xl font-bold">MyWebsite</h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        <Link to="/services" className="hover:text-yellow-400">
          Services
        </Link>

        <Link to="/about" className="hover:text-yellow-400">
          About
        </Link>

        <Link to="/contact" className="hover:text-yellow-400">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
