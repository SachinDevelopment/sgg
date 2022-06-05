import React, { useState, useEffect } from "react";
import axios from "axios";
import GameWin from "./GameWin";
import { Button } from "react-bootstrap";
import RedBlueTeam from "./RedBlueTeam";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate }  from "react-router-dom";

let API_URL = process.env.REACT_APP_API_URL;

const Randomizer = () => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [winner, setWinner] = React.useState("");
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.email !== "sachinsunny2013@gmail.com") {
      return navigate("/lol/leaderboard")
    }
  },[navigate, user])
  
  useEffect(() => {
    axios.get(`${API_URL}/players`).then(({ data }) => {
      // If we already have selected or available get them from local storage, otherwise use the fetched data
      if (localStorage.getItem("selected")) {
        setSelected(JSON.parse(localStorage.getItem("selected") || []));
      }

      //  Fetch latest for redTeam, blueTeam even if we have it in storage
      if (localStorage.getItem("redTeam") || localStorage.getItem("blueTeam")) {
        const blueLocal = JSON.parse(localStorage.getItem("blueTeam"));
        const redLocal = JSON.parse(localStorage.getItem("redTeam"));

        const blueLatest = blueLocal.map((blue) =>
          Object.assign(
            blue,
            data.find((x) => x.id === blue.id)
          )
        );
        const redLatest = redLocal.map((red) =>
          Object.assign(
            red,
            data.find((x) => x.id === red.id)
          )
        );

        setBlueTeam(blueLatest);
        setRedTeam(redLatest);
      }
    });
  }, []);

  const handleRandomize = async () => {
    const len = selected.length;

    if (len < 4 || len % 2 !== 0 || len > 10) {
      return;
    }

    const { data } = await axios.get("http://localhost:5000/players");
    const playerClone = data.filter((p) => selected.some((s) => s.id === p.id));
    playerClone.forEach((player) => (player.champion = "Champion"));
    playerClone.sort((a, b) => {
      const bGames = b.wins + b.loses;
      const aGames = a.wins + a.loses;
      const val =
        !!(bGames >= 10) - !!(aGames >= 10) ||
        !!(bGames > 0) - !!(aGames > 0) ||
        b.rating - a.rating ||
        b.wins - a.wins;
      return val;
    });
    const rTeam = [];
    const bTeam = [];

    // // first set of players randomly assigned
    // rTeam.push(
    //   ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
    // );
    // bTeam.push(
    //   ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
    // );

    // // second set of players randomly assigned
    // rTeam.push(
    //   ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
    // );
    // bTeam.push(
    //   ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
    // );

    while (playerClone.length > 0) {
      // // Calculate average for both teams seperately
      // console.log(bTeam);
      // const ravg = rTeam.reduce((a, b) => a + b.rating, 0) / rTeam.length;
      // const bavg = bTeam.reduce((a, b) => a + b.rating, 0) / bTeam.length;
      // console.log(ravg, bavg);
      // // Give the weaker team the better player (once for 3's, twice for 4's)
      // if (ravg >= bavg) {
      //   bTeam.push(...playerClone.splice(0, 1));
      //   rTeam.push(...playerClone.splice(0, 1));
      // } else {
      //   rTeam.push(...playerClone.splice(0, 1));
      //   bTeam.push(...playerClone.splice(0, 1));
      // }
      // first set of players randomly assigned
      rTeam.push(
        ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
      );
      bTeam.push(
        ...playerClone.splice(Math.floor(Math.random() * playerClone.length), 1)
      );
    }

    setRedTeam(rTeam);
    setBlueTeam(bTeam);
  };

  const handlePlayAgain = () => {
    setTracked(false);
    handleRandomize();
  };

  useEffect(() => {
    if (redTeam.length && blueTeam.length) {
      localStorage.setItem("redTeam", JSON.stringify(redTeam));
      localStorage.setItem("blueTeam", JSON.stringify(blueTeam));
    }
  }, [redTeam, blueTeam, tracked]);

  return (
    <div className="flex flex-col items-center p-2">
      <GameWin
        open={open}
        setOpen={setOpen}
        winner={winner}
        blueTeam={blueTeam}
        redTeam={redTeam}
        setTracked={setTracked}
      />
      <div className="flex w-full justify-around">
          <RedBlueTeam
            redTeam={redTeam}
            setRedTeam={setRedTeam}
            blueTeam={blueTeam}
            setBlueTeam={setBlueTeam}
            tracked={tracked}
            setOpen={setOpen}
            setWinner={setWinner}
          />
        <div className="flex flex-col justify-center">
          {!tracked && (
            <Button
              variant="dark"
              type="button"
              onClick={handleRandomize}
              disabled={selected.length < 4 || selected.length % 2 !== 0}
              className="bg-blue-600 w-40"
            >
              Randomize
            </Button>
          )}
          {tracked && (
            <Button
              variant="dark"
              type="button"
              onClick={handlePlayAgain}
              className="bg-blue-600 w-40"
            >
              Play again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Randomizer;
