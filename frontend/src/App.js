import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/homes";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Journal from "./pages/journal";
import HeroLink from "./components/heroLink";
import Goal from "./pages/goals";
import FGoal from "./pages/fgoals";
import Workoutplan from "./pages/workoutplan";
import { useAuthContext } from "./hooks/useAuthContext";
import { createContext, useState } from "react";
import Switch from "react-switch";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const { user } = useAuthContext();

  return (
    <div className="App" id={theme}>
      <div className="switch ">
        <label>
          <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
        </label>
      </div>
      <BrowserRouter>
        <Navbar />
        <HeroLink />
        <div className="pages">
          <Routes>
            <Route
              path="/workout"
              element={user ? <Home /> : <Navigate to="/workout" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/workout" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/workout" />}
            />
            <Route
              path="/journal"
              element={user ? <Journal /> : <Navigate to="/journal" />}
            />
            <Route
              path="/liftinggoal"
              element={user ? <Goal /> : <Navigate to="/liftinggoal" />}
            />
            <Route
              path="/fitnessgoal"
              element={user ? <FGoal /> : <Navigate to="/fitnessgoal" />}
            />
            <Route
              path="/workoutplan"
              element={user ? <Workoutplan /> : <Navigate to="/workoutplan" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
