import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useJournalContext } from "../../hooks/useJournalContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";

function JournalDetails({ journal, update }) {
  const { dispatch } = useJournalContext();
  const { user } = useAuthContext();
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

  const handleClick = async () => {
    const response = await fetch("/api/journals/journal/" + journal._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_JOURNAL", payload: json });
    }
  };

  const Update = async (e) => {
    const workouts = { title, note };

    const response = await fetch("/api/journals/journal/" + journal._id, {
      method: "PATCH",
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
      {!edit && <h4>{journal.title}</h4>}
      {edit && (
        <input
          placeholder="Title"
          className="update-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      <p className="workout-note">
        {!edit && <a>{journal.notes}</a>}
        {edit && (
          <input
            placeholder="Notes"
            className="update-input"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}
      </p>

      <p>
        {formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true })}
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

export default JournalDetails;
