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
    <div className="h-40 rounded-lg bg-gray-800 flex justify-between">
      <div className="flex flex-col justify-between p-3">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-12 bg-blue-900 rounded flex items-center justify-center text-blue-300 text-4xl font-bold">
            1
          </div>
            <Link to={`/lol/player/${player.id}/stats`} className="text-4xl font-semibold text-yellow-500">{player?.name}</Link>
        </div>
        <div className="flex bg-gray-900 p-2 justify-between items-center rounded font-semibold space-x-8">
          <div className="flex space-x-4 items-center pt-1 pb-1">
            <div className="w-10">
              <img src={images[`${rank}.svg`]} alt="" />
            </div>
            <div className="text-blue-200">{rank}</div>
            <div>/</div>
            <div>{player?.rating} MMR</div>
          </div>
          <div className="flex bg-gray-900 justify-center items-center rounded font-semibold">
            <WinrateBar
              winrate={player?.winrate}
              count={player?.wins + player?.loses}
            />
          </div>
        </div>
      </div>
      <div className="relative w-150 flex items-center opacity-80 overflow-hidden gradient-mask-l-0 rounded" >
        <img className="top-0 absolute" src={`https://static.u.gg/assets/lol/riot_static/11.9.1/img/splash/${
            player?.fav_champs[0]?.name === "Jarvan"
              ? "JarvanIV"
              : player?.fav_champs[0]?.name
          }_0.jpg`} />
      </div>
    </div>
  );
};

export default Card;
