import { useEffect } from "react";
import GoalDetails from "../components/Lifting Goal/GoalDetails";
import GoalForm from "../components/Lifting Goal/GoalForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGoalContext } from "../hooks/useGoalContext";

const Goal = () => {
  const { goals, dispatch } = useGoalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGoal = async () => {
      const response = await fetch("/api/lgoal/liftinggoal", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOAL", payload: json });
      }
    };
    if (user) {
      fetchGoal();
    }
  }, []);
  return (
    <div>
      <div className="hero-section">
        <h1>My Lifting Goal</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {goals &&
            goals.map((goal) => <GoalDetails key={goal._id} goal={goal} />)}
        </div>
        <GoalForm />
      </div>
    </div>
  );
};

export default Goal;
