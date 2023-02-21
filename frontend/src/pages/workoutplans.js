import React from "react";
import { Link } from "react-router-dom";

function workoutplans() {
  return (
    <div className="workoutplans">
      <Link to="/workoutplan1" className="workoutplans-items">
        Workout Plan 1
      </Link>
      <Link to="/workoutplan2" className="workoutplans-items">
        Workout Plan 2
      </Link>
      <Link to="/workoutplan3" className="workoutplans-items">
        Workout Plan 3
      </Link>
      <Link to="/workoutplan4" className="workoutplans-items">
        Workout Plan 4
      </Link>
      <Link to="/workoutplan5" className="workoutplans-items">
        Workout Plan 5
      </Link>
    </div>
  );
}

export default workoutplans;
