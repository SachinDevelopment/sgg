import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useViewport } from "../../context/ViewportProvider";
import {  Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const { width } = useViewport();
  const breakpoint = 560;

  return (
    <div
      variant="dark"
      className="p-2 bg-gray-900 font-semibold flex justify-between"
    >
      <div className="flex items-center">
        <div className="text-2xl">S.GG</div>
      </div>
      <div className="flex items-center space-x-2">
        <Link className="flex items-center" to="/leaderboard">
          <Assessment />
          {width > breakpoint && <div>Leaderboard</div>}
        </Link>
      </div>
      <div />
      <div className="h-10">
        {isAuthenticated ? (
          <div className="flex space-x-4 items-center">
            <img
              src={user.picture}
              alt={user.name}
              className="rounded h-8 w-8"
            />
            {width > breakpoint && <div>{user.name}</div>}
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default Header;
