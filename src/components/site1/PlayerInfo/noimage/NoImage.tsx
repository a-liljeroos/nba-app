import React from "react";
import "./noimage.scss";
const noBall = require("./ball.png");

const NoImage = () => {
  return (
    <div className="no-image">
      <img className="no-image-image" src={noBall} alt="" />

      <h3 className="no-image-text">Image Not Found</h3>
    </div>
  );
};

export default NoImage;
