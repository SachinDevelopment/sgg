import React, { useState, useEffect } from "react";
import axios from "axios";
import { wrToRank } from "../../utils";
import { importAll } from "../../utils";
import { Link } from "react-router-dom";
import TopPlayer from "./mobile_RankOneCard";
import TopThree from "./mobile_TopPlayerCard";
import { v4 as uuid } from "uuid";
const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

let API_URL = process.env.REACT_APP_API_URL;

const MobileLeaderboard = ({ allPlayers }) => {
  const [topPlayer, setTopPlayer] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    if (!allPlayers) return;
    const sortedData = allPlayers.slice();
    sortedData.sort((a, b) => {
      const bGames = b.wins + b.loses;
      const aGames = a.wins + a.loses;
      const val =
        !!(bGames >= 10) - !!(aGames >= 10) ||
        !!(bGames > 0) - !!(aGames > 0) ||
        b.rating - a.rating ||
        b.wins - a.wins;
      return val;
    });
    setTopPlayer(sortedData.slice(0, 1));
    setTopThree(sortedData.slice(1, 3));
    setOtherPlayers(sortedData.slice(3, sortedData.length));
  }, [allPlayers]);

  return (
    <div className="px-4">
        {topPlayer.map((player) => (
          <TopPlayer player={player} />
        ))}
      <div className="flex justify-around space-x-1 my-2">
        {topThree.map((player, index) => (
          <TopThree key={uuid()} player={player} ranking={index + 2} />
        ))}
      </div>
      <table className="bg-gray-800 font-semibold w-full text-center rounded-lg">
        <thead className="text-center">
          <tr className="">
            <th className="h-16">Rank</th>
            <th>Player</th>
            <th>Tier</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {otherPlayers.map((player, index) => {
            const rank = wrToRank(player.rating, player.wins + player.loses);
            return (
              <tr className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                <td className="rounded-l">{index + 4}</td>
                <td>
                  <Link to={`/lol/player/${player.id}/stats`}>
                    {player.name}
                  </Link>
                </td>
                <td className="flex items-center justify-center h-16">
                  <div className="flex items-center space-x-4">
                    <div className="w-10">
                      <img src={images[`${rank}.svg`]} alt=""></img>
                    </div>
                  </div>
                </td>
                <td>{player.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MobileLeaderboard;
