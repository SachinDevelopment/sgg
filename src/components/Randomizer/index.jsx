import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useViewport } from "../../context/ViewportProvider";

let API_URL = process.env.REACT_APP_API_URL;

const Randomizer = ({ socket, available, currentUser }) => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tracked, setTracked] = useState(false);
  const [dodged, setDodged] = useState(false);
  const [winOpen, setWinOpen] = useState(false);
  const [dodgeOpen, setDodgeOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const { width } = useViewport();
  const { user } = useAuth0();
  const breakpoint = 850;

  useEffect(() => {
    if(!user) return;

    axios.get(`${API_URL}/randomizer/state`).then(({ data }) => {
      const { red, blue, selected } = data;
      setRedTeam(red);
      setBlueTeam(blue);
      setSelected(selected);
    });
  }, [setRedTeam, setBlueTeam, setSelected, user]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.on("randomized", (msg) => {
      const { red, blue } = msg;
      setRedTeam(red);
      setBlueTeam(blue);
      setTracked(false);
      setDodged(false);
    });

    socket.on("redUpdated", (msg) => {
      const { red } = msg;
      setRedTeam(red);
    });

    socket.on("blueUpdated", (msg) => {
      const { blue } = msg;
      setBlueTeam(blue);
    });

    socket.on("selectedUpdated", (msg) => {
      const { selected } = msg;
      setSelected(selected);
    });
  }, [socket, setRedTeam, setBlueTeam, setSelected, user]);

  const handleRandomize = () => {
    console.log('here', selected)
    socket.emit("randomize", selected);
  };

  const handleSelected = (idx) => {
    const selCopy = [...selected];
    selCopy.splice(idx, 1);
    setSelected(selCopy);

    socket.emit("selectedUpdate", selCopy);
  };

  const handleAvailable = (a) => {
    const toRemove = selected.findIndex((sel) => sel.id === a.id);
    if (toRemove != -1) {
      const selCopy = [...selected];
      selCopy.splice(toRemove, 1);
      setSelected(selCopy);
      return socket.emit("selectedUpdate", selCopy);
    }

    if (selected.length >= 10) {
      return;
    }

    setSelected([...selected, a]);
    socket.emit("selectedUpdate", [...selected, a]);
  };

  if(!user) {
    return <div className="flex text-center text-3xl pt-6 justify-center">
      <h1 >Login to access matchmaking!</h1>
      </div>
  }

    return width > breakpoint ? (
      <Desktop
        blueTeam={blueTeam}
        setBlueTeam={setBlueTeam}
        redTeam={redTeam}
        setRedTeam={setRedTeam}
        selected={selected}
        tracked={tracked}
        setTracked={setTracked}
        winOpen={winOpen}
        setWinOpen={setWinOpen}
        winner={winner}
        setWinner={setWinner}
        user={user}
        available={available}
        currentUser={currentUser}
        handleRandomize={handleRandomize}
        handleSelected={handleSelected}
        handleAvailable={handleAvailable}
        socket={socket}
        dodged={dodged}
        setDodged={setDodged}
        dodgeOpen={dodgeOpen}
        setDodgeOpen={setDodgeOpen}
      />
    ) : (
      <Mobile
      blueTeam={blueTeam}
      redTeam={redTeam} 
      />
    );
  };


export default Randomizer;
