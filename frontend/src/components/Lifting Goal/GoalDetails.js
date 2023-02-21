import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoalContext } from "../../hooks/useGoalContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function GoalDetails({ goal }) {
  const { dispatch } = useGoalContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [sWeight, setstartWeight] = useState("");
  const [eWeight, setEndweight] = useState("");
  const [sRep, setSrep] = useState("");
  const [eRep, setERep] = useState("");
  const [timeframe, setTimeFrame] = useState("");

  const handleClick = async () => {
    const response = await fetch("/api/lgoal/liftinggoal/" + goal._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GOAL", payload: json });
    }
  };

  const Update = async (e) => {
    const workouts = { title, sWeight, eWeight, sRep, eRep, timeframe };

    const response = await fetch("/api/lgoal/liftinggoal/" + goal._id, {
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
      {!edit && <h4>{goal.title}</h4>}
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
            Starting Weight/Distance:
            <a className="workout-details-a">{goal.sWeight}</a>
          </strong>
        )}

        {edit && (
          <input
            placeholder="Starting Weight/distance"
            className="update-input"
            type="text"
            value={sWeight}
            onChange={(e) => setstartWeight(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Goal Weight/Distance to reach:{" "}
            <a className="workout-details-a">{goal.eWeight}</a>
          </strong>
        )}

        {edit && (
          <input
            placeholder=" Goal Weight/Distance you want reach"
            className="update-input"
            type="text"
            value={eWeight}
            onChange={(e) => setEndweight(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Starting Repetitions/Time:
            <a className="workout-details-a">{goal.sRep}</a>{" "}
          </strong>
        )}

        {edit && (
          <input
            placeholder="Starting Repetitions/Time"
            className="update-input"
            type="text"
            value={sRep}
            onChange={(e) => setSrep(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            Goal Repetitions/Time to reach:{" "}
            <a className="workout-details-a">{goal.sRep}</a>
          </strong>
        )}

        {edit && (
          <input
            placeholder="Goal Repetitions/Time you want to reach"
            className="update-input"
            type="text"
            value={eRep}
            onChange={(e) => setERep(e.target.value)}
          />
        )}
      </p>
      <p className="workout-details-p">
        {!edit && (
          <strong>
            End of goal date:{" "}
            <a className="workout-details-a">{goal.timeframe} </a>
          </strong>
        )}

        {edit && (
          <input
            placeholder="Timeframe"
            className="update-input"
            type="text"
            value={timeframe}
            onChange={(e) => setTimeFrame(e.target.value)}
          />
        )}
      </p>
      <p>
        {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
      </p>

      <span onClick={handleClick} className="material-symbols-outlined ">
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

export default GoalDetails;
