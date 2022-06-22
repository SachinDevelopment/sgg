import React from "react";
import {  calculateWinrate } from "../../utils";
import WinrateBar from '../Leaderboard/WinrateBar'

export default function ChampsTable({ champs }) {
  return (
    <table className="bg-gray-800 w-full font-semibold text-center">
      <thead>
        <tr>
          <th className="h-16">Rank</th>
          <th>Champion</th>
          <th>Winrate</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 w-full">
        {champs.map((champ, index) => {
          return (
            <tr className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
              <td className="rounded-l h-12">{index + 1}</td>
              <td>{champ.name}</td>
              <td className="rounded-r">
                <div className="flex justify-center">
                  <WinrateBar
                    winrate={calculateWinrate(champ.wins, champ.loses)}
                    count={champ.count}
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
