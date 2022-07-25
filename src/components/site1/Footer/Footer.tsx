import React from "react";
import RollCover from "./RollCover/RollCover";
export function Footer({}) {
  return (
    <footer className="site1-footer">
      <div className="roll-cover-base">
        <RollCover />
      </div>
      <div className="fill-block-footer-site1"></div>
      <h4 className="footer-text">
        Powered by {"  "}
        <a
          className="balldontlielink"
          target={"_blank"}
          href="https://www.balldontlie.io/"
        >
          {"  "}balldontlie.io
        </a>
      </h4>
      <div className="light">
        <div className="bottom-light"></div>
      </div>
      <div className="fill-block-footer-site1"></div>
      <div className="roll-cover-base">
        <RollCover mirror={true} />
      </div>
    </footer>
  );
}
