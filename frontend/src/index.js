import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { JournalContextProvider } from "./context/JournalContext";
import { GoalContextProvider } from "./context/GoalContext";
import { FGoalContextProvider } from "./context/FGoalContext";
import { WorkoutPlanContextProvider } from "./context/WorkoutPlanContext";

export const ThemeContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContext.Provider>
      <AuthContextProvider>
        <WorkoutsContextProvider>
          <JournalContextProvider>
            <GoalContextProvider>
              <FGoalContextProvider>
                <WorkoutPlanContextProvider>
                  <App />
                </WorkoutPlanContextProvider>
              </FGoalContextProvider>
            </GoalContextProvider>
          </JournalContextProvider>
        </WorkoutsContextProvider>
      </AuthContextProvider>
    </ThemeContext.Provider>
  </React.StrictMode>
);
