import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const HeroLink = () => {
  const [showLinks, setShowLinks] = useState(false);

  const closeMenu = () => setShowLinks(false);
  return (
    <div className="hero">
      <div className="herolink" id={showLinks ? "hidden" : ""}>
        <Link to="/workout" className="herolink-items" onClick={closeMenu}>
          <h2>Exercises Log</h2>
        </Link>

        <Link to="/journal" className="herolink-items" onClick={closeMenu}>
          <h2>Journal</h2>
        </Link>

        <Link to="/liftinggoal" className="herolink-items" onClick={closeMenu}>
          <h2>Fitness Goals</h2>
        </Link>

        <Link to="/fitnessgoal" className="herolink-items" onClick={closeMenu}>
          <h2>Body Weight Goals</h2>
        </Link>

        <Link to="/workoutplans" className="herolink-items" onClick={closeMenu}>
          <h2>Workout Plan</h2>
        </Link>

        <Link to="/faq" className="herolink-items" onClick={closeMenu}>
          <h2>F.A.Q</h2>
        </Link>
      </div>
      <button className="open-btn" onClick={() => setShowLinks(!showLinks)}>
        {showLinks ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default HeroLink;
