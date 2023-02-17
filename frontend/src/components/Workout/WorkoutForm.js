import React, { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, weight, reps, note };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
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
      setError(null);
      console.log(json);
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
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
      <textarea
        type="text"
        onChange={(e) => setNote(e.target.value)}
        value={note}
      />

      <button className="addWorkout">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
