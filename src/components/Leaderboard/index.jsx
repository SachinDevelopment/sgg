import React, { useState, useEffect } from "react";
import axios from "axios";
import TopPlayer from "./RankOneCard";
import TopThree from "./TopPlayerCard";
import AllPlayers from "./AllPlayersTable";
import { v4 as uuid } from "uuid";

let API_URL = process.env.REACT_APP_API_URL;

const Stats = () => {
  const [topPlayer, setTopPlayer] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const [otherPlayers, setOtherPlayers] = useState([]);

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
      setTopPlayer(sortedData.slice(0, 1));
      setTopThree(sortedData.slice(1, 3));
      setOtherPlayers(sortedData.slice(3, sortedData.length));
    })();
  }, []);

  return (
    <div className="flex p-4 justify-center">
      <div className="flex flex-col justify-center w-200 space-y-4">
        <div className="">
          {topPlayer.map((player) => (
            <TopPlayer player={player} />
          ))}
        </div>
        <div className="flex justify-between space-x-4">
          {topThree.map((player, index) => (
            <TopThree key={uuid()} player={player} ranking={index + 2} />
          ))}
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <AllPlayers allPlayers={otherPlayers} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
