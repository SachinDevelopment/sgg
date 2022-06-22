import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import Casino from "@material-ui/icons/Casino";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useViewport } from "../../context/ViewportProvider";
import { Link } from "react-router-dom";

const Header = ({ currentUser }) => {
  const { user, isAuthenticated } = useAuth0();
  const { width } = useViewport();
  const breakpoint = 560;

  return (
    <div
      variant="dark"
      className="p-2 bg-gray-900 font-semibold flex justify-between"
    >
      <div className="flex items-center pl-2 space-x-6">
        <Link className="flex items-center" to="/lol/leaderboard">
          <EmojiEventsIcon />
          <div className="text-xl">S.GG</div>
        </Link>
        <Link className="flex items-center" to="/lol/matchmaking">
          <Casino />
          <div>Matchmaking</div>
        </Link>
        <Link className="flex items-center" to="/lol/champions">
          <Assessment />
          <div>Champions</div>
        </Link>
      </div>
      <div />
      {width > breakpoint && (
        <div className="h-10">
          {isAuthenticated ? (
            <div className="flex space-x-4 items-center">
              <img
                src={user.picture}
                alt={currentUser?.name || user?.name}
                className="rounded h-8 w-8"
              />
              <div>{user.name}</div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
