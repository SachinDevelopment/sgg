import { useEffect } from "react";
import DesktopLeaderboard from "./desktop";
import MobileLeaderboard from "./mobile";
import { useViewport } from "../../context/ViewportProvider";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
let API_URL = process.env.REACT_APP_API_URL;

const Leaderboard = () => {
  const { isAuthenticated, user } = useAuth0();
  const { width } = useViewport();
  const breakpoint = 1000;

  useEffect(() => {
    if (isAuthenticated) {
      axios.post(`${API_URL}/user`, {
        login_id: user.sub,
        email: user.email,
        name: user.name,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <div>
      <div className="text-center text-2xl font-semibold mt-4">Leaderboard</div>
      <div className="text-center text-xs mb-4">
        (Click on a players name to see detailed stats)
      </div>
      {width > breakpoint ? <DesktopLeaderboard /> : <MobileLeaderboard />}
    </div>
  );
};

export default Leaderboard;
