import React from "react";
import { wrToRank } from "../../utils";
import { importAll } from "../../utils";
import WinrateBar from "./WinrateBar";
import {  Link } from "react-router-dom";

const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

export default function AllPlayersTable({ allPlayers }) {
  return (
    <table className="bg-gray-800 w-full font-semibold">
      <thead className="text-center">
        <tr className="">
          <th className="h-16">Rank</th>
          <th>Player</th>
          <th>
            Tier
          </th>
          <th>Rating</th>
          <th>Winrate</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 w-full text-center">
        {allPlayers.map((player, index) => {
          const rank = wrToRank(player.rating, player.wins + player.loses);
          return (
            <tr className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
              <td className="rounded-l">{index + 4}</td>
              <td>
                <Link to={`/player/${player.id}/stats`}>{player.name}</Link>
              </td>
              <td className="flex items-center justify-center h-16">
                <div className="flex items-center space-x-4 w-36">
                  <div className="w-10">
                    <img src={images[`${rank}.svg`]} alt=""></img>
                  </div>
                  <div>{rank}</div>
                </div>
              </td>
              <td>{player.rating} MMR</td>
              <td className="rounded-r">
                <div className="flex justify-center">
                  <WinrateBar
                    winrate={player.winrate}
                    count={player.wins + player.loses}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
