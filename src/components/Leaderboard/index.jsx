import DesktopLeaderboard from "./desktop";
import MobileLeaderboard from "./mobile";
import { useViewport } from "../../context/ViewportProvider";

const Leaderboard = () => {
  const { width } = useViewport();
  const breakpoint = 560;

  return (
   width > breakpoint ? <DesktopLeaderboard/>: <MobileLeaderboard/>
  );
};

export default Leaderboard;
