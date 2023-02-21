import { WorkoutPlanContext } from "../context/WorkoutPlanContext";
import { useContext } from "react";

export const useWorkoutPlanContext = () => {
  const context = useContext(WorkoutPlanContext);

  return context;
};
