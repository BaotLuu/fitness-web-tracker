import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFGoalContext } from "../../hooks/useFGoalContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function FGoalDetails({ fgoal }) {
  const { dispatch } = useFGoalContext();
  const { user } = useAuthContext();
  const [sTime, setStartTime] = useState("");
  const [error, setError] = useState(null);
  const [eTime, setEndTime] = useState("");
  const [sDistance, setSDistance] = useState("");
  const [eDistance, setEDistance] = useState("");
  const [timeframe, setTimeFrame] = useState("");
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

  const handleClick = async () => {
    const response = await fetch("/api/fgoal/fitnessgoal/" + fgoal._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FGOAL", payload: json });
    }
  };

  const handleEdit = () => {
    setTitle(fgoal.title);
    setStartTime(fgoal.sTime);
    setEndTime(fgoal.eTime);
    setSDistance(fgoal.sDistance);
    setEDistance(fgoal.eDistance);
    setTimeFrame(fgoal.timeframe);
    setEdit(true);
  };

  const Update = async (e) => {
    const workouts = { title, sTime, eTime, sDistance, eDistance, timeframe };

    const response = await fetch("/api/fgoal/fitnessgoal/" + fgoal._id, {
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
      {!edit && <h4>{fgoal.title}</h4>}
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
            Starting Body Weight:{" "}
            <a className="workout-details-a">{fgoal.sTime}</a>
          </strong>
        )}
        {edit && (
          <input
            placeholder="Starting Body Weight"
            className="update-input"
            type="text"
            value={sTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Goal Body Weight:{" "}
            <a className="workout-details-a"> {fgoal.eTime}</a>
          </strong>
        )}
        {edit && (
          <input
            placeholder="Body Weight you want to reach"
            className="update-input"
            type="text"
            value={eTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        )}
      </p>

      <p className="workout-details-p">
        {!edit && (
          <strong>
            Calories Consumed:{" "}
            <a className="workout-details-a"> {fgoal.sDistance}</a>
          </strong>
        )}

        {edit && (
          <input
            placeholder="Calories Consumed"
            className="update-input"
            type="text"
            value={sDistance}
            onChange={(e) => setSDistance(e.target.value)}
          />
        )}
      </p>

      <p className="workout-details-p">
        {!edit && (
          <strong>
            Calories Burned:
            <a className="workout-details-a"> {fgoal.eDistance}</a>
          </strong>
        )}
        {edit && (
          <input
            placeholder="Calories Burned"
            className="update-input"
            type="text"
            value={eDistance}
            onChange={(e) => setEDistance(e.target.value)}
          />
        )}
      </p>

      <p className="workout-details-p">
        {!edit && (
          <strong>
            End of goal Date:
            <a className="workout-details-a"> {fgoal.timeframe}</a>{" "}
          </strong>
        )}

        {edit && (
          <input
            placeholder="End of goal Date"
            className="update-input"
            type="text"
            value={timeframe}
            onChange={(e) => setTimeFrame(e.target.value)}
          />
        )}
      </p>
      <p>
        {formatDistanceToNow(new Date(fgoal.createdAt), { addSuffix: true })}
      </p>

      <span onClick={handleClick} className="material-symbols-outlined ">
        delete
      </span>
      {!edit && (
        <span onClick={handleEdit} className="workout-details-span">
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

export default FGoalDetails;
