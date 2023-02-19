import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFGoalContext } from "../../hooks/useFGoalContext";

export default function FGoalForm() {
  const { user } = useAuthContext();
  const { dispatch } = useFGoalContext();
  const [sTime, setStartTime] = useState("");
  const [error, setError] = useState(null);
  const [eTime, setEndTime] = useState("");
  const [sDistance, setSDistance] = useState("");
  const [eDistance, setEDistance] = useState("");
  const [timeframe, setTimeFrame] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goal = {
      title,
      sTime,
      sDistance,
      eDistance,
      eTime,
      timeframe,
    };

    const response = await fetch("/api/fgoal/fitnessgoal", {
      method: "POST",
      body: JSON.stringify(goal),
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
      setStartTime("");
      setEndTime("");
      setSDistance("");
      setEDistance("");
      setTimeFrame("");
      setError(null);
      console.log("new fGoal added", json);
      dispatch({ type: "CREATE_FGOAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a Goal</h3>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Any goal"
      />

      <h3>Starting Body Weight</h3>
      <input
        type="text"
        onChange={(e) => setStartTime(e.target.value)}
        value={sTime}
        placeholder="Starting Body Weight"
      />

      <h3>Goal Body Weight</h3>
      <input
        type="text"
        onChange={(e) => setEndTime(e.target.value)}
        value={eTime}
        placeholder="Body Weight you want to reach"
      />

      <h3>Calories Consumed</h3>
      <input
        type="text"
        onChange={(e) => setSDistance(e.target.value)}
        value={sDistance}
        placeholder="Calories Consumed"
      />

      <h3>Calories Burned</h3>
      <input
        type="text"
        onChange={(e) => setEDistance(e.target.value)}
        value={eDistance}
        placeholder="Calories Burned"
      />

      <h3>Goal date</h3>
      <input
        type="text"
        onChange={(e) => setTimeFrame(e.target.value)}
        value={timeframe}
        placeholder="Timeframe to reach the goal"
      />
      <button className="addWorkout">Add Goal</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
