import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import Casino from "@material-ui/icons/Casino";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useViewport } from "../../context/ViewportProvider";
import { Link } from "react-router-dom";
import { HelpOutline } from "@material-ui/icons";

const Header = ({ currentUser }) => {
  const { user, isAuthenticated } = useAuth0();
  const { width } = useViewport();
  const breakpoint = 700;

  return (
    <div
      variant="dark"
      className="px-2 py-4 bg-gray-900 font-semibold flex justify-between"
    >
      <div className="flex items-center pl-2 space-x-6">
        <Link className="flex items-center" to="/lol/leaderboard">
          <EmojiEventsIcon />
          <div className="text-xl px-1">S.GG</div>
        </Link>
        {width > breakpoint && (<Link className="flex items-center" to="/lol/matchmaking">
          <Casino />
          <div className="px-1">Matchmaking</div>
        </Link> )}
        <Link className="flex items-center" to="/lol/champions">
          <Assessment />
          <div  className="px-1">Champions</div>
        </Link>
        <Link className="flex items-center" to="/lol/rules">
          <HelpOutline />
          <div  className="px-1">Info</div>
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
