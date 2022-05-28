import React from "react";
import Casino from "@material-ui/icons/Casino";
import Assessment from "@material-ui/icons/Assessment";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useViewport } from "../../context/ViewportProvider";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const { width } = useViewport();
  const breakpoint = 560;

  console.log(width);

  console.log("isAuthenticated", isAuthenticated);

  return (
    <div
      variant="dark"
      className="p-2 bg-gray-800 font-semibold flex justify-between"
    >
      <div className="flex items-center">
        <div className="text-2xl">S.GG</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Casino />
          {width > breakpoint && <div>Randomizer</div>}
        </div>
        <div className="flex items-center">
          <Assessment />
          {width > breakpoint && <div>Leaderboard</div>}
        </div>
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
