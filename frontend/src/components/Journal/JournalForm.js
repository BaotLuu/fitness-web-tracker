import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useJournalContext } from "../../hooks/useJournalContext";

export default function JournalForm() {
  const [notes, setNotes] = useState("");
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { dispatch } = useJournalContext();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const journal = { title, notes };

    const response = await fetch("/api/journals/journal", {
      method: "POST",
      body: JSON.stringify(journal),
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
      setNotes("");
      setError(null);
      console.log("new journal added", json);
      dispatch({ type: "CREATE_JOURNAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add an entry</h3>

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title"
      />
      <textarea
        type="text"
        placeholder="Tell me how are you feeling"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />
      <button className="addWorkout">Add Entry</button>
      {error && <div className="error">Title needed</div>}
    </form>
  );
}
