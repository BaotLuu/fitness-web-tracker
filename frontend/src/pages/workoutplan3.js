import { useEffect } from "react";
import { useWorkoutPlanContext } from "../hooks/useWorkoutPlanContext";

//components
import WorkoutPlanDetails2 from "../components/Workout Plan 3/WorkoutPlanDetails2";
import WorkoutPlanForm2 from "../components/Workout Plan 3/WorkoutPlanForm2";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutPlan3() {
  const { workoutplan, dispatch } = useWorkoutPlanContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkoutPlan2 = async () => {
      const response = await fetch("/api/workoutplan2", {
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
      fetchWorkoutPlan2();
    }
  }, []);

  return (
    <div>
      <div className="hero-section">
        <h1>My Workout Plan 3</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {workoutplan &&
            workoutplan.map((workoutplan) => (
              <WorkoutPlanDetails2
                key={workoutplan._id}
                workoutplan={workoutplan}
              />
            ))}
        </div>
        <WorkoutPlanForm2 />
      </div>
    </div>
  );
}

export default WorkoutPlan3;
