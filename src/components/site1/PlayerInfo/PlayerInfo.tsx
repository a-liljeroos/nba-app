import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pin from "./pin/Pin";
import NoImage from "./noimage/NoImage";
import NextButton from "./nextButton/NextButton";
import { TupleType } from "typescript";

const teamDoodle = require("./team.png");

// ░▓█▒░██▓░▒████▒░████████████████████████▒░

interface IplayerDataObject {
  id: number;
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
  image: string;
}

interface IplayerImageUrl {
  url: string;
}

let playerDataObject = {
  id: 0,
  first_name: "",
  height_feet: 0,
  height_inches: 0,
  last_name: "",
  position: "",
  team: {
    id: 0,
    abbreviation: "",
    city: "",
    conference: "",
    division: "",
    full_name: "",
    name: "",
  },
  weight_pounds: 0,
  image: "",
};

// ░▓█▒░██▓░▒████▒░████████████████████████▒░
// This is the area where the data will be displayed
const PlayerInfo = () => {
  // useEffect fetches the player data based on the player ID
  const { playerId } = useParams();

  const [playerInfo, setPlayerInfo] = useState<any | null>(playerDataObject);
  // # player info
  //
  const [playerImageUrl, setPlayerImageUrl] = useState<IplayerImageUrl>({
    url: "",
  });
  // #-# team info
  //
  const [foundImage, setfoundImage] = useState(false);
  // #-#-# can the deta API find an image
  //
  const [isSuggestionBoxVisible, setisSuggestionBoxVisible] = useState(true);

  // this will fetch the player data when the component renders

  // ░▓█▒░██▓░▒████▒░████████████████▒░
  useEffect(() => {
    //
    //
    //  █████████████████████████████
    //   ██ AXIOS GET PLAYER DATA ██
    //  █████████████████████████████
    //

    const getPlayerData = async () => {
      type ResponsePlayerData = {
        data: IplayerDataObject;
      };
      const url = `https://www.balldontlie.io/api/v1/players/${playerId}`;

      const response = await axios.get<ResponsePlayerData>(url);

      if (response.status === 200) {
        setPlayerInfo(response.data);
      }
    };
    //
    //
    //  ███████████████████████
    //   ██ AXIOS GET IMAGE ██
    //  ███████████████████████
    //

    const getPlayerImage = async () => {
      const playerName = playerInfo.first_name + "+" + playerInfo.last_name;

      const response = await axios.get(
        `https://4hbtux.deta.dev/site1/image/${playerName}`
      );
      //console.log("image time", today.toISOString());
      if (response.status === 200) {
        // Image switch (show no image picture)
        if (Object.keys(response.data).length < 1) {
          // #-#-#
          setfoundImage(false);
          setPlayerImageUrl({ url: "" });
        } else {
          // #-#-#
          setfoundImage(true);
          setPlayerImageUrl({ url: response.data[0] });
        }
      } else {
        setfoundImage(false);
      }
    };
    //
    //
    //
    //RUN API CALLS
    getPlayerData();
    getPlayerImage();
  }, [playerId]);
  //

  // ░▓█▒░██▓░▒████▒░██████████████▒░
  // with some players the position string is longer than 1 and it causes
  // problems with the layout
  const islongPositionText = (a: string) => {
    if (a.length < 2) {
      return false;
    } else {
      return true;
    }
  };
  // ⦿ ⦿ ⦿ ⦿ ⦿ ⦿
  return (
    <div className="player-card">
      {/*  <NextButton playerid={playerId} /> */}
      {/* _______________________________________ PLAYER NAME */}

      <h4 className="player-name narrow-screen">
        <Pin location={"pin1"} />
        {playerInfo.first_name}{" "}
        <span className="last-name">{playerInfo.last_name}</span>
        <Pin location={"pin2"} mirror={true} />
      </h4>
      {/* __________________________________________ PLAYER IMAGE */}
      <div className="player-img">
        {foundImage ? (
          <>
            <img
              src={playerImageUrl.url}
              alt="an image of the player"
              className="player-card-img "
            />

            <div className="show-player-image-note">
              <p className="image-note-text">
                Disclaimer!
                <br />{" "}
                <h4 className="image-note-text-bottom">
                  The image might not be accurate.
                </h4>
              </p>
            </div>
          </>
        ) : (
          <NoImage />
        )}
      </div>
      <div className="player-data">
        {/* _____________________________________ PLAYER NAME TAPE */}
        <h4 className="player-name wide-screen">
          <Pin location={"pin1"} />
          {playerInfo.first_name}{" "}
          <span className="last-name">{playerInfo.last_name}</span>
          {playerInfo[1]}
          <Pin location={"pin2"} mirror={true} />
        </h4>
        {/* __________________________________________ TEAM CARD */}
        <div className="team-section team-card-surface">
          <div className="table-title-box">
            <div className="table-header">TEAM</div>
            <img
              className="team-doodle"
              src={teamDoodle}
              alt="team doodle image"
            />

            <h4 className="table-team-name">{playerInfo.team.full_name}</h4>
          </div>
          {/* ________________________________________ TEAM INFO TABLE */}
          <table>
            <tbody>
              {/*   <tr>
                <th>Name</th>
                <td>{playerInfo.team.full_name}</td>
              </tr> */}
              <tr>
                <th>City</th>
                <td>{playerInfo.team.city}</td>
              </tr>
              <tr>
                <th>Abbreviation</th>
                <td>{playerInfo.team.abbreviation}</td>
              </tr>

              <tr>
                <th>Conference</th>
                <td>{playerInfo.team.conference}</td>
              </tr>
              <tr>
                <th>Division</th>
                <td>{playerInfo.team.division}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ________________________________________ POSITION */}
      <div className="player-position-data">
        <div className="position-title">POSITION</div>

        {/* if the database doesn't provide position info */}
        {playerInfo.position ? (
          <h4
            className={`position-h4 ${
              islongPositionText(playerInfo.position) ? "longPositionText" : ""
            }`}
          >
            {playerInfo.position}
          </h4>
        ) : (
          <h5 className="unknown-position">unknown</h5>
        )}
      </div>
      {/* <NextButton mirror={true} playerid={playerId} /> */}
    </div>
  );
};

export default PlayerInfo;
