import { useContext } from "react";
import { UserContext } from "../provider/UserContext";

function Home() {
  const username = useContext(UserContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        Home: Hello {username}
      </h2>
    </div>
  );
}

export default Home;