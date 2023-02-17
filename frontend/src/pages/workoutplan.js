import { useEffect } from "react";
import { useWorkoutPlanContext } from "../hooks/useWorkoutPlanContext";

//components
import WorkoutPlanDetails from "../components/Workout Plan/WorkoutPlanDetails";
import WorkoutPlanForm from "../components/Workout Plan/WorkoutPlanForm";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutPlan = () => {
  const { workoutplan, dispatch } = useWorkoutPlanContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      const response = await fetch("/api/workoutplan", {
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
      fetchWorkoutPlan();
    }
  }, []);

  return (
    <div>
      <div className="hero-section">
        <h1>My Workout Plan</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {workoutplan &&
            workoutplan.map((workoutplan) => (
              <WorkoutPlanDetails
                key={workoutplan._id}
                workoutplan={workoutplan}
              />
            ))}
        </div>
        <WorkoutPlanForm />
      </div>
    </div>
  );
};

export default WorkoutPlan;
