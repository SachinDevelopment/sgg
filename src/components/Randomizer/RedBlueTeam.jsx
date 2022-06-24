import React from "react";
import { calculateRatingChange } from "../../utils";
import Team from "./Team";
import { Button } from "react-bootstrap";

export default function RedBlueTeam({
  blueTeam,
  redTeam,
  setBlueTeam,
  setRedTeam,
  setOpen,
  setWinner,
  tracked,
  user,
  socket,
  showAnimation,
  setShowAnimation
}) {
  const calculateTeamRating = () => {
    let sum = 0;
    let sum2 = 0;
    redTeam.forEach((player) => (sum += player.rating));
    blueTeam.forEach((player) => (sum2 += player.rating));
    const sumAvg = sum / redTeam.length;
    const sum2Avg = sum2 / blueTeam.length;
    const [
      blueWinRating,
      blueLoseRating,
      redWinRating,
      redLoseRating,
    ] = calculateRatingChange(sum2Avg, sumAvg);
    return [
      Math.round(sumAvg) || 0,
      Math.round(sum2Avg) || 0,
      blueWinRating,
      blueLoseRating,
      redWinRating,
      redLoseRating,
    ];
  };

  const [
    redRating,
    blueRating,
    blueWinRating,
    blueLoseRating,
    redWinRating,
    redLoseRating,
  ] = calculateTeamRating();

  const handleOpenDialog = (winner) => () => {
    setWinner(winner);
    setOpen(true);
  };

  return (
    <div className="flex space-x-4">
      <div>
        <div className="h-10 m-3 justify-center flex">
          {!tracked && (user?.email === "sachinsunny2013@gmail.com" || user?.email === "thaker.parth.311@gmail.com")  && (
            <button
              variant="dark"
              type="button"
              disabled={
                redTeam.some((r) => r.champion === "Champion") ||
                blueTeam.some((b) => b.champion === "Champion") ||
                redTeam.some((r) => r.role === "Role") ||
                blueTeam.some((b) => b.role === "Role")
              }
              onClick={handleOpenDialog("blue")}
              className="bg-darkBlue w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-blue-800"
            >
              Blue wins
            </button>
          )}
        </div>
        <Team team={blueTeam} setTeam={setBlueTeam} color="blue" socket={socket}  showAnimation={showAnimation} setShowAnimation={setShowAnimation}/>
      </div>
      <div>
        <div className="h-10 m-3 justify-center flex">
        {!tracked && (user?.email === "sachinsunny2013@gmail.com" || user?.email === "thaker.parth.311@gmail.com")  && (
            <Button
              variant="dark"
              type="button"
              disabled={
                redTeam.some((r) => r.champion === "Champion") ||
                blueTeam.some((b) => b.champion === "Champion") ||
                redTeam.some((r) => r.role === "Role") ||
                blueTeam.some((b) => b.role === "Role")
              }
              onClick={handleOpenDialog("red")}
              className="bg-darkRed w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-red-800"
            >
              Red wins
            </Button>
          )}
        </div>
        <Team team={redTeam} setTeam={setRedTeam} color="red" socket={socket} showAnimation={showAnimation} setShowAnimation={setShowAnimation}/>
      </div>
    </div>
  );
}
