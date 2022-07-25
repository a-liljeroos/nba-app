import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="nav__1">
        <Link to="/nba-app#home">
          <span className="italic-txt nav-title">S</span>
          <span className="nav-title">ITE</span>
        </Link>
      </div>
      <div className="nav__2">
        <Link to="/browser">
          <span className="nav-link nav-link-animation">
            NBA<span className="nav-link-number"> app</span>
          </span>
        </Link>

        {/*  <Link to="/site2">
          <span className="nav-link nav-link-animation">
            page<span className="nav-link-number "> 2</span>
          </span>
        </Link>
        <Link to="/site3">
          <span className="nav-link nav-link-animation">
            page<span className="nav-link-number"> 3</span>
          </span>
        </Link> */}
      </div>
    </nav>
  );
};

export default Nav;
