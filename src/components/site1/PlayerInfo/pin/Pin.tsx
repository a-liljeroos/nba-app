import React from "react";
import "./Pins.scss";

export interface PinProps {
  mirror: boolean;
  location: string;
}

const Pin = ({ mirror, location }: PinProps) => {
  return (
    <div className={`pin-base ${mirror ? "pin-mirror" : ""} ${location}`}>
      <div className="needle">
        <div className="shadow"></div>
        <div className="safety-ring"></div>
        <div className="handle"></div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

Pin.defaultProps = {
  location: "",
  mirror: false,
};

export default Pin;
