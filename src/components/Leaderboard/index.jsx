import DesktopLeaderboard from "./desktop";
import MobileLeaderboard from "./mobile";
import { useViewport } from "../../context/ViewportProvider";

const Leaderboard = ({allPlayers}) => {
  const { width } = useViewport();
  const breakpoint = 1000;
  return (
    <div>
      <div className="text-center text-2xl font-semibold mt-4">Leaderboard</div>
      <div className="text-center text-xs mb-4">
        (Click on a players name to see detailed stats)
      </div>
      {width > breakpoint ? <DesktopLeaderboard allPlayers={allPlayers} /> : <MobileLeaderboard allPlayers={allPlayers}/>}
    </div>
  );
};

export default Leaderboard;
