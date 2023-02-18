import { Link } from "react-router-dom";

const HeroLink = () => {
  return (
    <div className="herolink">
      <Link to="/workout" className="herolink-items">
        <h2>Exercises Log</h2>
      </Link>

      <Link to="/journal" className="herolink-items">
        <h2>Journal</h2>
      </Link>

      <Link to="/liftinggoal" className="herolink-items">
        <h2>Lifting Goals</h2>
      </Link>

      <Link to="/fitnessgoal" className="herolink-items">
        <h2>Fitness Goals</h2>
      </Link>

      <Link to="/workoutplans" className="herolink-items">
        <h2>Workout Plan</h2>
      </Link>

      <Link to="/faq" className="herolink-items">
        <h2>F.A.Q</h2>
      </Link>
    </div>
  );
};

export default HeroLink;
