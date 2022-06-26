import React from "react";
import GameWinDialog from "./GameWinDialog";
import axios from "axios";
import moment from "moment-timezone";

let API_URL = process.env.REACT_APP_API_URL;

export default function GameWin({
  open,
  setOpen,
  winner,
  blueTeam,
  redTeam,
  setTracked,
  setDodged,
  handleRandomize
}) {
  const map = "Summoner's Rift";

  const handleGameWin = (winner) => {
    if (
      redTeam.some((r) => r.champion === "Champion") ||
      blueTeam.some((b) => b.champion === "Champion") ||
      redTeam.some((r) => r.role === "Role") ||
      blueTeam.some((b) => b.role === "Role")
    ) {
      console.error("Cant submit without champion or role entries");
      return;
    }
    const winnersArray = [];
    const losersArray = [];
    const loserIdsArray = [];
    const winnerIdsArray = [];
    const redTeamArray = [];
    const blueTeamArray = [];

    if (winner === "red") {
      redTeam.forEach((element) => {
        winnersArray.push(`${element.name}-${element.id}`);
        winnerIdsArray.push(element.id);
        redTeamArray.push(
          `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
        );
      });

      blueTeam.forEach((element) => {
        losersArray.push(`${element.name}-${element.id}`);
        loserIdsArray.push(element.id);
        blueTeamArray.push(
          `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
        );
      });
    } else {
      blueTeam.forEach((element) => {
        winnersArray.push(`${element.name}-${element.id}`);
        winnerIdsArray.push(element.id);
        blueTeamArray.push(
          `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
        );
      });

      redTeam.forEach((element) => {
        losersArray.push(`${element.name}-${element.id}`);
        loserIdsArray.push(element.id);
        redTeamArray.push(
          `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
        );
      });
    }

    const losers = losersArray.join(",");
    const winners = winnersArray.join(",");
    const loserIds = loserIdsArray.join(",");
    const winnerIds = winnerIdsArray.join(",");
    const red = redTeamArray.join(",");
    const blue = blueTeamArray.join(",");
    axios
      .post(`${API_URL}/lol/games`, {
        map,
        game_size: redTeam.length,
        winners,
        losers,
        winning_side: winner,
        loserIds,
        winnerIds,
        blue,
        red,
        date: moment(Date.now()).tz("America/New_York").format("YYYY-MM-DD HH:mm:ss"),
      })
      .then(() => { 
        setTracked(true);
        setDodged(true);
       });
  };

  return (
    <GameWinDialog
      open={open}
      setOpen={setOpen}
      handleGameWin={handleGameWin}
      winner={winner}
    />
  );
}
