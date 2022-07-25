import { useState, useEffect } from "react";
import "./site1.scss";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
import axios from "axios";
// button commented out
// import searchIcon from "./search-icon.png";

import Puller from "./Puller/Puller";
const nbaLogo = require("./nba-logo.png");

// ---- search form work logic and order:
//
//  1. a user starts typing
//
//  2. second typed letter triggers balldontlie API call for
//     available names - this runs on every letter typed
//
//  3. the user picks a player they like from the list
//
//  4. the user clicks name from the list and that triggers
//     useNavigate redirect to the url based on player ID number
//
//  5. PlayerInfo.js takes the ID and makes a call to another
//     balldontlie API endpoint for the player data and
//     2nd call to DETA CLOUD API for the image.

interface IplayerDataObject {
  id: number | string;
  first_name: string;
  height_feet: number;
  height_inches: number;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  weight_pounds: number;
}

interface ItypingHelper {
  showNote: boolean;
  message: string;
}

// ░▓█▒░██▓░▒████▒░██████▒░

const Site1 = () => {
  //
  const [formValue, setFormValue] = useState<any | null>("");
  //
  // to store available name data from api call
  const [searchResults, setSearchResults] = useState<IplayerDataObject[]>([]);
  //
  // suggestion list
  const [suggestions, setSuggestion] = useState<IplayerDataObject[]>([]);
  //
  // straight redirect after clicking a name
  let navigate = useNavigate();
  //
  const [isSuggestionBoxVisible, setisSuggestionBoxVisible] = useState(false);
  //
  const [showTypingHelper, setShowTypingHelper] = useState<ItypingHelper>({
    showNote: false,
    message: "",
  });

  // search suggestion while typing
  const onChangeHandler = (text: string) => {
    // balldontlie API endpoint
    const url = `http://www.balldontlie.io/api/v1/players?search=${text}`;

    const loadPlayers = async () => {
      type ResponsePlayerData = {
        data: IplayerDataObject[];
      };

      try {
        const response = await axios.get<ResponsePlayerData>(url);
        if (response.status === 200) {
          setSearchResults(response.data.data);
          if (searchResults) {
            if (text.length > 0) {
              setSuggestion(searchResults);
              if (searchResults.length > 0) {
                setisSuggestionBoxVisible(true);
              }
            } else {
              setSuggestion([]);
              setisSuggestionBoxVisible(false);
            }
          }
        } else {
          typeHelperActivate("API problem");
        }
      } catch {
        typeHelperActivate("balldontlie.io not responding");
      }
    };
    // validate input
    if (inputOk(text)) {
      setFormValue(text);
      loadPlayers();
    }
  };

  // a little input text validator
  const inputOk = (inputString: string) => {
    // user starts with whitespace
    const whiteSpaceFirstLetter: boolean = inputString.startsWith(" ", 0);
    // turn all to lowercase
    const inputStringLowercase: string = inputString.toLowerCase();
    // input string lenght
    const inputStringLenght: number = inputStringLowercase.length;
    // Regex
    const numbersIncluded = /([0-9])/g;
    // Regex: same letter three times in a row
    const threeTimesSame = /([a-z ])\1{2}/i;
    // Regex: letters and dash only
    const lettersAndDashOnly = /^[a-zA-Z0-9- ]+$/;

    const isInputLengthZero = (upcomingInputLenght: number) => {
      if (upcomingInputLenght === 0) {
        return "yes";
      } else {
        return "no";
      }
    };

    // return
    if (!whiteSpaceFirstLetter) {
      if (inputStringLenght < 30) {
        if (!numbersIncluded.test(inputStringLowercase)) {
          if (!threeTimesSame.test(inputStringLowercase)) {
            // If input string is 0, regex cannot find letters
            // and code cannot move forward. So the letter-only-check is
            // not in use when the upcoming form value is 0.
            switch (isInputLengthZero(inputStringLenght)) {
              case "yes":
                return true;
              case "no":
                if (lettersAndDashOnly.test(inputStringLowercase)) {
                  return true;
                } else {
                  typeHelperActivate("no special characters");
                }
                break;

              default:
                break;
            }
          } else {
            typeHelperActivate("no more than 2 same letters");
          }
        } else {
          typeHelperActivate("no numbers");
        }
      } else {
        typeHelperActivate("no more than 30 characters");
      }
    } else {
      typeHelperActivate("cannot start with space");
    }

    return false;
  };

  //
  const typeHelperActivate = (message: string) => {
    // set message and show the notification
    setShowTypingHelper({
      showNote: true,
      message: message,
    });
    // remove notification
    const removeTypeHelper = () => {
      setShowTypingHelper({
        showNote: false,
        message: "",
      });
    };
    // wait time
    const timeToRemove: number = 4000;
    // removes the notification
    var timer = setTimeout(removeTypeHelper, timeToRemove);
  };

  // when clicking one of the suggestions
  const redirectHandler = (playerNumber: number | string) => {
    // close the search bar suggestion list
    setSuggestion([]);
    //
    setisSuggestionBoxVisible(false);
    //
    // empty search input
    setFormValue("");
    // redirect
    navigate("/browser/" + playerNumber);
  };

  // ░▓█▒░██▓░▒████▒░██████▒░

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    //insert eventlistener to close the search result list when clicking outside of it
    document.addEventListener("click", function clickOutside(e) {
      const suggestionContainer = document.querySelector(
        ".suggestion-container"
      );
      if (!suggestionContainer?.contains(e.target as Node)) {
        setSuggestion([]);
        setisSuggestionBoxVisible(false);
      }
    });
    //
    return () => {
      document.removeEventListener("click", function clickOutside(e) {
        const suggestionContainer = document.querySelector(
          ".suggestion-container"
        );
        if (!suggestionContainer?.contains(e.target as Node)) {
          setSuggestion([]);
          setisSuggestionBoxVisible(false);
        }
      });
    };
  }, []);
  //

  return (
    <>
      {" "}
      <div id="main" className="index-page flex site-1-background">
        <div className="puller-base">
          <Puller />
        </div>
        {/* ______________________________________________________ NBA LOGO */}
        <div className="title-container">
          <Link to="/browser">
            <img className="nba-logo" src={nbaLogo} alt="" />
          </Link>

          <h2 className="site-1-title">Browse NBA Players</h2>
        </div>
        <div className="form-section">
          <div
            className={`${
              isSuggestionBoxVisible
                ? "suggestion-list-bg-open"
                : "suggestion-list-bg-closed"
            }`}
          ></div>
          {/* Search Engine */}
          {/* ________________________________________________________ FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="search-bar">
              <input
                className="site-1-input"
                type="text"
                onChange={(e) => onChangeHandler(e.target.value)}
                name="name"
                placeholder="Enter Player Name..."
                spellCheck={"false"}
                autoComplete="off"
                value={formValue}
              />
              {showTypingHelper.showNote ? (
                <div className="typing-helper">
                  <p className="typing-helper-text">
                    {showTypingHelper.message}
                  </p>
                </div>
              ) : null}

              {/* _____________________________________ SUGGESTION CONTAINER */}

              <div className="suggestion-container">
                {suggestions &&
                  suggestions.map((suggestion, i) => (
                    <div
                      className="suggestion-box"
                      key={i}
                      onClick={() => {
                        redirectHandler(suggestion.id);
                      }}
                    >
                      {suggestion.first_name} {suggestion.last_name}{" "}
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </div>

        {/* This is the area where the data will be displayed */}
        {/* _________________________________________ PLAYER INFO CARD  */}
        <Routes>
          <Route path=":playerId" element={<PlayerInfo />} />
        </Routes>
      </div>
      {/* Footer and end of the site */}
      {/* _______________________________________________________ FOOTER */}
      <Footer />
    </>
  );
};

export default Site1;
