import { useEffect, useState } from "react";
import JournalDetails from "../components/Journal/JournalDetails";
import JournalForm from "../components/Journal/JournalForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useJournalContext } from "../hooks/useJournalContext";

const Journal = ({}) => {
  const { journals, dispatch } = useJournalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await fetch("/api/journals/journal", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOURNAL", payload: json });
      }
    };
    if (user) {
      fetchJournal();
    }

    console.log("use effect journal");
  }, []);

  return (
    <div>
      <div className="hero-section">
        <h1>My Journal</h1>
      </div>
      <div className="home">
        <div className="workouts">
          {journals &&
            journals.map((journal) => (
              <JournalDetails key={journal._id} journal={journal} />
            ))}
        </div>
        <JournalForm />
      </div>
    </div>
  );
};

export default Journal;
