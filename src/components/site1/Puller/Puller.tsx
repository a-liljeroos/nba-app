import React from "react";
import "./puller.scss";
const Handle = require("./handle.svg");

const Puller = () => {
  return (
    <div className="puller">
      <div className="puller-handle">
        <img src={Handle} alt="puller-handle" />
      </div>
    </div>
  );
};

export default Puller;
