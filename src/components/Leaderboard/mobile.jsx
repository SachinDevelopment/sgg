import React, { useState, useEffect } from "react";
import axios from "axios";
import { wrToRank } from "../../utils";
import { importAll } from "../../utils";
import {  Link } from "react-router-dom";

const images = importAll(
    require.context("../../../assets/rankIcons", false, /\.svg/)
  );

let API_URL = process.env.REACT_APP_API_URL;

const MobileLeaderboard = () => {
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/players`);
      const sortedData = data.slice();
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
      setAllPlayers(sortedData);
    })();
  }, []);

  return (
    <table className="bg-gray-800 font-semibold w-full text-center">
    <thead className="text-center">
      <tr className="">
        <th className="h-16">Rank</th>
        <th>Player</th>
        <th >
          Tier
        </th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody className="bg-gray-800">
      {allPlayers.map((player, index) => {
        const rank = wrToRank(player.rating, player.wins + player.loses);
        return (
          <tr className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
            <td className="rounded-l">{index + 1}</td>
            <td>
              <Link to={`/player/${player.id}/stats`}>{player.name}</Link>
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
  );
};

export default MobileLeaderboard;
