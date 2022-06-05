import React, { useState, useEffect } from "react";
import axios from "axios";
import GameWin from "./GameWin";
import { Button } from "react-bootstrap";
import RedBlueTeam from "./RedBlueTeam";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
let API_URL = process.env.REACT_APP_API_URL;

const Randomizer = () => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [winner, setWinner] = React.useState("");
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("init", (msg) => {
      const { red, blue, selected } = msg;
      setRedTeam(JSON.parse(red));
      setBlueTeam(JSON.parse(blue));
      setSelected(JSON.parse(selected));
    });

    socket.on("randomized", (msg) => {
      const { red, blue } = msg;
      setRedTeam(red);
      setBlueTeam(blue);
    });
  }, [socket, setRedTeam, setBlueTeam]);

  
  // useEffect(() => {
  //   if (user?.email !== "sachinsunny2013@gmail.com") {
  //     return navigate("/lol/leaderboard");
  //   }
  // }, [navigate, user]);

const handleRandomize = () => {
  socket.emit('randomize', selected);
}
  // const handlePlayAgain = () => {
  //   setTracked(false);
  //   handleRandomize();
  // };


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
              onClick={() => {}}
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
