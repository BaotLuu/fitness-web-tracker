import React, { useState } from "react";
import { useWorkoutPlanContext } from "../../hooks/useWorkoutPlanContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function WorkoutPlanForm1() {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutPlanContext();
  const { user } = useAuthContext();

  const handleSubmitWP1 = async (e) => {
    e.preventDefault();

    const WorkoutPlan1 = { title, weight, reps, date, note };

    const response = await fetch("/api/workoutplan1", {
      method: "POST",
      body: JSON.stringify(WorkoutPlan1),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setWeight("");
      setReps("");
      setNote("");
      setDate("");
      setError(null);
      console.log(json);
      dispatch({ type: "CREATE_WORKOUTPLAN", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmitWP1}>
      <h3>Workout date</h3>
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <h3>Add new workout</h3>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <h3>Repetition</h3>
      <input
        type="Number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <h3>Weight</h3>
      <input
        type="Number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />
      <h3>Note</h3>
      <input
        type="text"
        onChange={(e) => setNote(e.target.value)}
        value={note}
      />

      <button className="addWorkout">Add Plan</button>
      {error && <div className="error">Exercise Title needed</div>}
    </form>
  );
}
