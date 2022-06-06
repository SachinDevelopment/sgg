import React, { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { importAll, CHAMPIONS, ROLES, tailwindWinratecolor } from "../../utils";

import classnames from "classnames";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const positions = importAll(
  require.context("../../../assets/positions", false, /\.png/)
);
const fillIcon = positions["fill_icon.png"];
const jungleIcon = positions["jungle_icon.png"];
const laneIcon = positions["lane_icon.png"];

const images = importAll(
  require.context("../../../assets/champions", false, /\.png/)
);

export default function PlayerCard({
  player,
  setTeam,
  team,
  index,
  color,
  socket,
}) {

  return (
    <div
      key={`${player.name}-${index}`}
      className={classnames(
        "flex flex-col justify-between mb-1 w-96 rounded p-1 h-36 w-full overflow-hidden bg-gradient-to-l from-black",
        { "to-darkRed": color === "red", "to-darkBlue": color === "blue" }
      )}
    >
      <div className="flex justify-between items-center h-full">
        <Link to={`/lol/player/${player.id}/stats`}>
          <div className="text-2xl mr-2 ml-2">{player.name}</div>
        </Link>
        <div className="flex items-end space-x-1 space-y-1 text-sm text-gray-600 justify-center">
          {player?.fav_champs?.map((champ) => {
            const winrate = (
              (champ.wins / (champ.loses + champ.wins)) *
              100
            ).toFixed(0);
            return (
              <div
                key={uuid()}
                className={`flex items-center justify-center min-w-max border-2 border-${tailwindWinratecolor(
                  winrate
                )}`}
              >
                <img
                  className="w-10 h-10"
                  alt=""
                  src={images[`${champ.name}Square.png`]}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center justify-center">
          <div className="w-10">
            {player.role === "Jungle" ? (
              <img alt="" src={jungleIcon} />
            ) : player.role === "Lane" ? (
              <img alt="" src={laneIcon} />
            ) : player.role === "Fill" ? (
              <img alt="" src={fillIcon} />
            ) : (
              ""
            )}
          </div>
          <div className="w-8">
            {player.champion !== "Champion" &&
              images[`${player.champion}Square.png`] && (
                <img alt="" src={images[`${player.champion}Square.png`]} />
              )}
          </div>
        </div>
      </div>
      <div className="flex bg-gray-700 m-1">
        <div className="flex-1">
          <Autocomplete
            value={player.role || ROLES[0]}
            onChange={(event, newInputValue) => {
              if (!ROLES.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);

              socket.emit(color === "red" ? "redUpdate" : "blueUpdate",[
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={ROLES}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
        <div className="flex-1">
          <Autocomplete
            value={player.champion || CHAMPIONS[0]}
            onChange={(event, newInputValue) => {
              if (!CHAMPIONS.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);

              socket.emit(color === "red" ? "redUpdate" : "blueUpdate", [
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={CHAMPIONS}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
      </div>
    </div>
  );
}
