import { WorkoutPlan1Context } from "../context/WorkoutPlan1Context";
import { useContext } from "react";

export const useWorkoutPlan1Context = () => {
  const context = useContext(WorkoutPlan1Context);

  if (!context) {
    throw Error(
      "UseWorkouts1Context must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
