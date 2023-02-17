import { WorkoutPlanContext } from "../context/WorkoutPlanContext";
import { useContext } from "react";

export const useWorkoutPlanContext = () => {
  const context = useContext(WorkoutPlanContext);

  if (!context) {
    throw Error(
      "UseWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
