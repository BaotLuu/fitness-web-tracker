import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoalContext } from "../../hooks/useGoalContext";

export default function GoalForm() {
  const { user } = useAuthContext();
  const { dispatch } = useGoalContext();
  const [sWeight, setstartWeight] = useState("");
  const [error, setError] = useState(null);
  const [eWeight, setEndweight] = useState("");
  const [sRep, setSrep] = useState("");
  const [eRep, setERep] = useState("");
  const [timeframe, setTimeFrame] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goal = {
      title,
      sWeight,
      eWeight,
      sRep,
      eRep,
      timeframe,
    };

    const response = await fetch("/api/lgoal/liftinggoal", {
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
      setstartWeight("");
      setEndweight("");
      setSrep("");
      setERep("");
      setTimeFrame("");
      setError(null);
      console.log("new Goal added", json);
      dispatch({ type: "CREATE_GOAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a goal</h3>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Any goal"
      />

      <h3>Starting lifting weight/distance</h3>
      <input
        type="text"
        onChange={(e) => setstartWeight(e.target.value)}
        value={sWeight}
        placeholder="Starting lifting weight/distance"
      />

      <h3>Goal weight/distance to reach</h3>
      <input
        type="text"
        onChange={(e) => setEndweight(e.target.value)}
        value={eWeight}
        placeholder="Goal weight/distance you want to reach"
      />

      <h3>Starting Repetitions/Time</h3>
      <input
        type="text"
        onChange={(e) => setSrep(e.target.value)}
        value={sRep}
        placeholder="Starting Repetitions/Time"
      />

      <h3>Goal Repetitions/Time to reach</h3>
      <input
        type="text"
        onChange={(e) => setERep(e.target.value)}
        value={eRep}
        placeholder="Goal Repetitions/Time you want to reach"
      />

      <h3>Goal date</h3>
      <input
        type="text"
        onChange={(e) => setTimeFrame(e.target.value)}
        value={timeframe}
        placeholder="Timeframe to reach the goal"
      />
      <button className="addWorkout">Add Goal</button>
      {error && <div className="error">Exercise Title needed</div>}
    </form>
  );
}
