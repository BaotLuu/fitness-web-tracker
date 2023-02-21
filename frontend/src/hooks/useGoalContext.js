import { GoalContext } from "../context/GoalContext";
import { useContext } from "react";

export const useGoalContext = () => {
  const context = useContext(GoalContext);

  return context;
};
