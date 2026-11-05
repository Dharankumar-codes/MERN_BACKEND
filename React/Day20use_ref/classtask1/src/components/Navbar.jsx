import { useContext } from "react";
import { UserContext } from "../provider/UserContext";

function Navbar() {
  const username = useContext(UserContext);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <h1>Navbar: Welcome {username}</h1>
    </nav>
  );
}

export default Navbar;