import React from "react";
import { Link } from "react-router-dom";
import "./nextbutton.scss";

export interface NextButtonProps {
  mirror: boolean;
  playerid: number;
}

const NextButton = ({ mirror, playerid }: NextButtonProps) => {
  if (mirror) {
    playerid = playerid + 1;
  } else {
    // old working line
    // playerid = parseInt(playerid) - 1;
    playerid = playerid - 1;
  }
  return (
    <Link to={`/browser/${playerid}`}>
      <div
        className={`next-button ${
          mirror ? "next-button-right" : "next-button-left"
        }`}
      >
        <div className="next-button-arrow"></div>
      </div>
    </Link>
  );
};

NextButton.defaultProps = {
  playerid: 0,
  mirror: false,
};

export default NextButton;
