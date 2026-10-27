
import DigitalTimer from "./components/DigitalTimer";
import WelcomeMessage from "./components/WelcomeMessage";
import UserDetails from "./components/UserDetails";

const App = () => {
  return (
    <div>
      <DigitalTimer />
      <hr />

      <WelcomeMessage />
      <hr />

      <UserDetails />
    </div>
  );
};

export default App;
