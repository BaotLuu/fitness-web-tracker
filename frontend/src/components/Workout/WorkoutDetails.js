import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const Update = async (e) => {
    const workouts = { title, weight, reps, note };

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PUT",
      body: JSON.stringify(workouts),
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
      setError(null);
      setEdit(false);
      window.location.reload();
    }
  };

  return (
    <div className="workout-details">
      {!edit && <h4>{workout.title}</h4>}

      {edit && (
        <input
          placeholder="Title"
          className="update-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Reps:<a className="workout-details-a"> {workout.reps}</a>
          </strong>
        )}
        {edit && (
          <input
            placeholder="Reps"
            className="update-input"
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Weight:<a className="workout-details-a">{workout.weight}</a>
          </strong>
        )}
        {edit && (
          <input
            placeholder="Weight"
            className="update-input"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        )}
      </p>
      <br />
      <p className="workout-note">
        {!edit && <a className="workout-details-a">{workout.note}</a>}
        {edit && (
          <input
            placeholder="Note"
            className="update-input"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}
      </p>

      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
      {!edit && (
        <span onClick={() => setEdit(true)} className="workout-details-span">
          Update
        </span>
      )}
      {edit && (
        <div>
          <span onClick={() => setEdit(false)} className="workout-details-span">
            Cancel
          </span>
          <span onClick={() => Update()} className="workout-details-span">
            Save
          </span>
        </div>
      )}
    </div>
  );
}
