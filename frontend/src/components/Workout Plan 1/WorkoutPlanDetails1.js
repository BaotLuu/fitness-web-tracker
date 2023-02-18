import React from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutPlan1Context } from "../../hooks/useWorkoutPlan1Context";

export default function WorkoutPlanDetails1({ workoutplan1 }) {
  const { dispatch } = useWorkoutPlan1Context();
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch("/api/workoutplan1/" + workoutplan1._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WP1", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workoutplan1.date}</h4>
      <p className="workout-details-p">
        <strong>Title: </strong> {workoutplan1.title}
      </p>
      <p className="workout-details-p">
        <strong>Reps: </strong>
        {workoutplan1.reps}
      </p>
      <p className="workout-details-p">
        <strong>Weight: </strong>
        {workoutplan1.weight}
      </p>
      <p className="workout-details-p">
        <strong>Note: </strong>
        {workoutplan1.note}
      </p>
      <br />
      <p className="workout-note">{workoutplan1.note}</p>
      <p>
        {formatDistanceToNow(new Date(workoutplan1.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
}
