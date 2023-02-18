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
import { WorkoutPlan1ContextProvider } from "./context/WorkoutPlan1Context";

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
                  <WorkoutPlan1ContextProvider>
                    <App />
                  </WorkoutPlan1ContextProvider>
                </WorkoutPlanContextProvider>
              </FGoalContextProvider>
            </GoalContextProvider>
          </JournalContextProvider>
        </WorkoutsContextProvider>
      </AuthContextProvider>
    </ThemeContext.Provider>
  </React.StrictMode>
);
