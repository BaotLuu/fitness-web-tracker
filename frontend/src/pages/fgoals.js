import { useEffect } from "react";
import FGoalDetails from "../components/BodyWeight Goal/FGoalDetails";
import FGoalForm from "../components/BodyWeight Goal/FGoalForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFGoalContext } from "../hooks/useFGoalContext";

const FGoal = () => {
  const { fgoals, dispatch } = useFGoalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFGoal = async () => {
      const response = await fetch("/api/fgoal/fitnessgoal", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FGOAL", payload: json });
      }
    };
    if (user) {
      fetchFGoal();
    }
  }, []);
  return (
    <div>
      <div className="hero-section">
        <h1>My Body Weight Goal</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {fgoals &&
            fgoals.map((fgoal) => (
              <FGoalDetails key={fgoal._id} fgoal={fgoal} />
            ))}
        </div>
        <FGoalForm />
      </div>
    </div>
  );
};

export default FGoal;
