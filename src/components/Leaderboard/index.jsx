import DesktopLeaderboard from "./desktop";
import MobileLeaderboard from "./mobile";
import { useViewport } from "../../context/ViewportProvider";
import LoadingTrophy from "../LoadingTrophy";
import { useEffect, useState } from "react";
import axios from "axios";

let API_URL = process.env.REACT_APP_API_URL;

const Leaderboard = ({ allPlayers, setAvailable }) => {
  const { width } = useViewport();
  const breakpoint = 1000;
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  }, [setShowAnimation]);

  useEffect(() => {
    axios.get(`${API_URL}/players`).then(({ data }) => {
      setAvailable(data);
    });
  }, [setAvailable]);


  if (!allPlayers.length || showAnimation)
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingTrophy />
      </div>
    );

  return (
    <div className="mt-20">
      {width > breakpoint ? (
        <DesktopLeaderboard allPlayers={allPlayers} />
      ) : (
        <MobileLeaderboard allPlayers={allPlayers} />
      )}
    </div>
  );
};

export default Leaderboard;
