import React, { useMemo } from "react";
import { importAll, wrToRank } from "../../utils";
import WinrateBar from "./WinrateBar";
import {  Link } from "react-router-dom";
const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

const Card = ({ player, ranking }) => {
  const rank = useMemo(() => wrToRank(player?.rating, player?.wins+player?.loses), [player]);
  return (
    <div className="h-40 rounded-lg bg-gray-900 w-full mx-1">
      <div className="flex flex-col space-y-2 p-3">
        <div className="flex items-center space-x-2">
          <div className="h-6 pl-1 pr-1 bg-blue-900 rounded flex items-center justify-center text-blue-300 text-xl font-bold text-center">
            {ranking}
          </div>
            <Link to={`/lol/player/${player.id}/stats`} className="text-xl font-semibold text-blue-400">
              {player?.name}
            </Link>
        </div>
        <div className="flex bg-gray-800 p-1 justify-center space-x-2 items-center rounded font-semibold text-xs w-full">
          <div className="w-10">
            <img src={images[`${rank}.svg`]} alt=""/>
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
    </div>
  );
};

export default Card;
