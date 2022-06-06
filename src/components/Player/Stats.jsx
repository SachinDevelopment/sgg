import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import WinrateBar from "../Leaderboard/WinrateBar";

let API_URL = process.env.REACT_APP_API_URL;
export default function Stats({ playerId }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/stats/${playerId}`).then(({ data }) => {
      setTeam(
        data.sort(
          (a, b) =>
            b.teamWins + b.teamLoses - a.teamWins - a.teamLoses ||
            b.teamWins - a.teamWins
        )
      );
    });
  }, [playerId]);

  return (
    <div className="bg-gray-800 h-auto w-auto p-4 rounded text-center">
      <table className="bg-gray-800 w-full">
        <thead>
          <tr className="h-16">
            <th>Player</th>
            <th>With</th>
            <th>Against</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {team.map((player, index) => {
            return (
              <tr
                className={
                  index % 2 === 0 ? "bg-gray-900 h-16" : "bg-gray-800 h-16"
                }
              >
                <td className="rounded-l">
                  <Link to={`/lol/player/${player.id}/stats`}>{player.name}</Link>
                </td>
                <td>
                  <WinrateBar
                    winrate={player.teamWinrate}
                    count={player.teamCount}
                  />
                </td>
                <td className="rounded-r">
                  <WinrateBar
                    winrate={player.enemyWinrate}
                    count={player.enemyCount}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
