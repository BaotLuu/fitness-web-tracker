import { useEffect } from "react";
import { useWorkoutPlanContext } from "../hooks/useWorkoutPlanContext";

//components
import WorkoutPlanDetails1 from "../components/Workout Plan 2/WorkoutPlanDetails1";
import WorkoutPlanForm1 from "../components/Workout Plan 2/WorkoutPlanForm1";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutPlan1 = () => {
  const { workoutplan, dispatch } = useWorkoutPlanContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkoutPlan1 = async () => {
      const response = await fetch("/api/workoutplan1", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTPS", payload: json });
      }
    };

    if (user) {
      fetchWorkoutPlan1();
    }
  }, []);

  return (
    <div>
      <div className="hero-section">
        <h1>My Workout Plan 2</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {workoutplan &&
            workoutplan.map((workoutplan) => (
              <WorkoutPlanDetails1
                key={workoutplan._id}
                workoutplan={workoutplan}
              />
            ))}
        </div>
        <WorkoutPlanForm1 />
      </div>
    </div>
  );
};

export default WorkoutPlan1;
