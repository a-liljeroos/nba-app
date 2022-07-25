import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import "./home-2.scss";
const GitImage = require("./git.png");
const NbaImage = require("./nba-site.PNG");

const initialThemeState = {
  theme: "glassy",
  setTheme: () => null,
};

const Home = () => {
  const boxDiv = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [theme, setTheme] = useState(initialThemeState.theme);

  // set theme
  useEffect(() => {
    let input = document.querySelectorAll(`input`)[0];
    input.setAttribute("checked", "checked");
  }, []);

  // eventlisteners for the buttons
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    const links = document.querySelectorAll(`.home-link-${theme}`);

    links[0].addEventListener("mouseenter", function (e) {
      links[0].classList.remove(`pulse-${theme}`);
      links[1].classList.remove(`pulse_-${theme}`);
    });
    links[1].addEventListener("mouseenter", function (e) {
      links[0].classList.remove(`pulse-${theme}`);
      links[1].classList.remove(`pulse_-${theme}`);
    });

    links[0].addEventListener("mouseleave", function (e) {
      links[0].classList.add(`pulse-${theme}`);
      links[1].classList.add(`pulse_-${theme}`);
    });
    links[1].addEventListener("mouseleave", function (e) {
      links[0].classList.add(`pulse-${theme}`);
      links[1].classList.add(`pulse_-${theme}`);
    });
  }, [theme]);

  //theme selector
  const changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div className={`home-page-index-${theme}`}>
      <div className={`home-page-index-bg-pattern-${theme}`}> </div>
      <div className={`home-page-index-bg-light-${theme}`}> </div>

      <div className={`home-page-box-${theme}`}>
        <div ref={boxDiv} className={`box_-${theme} `}>
          <div className={`home-link-images-${theme}`}>
            <Link to="/browser#main">
              <img id={`img1-${theme}`} src={NbaImage} alt="NbaImage" />
            </Link>
          </div>

          <div className={`home-link-${theme}  pulse-${theme}`}>
            <Link to="/browser#main">
              <div className={`link-text-area-${theme}`}>
                <h4 className={`slash-${theme} home-link-app-${theme}`}>\</h4>
                <h4
                  className={`home-link-text-${theme} home-link-app-${theme}`}
                >
                  app
                </h4>
              </div>
            </Link>
          </div>
        </div>

        <div className={`box_-${theme}`}>
          <div className={`home-link-${theme} pulse_-${theme}`}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/a-liljeroos/nba-app"
            >
              <div className={`link-text-area-${theme}`}>
                <h4 className={`slash-${theme}`}>\ </h4>

                <h4 className={`home-link-text-${theme}`}>code</h4>
              </div>
            </a>
          </div>
          <div className={`home-link-images-${theme}`}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/a-liljeroos/nba-app"
            >
              <img id={`img2-${theme}`} src={GitImage} alt="GitImage" />
            </a>
          </div>
        </div>
      </div>
      <div className={`theme-pickers-${theme}`}>
        <h4 className={`change-theme-title-${theme}`}>change theme</h4>
        <form name="theme-form" className={`theme-form-${theme}`}>
          {themeOptions.map((option, idx) => (
            <div className={`theme-picker-container-${theme}`} key={idx}>
              <label className={`theme-picker-input-label-${theme}`}>
                {option.value}
              </label>
              <input
                className={`theme-picker-input-${theme}`}
                name="theme"
                value={option.value}
                type="radio"
                onChange={changeTheme}
              />
            </div>
          ))}
        </form>
        <div className={`cables-${theme}`}>
          <div className="cable-1"></div>
          <div className="cable-2"></div>
          <div className="cable-3"></div>
        </div>
      </div>
    </div>
  );
};

const themeOptions = [{ value: "glassy" }, { value: "simple" }];

export default Home;
