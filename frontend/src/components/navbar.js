import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <ul className="nav-list">
          <Link to="/workout" className="nav-items">
            <h1>myfitnessfit</h1>
          </Link>

          {user && (
            <div className="nav-rightside">
              <span className="nav-rightside-items">
                Welcome {user.userName}
              </span>
              <button onClick={handleClick} className="nav-rightside-items">
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="nav-rightside">
              <Link to="/login" className="nav-rightside-items">
                Log in
              </Link>

              <Link to="/signup" className="nav-rightside-items">
                Sign Up
              </Link>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
