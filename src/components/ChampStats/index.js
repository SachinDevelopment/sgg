import React, { useEffect, useState } from "react";
import axios from "axios";
import ChampTable from "./ChampTable";
import LoadingTrophy from "../LoadingTrophy";

let API_URL = process.env.REACT_APP_API_URL;
const Stats = () => {
  const [champs, setChamps] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/champs`);
      data.sort((a, b) => b.count - a.count);
      setChamps(data);
    })();
  }, []);

  if (!champs) return (
  <div className="w-full h-96 flex justify-center items-center">
    <LoadingTrophy />
  </div>);
  
  return (
    <div className="w-full p-2 flex justify-center">
        <ChampTable champs={champs} />
    </div>
  );
};

export default Stats;
