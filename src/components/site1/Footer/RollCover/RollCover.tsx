import React from "react";
import "./rollcover.scss";

interface LeftOrRight {
  mirror: boolean;
}

const RollCover = ({ mirror }: LeftOrRight) => {
  return (
    <div className={`roll-cover ${mirror ? "cover-mirror" : ""}`}>
      <div className="container">
        <div className="cube">
          <div className="face top"></div>
          <div className="face bottom-cube"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face front"></div>
          <div className="face back"></div>
        </div>
      </div>
    </div>
  );
};

RollCover.defaultProps = {
  mirror: false,
};

export default RollCover;
