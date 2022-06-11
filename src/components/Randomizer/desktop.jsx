import React from "react";
import { Button } from "react-bootstrap";
import RedBlueTeam from "./RedBlueTeam";
import GameWin from "./GameWin";
import classnames from "classnames";

const Randomizer = (
    { 
    blueTeam,
    setBlueTeam,
    redTeam,
    setRedTeam,
    selected,
    tracked, 
    setTracked,
    open,
    setOpen,
    winner,
    setWinner,
    user, 
    socket,
    available, 
    currentUser, 
    handleRandomize,
    handleSelected, 
    handleAvailable
} ) => {
console.log('hello')
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
      {redTeam.find((s) => s.id === currentUser.id) ||
      blueTeam.find((s) => s.id === currentUser.id)
        ? "Dodge"
        : ""}
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
