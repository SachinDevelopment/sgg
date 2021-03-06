import React from "react";
import PlayerCard from "./PlayerCard";
import { v4 as uuid } from "uuid";

export default function TeamsTable({ team, setTeam, color, socket, showAnimation, setShowAnimation, currentUser }) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {team.map((player, index) => (
        <PlayerCard
          key={uuid()}
          player={player}
          setTeam={setTeam}
          team={team}
          index={index}
          color={color}
          socket={socket}
          showAnimation={showAnimation}
          setShowAnimation={setShowAnimation}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
