import { useEffect } from "react";
import { useWorkoutPlan1Context } from "../hooks/useWorkoutPlan1Context";

//components
import WorkoutPlanDetails1 from "../components/Workout Plan 1/WorkoutPlanDetails1";
import WorkoutPlanForm1 from "../components/Workout Plan 1/WorkoutPlanForm1";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutPlan1 = () => {
  const { workoutplan1, dispatch } = useWorkoutPlan1Context();
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
        dispatch({ type: "SET_WP1", payload: json });
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
          {workoutplan1 &&
            workoutplan1.map((workoutplan1) => (
              <WorkoutPlanDetails1
                key={workoutplan1._id}
                workoutplan1={workoutplan1}
              />
            ))}
        </div>
        <WorkoutPlanForm1 />
      </div>
    </div>
  );
};

export default WorkoutPlan1;
