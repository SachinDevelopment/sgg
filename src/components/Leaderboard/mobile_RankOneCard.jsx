import React, { useMemo } from "react";
import { importAll, wrToRank } from "../../utils";
import WinrateBar from "./WinrateBar";
import {  Link } from "react-router-dom";

const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

const Card = ({ player }) => {
  const rank = useMemo(() => wrToRank(player?.rating, player?.wins+player?.loses), [player]);

  return (
    <div className="h-40 rounded-lg bg-gray-900 flex justify-between m-1">
      <div className="flex flex-col justify-between m-3 bg-gray-900">
        <div className="flex items-center justify-left space-x-4">
          <div className="h-6 pl-1 pr-1 bg-blue-900 rounded flex items-center justify-center text-blue-300 text-xl font-bold text-center">
            1
          </div>
            <Link to={`/player/${player.id}/stats`} className="text-lg font-semibold text-yellow-500">{player?.name}</Link>
        </div>
        <div className="flex bg-gray-800 p-1 justify-center space-x-2 items-center rounded font-semibold text-xs w-full">
          <div className="w-10">
            <img src={images[`${rank}.svg`]} alt=""></img>
          </div>
          <div>/</div>
          <div className="text-gray-200">{player?.rating}</div>
        </div>
        <div className="flex bg-gray-800 p-2 justify-center rounded font-semibold text-sm">
          <WinrateBar
            winrate={player?.winrate}
            count={player?.wins + player?.loses}
          />
        </div>
      </div>
      <div className="opacity-90 gradient-mask-l-0 rounded" >
        <img className="h-full w-full object-cover" src={`https://static.u.gg/assets/lol/riot_static/11.9.1/img/splash/${
            player?.fav_champs[0]?.name === "Jarvan"
              ? "JarvanIV"
              : player?.fav_champs[0]?.name
          }_0.jpg`} />
      </div>
    </div>
  );
};

export default Card;
