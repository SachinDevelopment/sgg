import React from "react";
import GameDodgeDialog from "./GameDodgeDialog";
import axios from "axios";
import moment from "moment-timezone";
import { makeStyles } from "@material-ui/core/styles";

let API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
        backgroundColor: "#1f2937",
      },
    },
  }));

export default function GameDodge({
  open,
  setOpen,
  loser,
  blueTeam,
  redTeam,
  setTracked,
  handleRandomize
}) {

    
  const map = "Summoner's Rift";

  const handleGameDodge = (loser) => {
    redTeam.forEach((r) => {
      r.champion = "Champion";
      r.role = "Role";
    });

    blueTeam.forEach((b) => {
      b.champion = "Champion";
      b.role = "Role";
    });

    const redTeamArray = [];
    const blueTeamArray = [];

    redTeam.forEach((element) => {
      redTeamArray.push(
        `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
      );
    });

    blueTeam.forEach((element) => {
      blueTeamArray.push(
        `${element.id}-${element.role}-${element.champion}-${element.name}-${element.id}`
      );
    });

    const losers = [`${loser.name}-${loser.id}`];
    const loserId = loser.id;
    const red = redTeamArray.join(",");
    const blue = blueTeamArray.join(",");
    axios
      .post(`${API_URL}/lol/games/dodge`, {
        map,
        game_size: redTeam.length,
        losers,
        loserId,
        blue,
        red,
        date: moment(Date.now())
          .tz("America/New_York")
          .format("YYYY-MM-DD HH:mm:ss"),
      })
      .then(() => {
        setTracked(true);
      });
  };

  return (
    <GameDodgeDialog
      open={open}
      setOpen={setOpen}
      handleGameDodge={handleGameDodge}
      loser={loser}
    />
  );
}
