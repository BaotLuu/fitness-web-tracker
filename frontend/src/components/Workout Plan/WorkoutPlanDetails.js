import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutPlanContext } from "../../hooks/useWorkoutPlanContext";

export default function WorkoutPlanDetails({ workoutplan }) {
  const { dispatch } = useWorkoutPlanContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch("/api/workoutplan/" + workoutplan._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTPS", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workoutplan.date}</h4>
      <p className="workout-details-p">
        <strong>Title: </strong> {workoutplan.title}
      </p>
      <p className="workout-details-p">
        <strong>Reps: </strong>
        {workoutplan.reps}
      </p>
      <p className="workout-details-p">
        <strong>Weight: </strong>
        {workoutplan.weight}
      </p>
      <p className="workout-details-p">
        <strong>Note: </strong>
        {workoutplan.note}
      </p>
      <br />
      <p className="workout-note">{workoutplan.note}</p>
      <p>
        {formatDistanceToNow(new Date(workoutplan.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
}
