import React, { useState, useEffect } from "react";
import GameWin from "./GameWin";
import { Button } from "react-bootstrap";
import RedBlueTeam from "./RedBlueTeam";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import classnames from "classnames";

let API_URL = process.env.REACT_APP_API_URL;

const Randomizer = ({ socket, available }) => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tracked, setTracked] = useState(false);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = React.useState("");
  const { user } = useAuth0();

  useEffect(() => {
    console.log('here')
   axios.get(`${API_URL}/randomizer/state`).then(({data}) => {
    const { red, blue, selected} = data;
    console.log('data', data);
    setRedTeam(red);
    setBlueTeam(blue);
    setSelected(selected);
   })
  }, [setRedTeam, setBlueTeam, setSelected]);
  
  useEffect(() => {
    if (!socket) return;

    socket.on("randomized", (msg) => {
      const { red, blue } = msg;
      setRedTeam(red);
      setBlueTeam(blue);
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
  }, [socket, setRedTeam, setBlueTeam, setSelected]);

  const handleRandomize = () => {
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
      {user?.email === "sachinsunny2013@gmail.com" && (
        <div className="flex flex-col items-center mb-4">
          <Button
            variant="dark"
            type="button"
            onClick={handleRandomize}
            disabled={selected.length < 4 || selected.length % 2 !== 0}
            className="bg-blue-600 w-40"
          >
            Randomize
          </Button>
        </div>
      )}
      <div>
        {user?.email === "sachinsunny2013@gmail.com" && (
          <div className="flex justify-around max-h-96 h-96 overflow-y-hidden ">
            <div className="grid grid-cols-4 gap-2 w-2/5 h-min ">
              {available.map((a, idx) => (
                <div
                  key={idx}
                  className={classnames(
                    "h-12 p-2 mb-1 border-2 rounded text-center bg-gray-900 truncate cursor-pointer border-black",
                    {
                      "text-green-500": selected.find((sel) => sel.id === a.id),
                    }
                  )}
                  onClick={() => handleAvailable(a)}
                >
                  {a.online && <div className="w-2 h-2 bg-green-500 rounded" />}
                  <div>{a.name}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-1 w-2/5 h-min">
              {selected.map((s, idx) => (
                <div
                  key={idx}
                  className="h-16 w-auto p-2 mb-1 border-2 border-black rounded text-center bg-gray-800 justify-start cursor-pointer"
                  onClick={() => handleSelected(idx)}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col w-full items-center space-y-6">
          <RedBlueTeam
            redTeam={redTeam}
            setRedTeam={setRedTeam}
            blueTeam={blueTeam}
            setBlueTeam={setBlueTeam}
            tracked={tracked}
            setOpen={setOpen}
            setWinner={setWinner}
            user={user}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default Randomizer;
