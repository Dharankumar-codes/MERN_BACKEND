import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

import Profile from "./components/Profile";
import ThemeDisplay from "./components/ThemeDisplay";

const App = () => {
  return (
    <div>
      {/* Task 1 - User Context */}
      <UserProvider>
        <Profile />
      </UserProvider>

      {/* Task 2 - Theme Switcher */}
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    </div>
  );
};

export default App;