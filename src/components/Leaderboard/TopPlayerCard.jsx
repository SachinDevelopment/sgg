import React, { useMemo } from "react";
import { importAll, wrToRank } from "../../utils";
import classNames from "classnames";
import WinrateBar from "./WinrateBar";
import {  Link } from "react-router-dom";
const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

const Card = ({ player, ranking }) => {
  const rank = useMemo(() => wrToRank(player?.rating, player?.wins+player?.loses), [player]);
  return (
    <div className="h-40 w-1/2 rounded-lg bg-gray-800 flex justify-between">
      <div className="flex flex-col space-y-2 p-3 w-1/2">
        <div className="flex items-center space-x-2">
          <div className="h-6 pl-1 pr-1 bg-blue-900 rounded flex items-center justify-center text-blue-300 text-xl font-bold text-center">
            {ranking}
          </div>
            <Link to={`/player/${player.id}/stats`} className="text-xl font-semibold text-blue-400">
              {player?.name}
            </Link>
        </div>
        <div className="flex bg-gray-900 p-1 justify-center space-x-2 items-center rounded font-semibold text-xs w-full">
          <div className="w-10">
            <img src={images[`${rank}.svg`]} alt=""></img>
          </div>
          <div className="text-blue-200 text-sm">{rank}</div>
          <div>/</div>
          <div className="text-gray-200">{player?.rating} MMR</div>
        </div>
        <div className="flex bg-gray-900 p-2 justify-center rounded font-semibold text-sm">
          <WinrateBar
            winrate={player?.winrate}
            count={player?.wins + player?.loses}
          />
        </div>
      </div>
      <div
        className="relative flex items-center opacity-80 overflow-hidden gradient-mask-l-0 rounded h-full"
        style={{ width: "19rem" }}
      >
        <img
          className="absolute top-0"
          src={`https://static.u.gg/assets/lol/riot_static/11.9.1/img/splash/${
            player?.fav_champs[0]?.name === "Jarvan"
              ? "JarvanIV"
              : player?.fav_champs[0]?.name
          }_0.jpg`}
        />
      </div>
    </div>
  );
};

export default Card;
