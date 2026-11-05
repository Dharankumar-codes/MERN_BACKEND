import { UserContext } from "./provider/UserContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <UserContext.Provider value="Dharan">
      <Navbar />
      <Home />
    </UserContext.Provider>
  );
}

export default App;