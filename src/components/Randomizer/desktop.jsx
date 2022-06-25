import React from "react";
import RedBlueTeam from "./RedBlueTeam";
import GameWin from "./GameWin";
import classnames from "classnames";
import GameDodge from "./GameDodge";
import background from "../bg.jpg";
const Randomizer = ({
  blueTeam,
  setBlueTeam,
  redTeam,
  setRedTeam,
  selected,
  tracked,
  setTracked,
  winOpen,
  setWinOpen,
  winner,
  setWinner,
  user,
  socket,
  available,
  currentUser,
  handleRandomize,
  handleSelected,
  handleAvailable,
  dodged,
  setDodged,
  dodgeOpen,
  setDodgeOpen,
  showAnimation,
  setShowAnimation,
}) => {
  return (
    <div className="flex flex-col items-center py-4 bg-cover min-h-screen min-w-full mt-16" style={{backgroundImage:`url(${background}`}}>
      <GameWin
        open={winOpen}
        setOpen={setWinOpen}
        winner={winner}
        blueTeam={blueTeam}
        redTeam={redTeam}
        setTracked={setTracked}
        setDodged={setDodged}
        handleRandomize={handleRandomize}
      />
      <GameDodge
        open={dodgeOpen}
        setOpen={setDodgeOpen}
        loser={currentUser}
        blueTeam={blueTeam}
        redTeam={redTeam}
        setTracked={setDodged}
        handleRandomize={handleRandomize}
      />
      {(user?.email === "sachinsunny2013@gmail.com" || user?.email === "thaker.parth.311@gmail.com") && (
        <div className="flex flex-col items-center mb-4">
          <button
            variant="dark"
            type="button"
            onClick={handleRandomize}
            disabled={selected.length < 4 || selected.length % 2 !== 0}
            className="bg-blue-600 w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-blue-500"
          >
            Randomize
          </button>
        </div>
      )}
      <div>
        {(user?.email === "sachinsunny2013@gmail.com" || user?.email === "thaker.parth.311@gmail.com") && (
          <div className="flex justify-around max-h-96 h-96 overflow-y-hidden w-full ">
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
        <RedBlueTeam
          redTeam={redTeam}
          setRedTeam={setRedTeam}
          blueTeam={blueTeam}
          setBlueTeam={setBlueTeam}
          tracked={tracked}
          setOpen={setWinOpen}
          setWinner={setWinner}
          user={user}
          socket={socket}
          showAnimation={showAnimation}
          setShowAnimation={setShowAnimation}
        />
      </div>
      <div className="text-center h-12 mt-6">
        {(redTeam.find((s) => s.id === currentUser.id) ||
          blueTeam.find((s) => s.id === currentUser.id)) &&
          !dodged && (
            <button
              className="bg-blue-600 w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-blue-500"
              onClick={() => setDodgeOpen(true)}
            >
              Dodge
            </button>
          )}
      </div>
      <div className="flex flex-col w-full items-center space-y-6"></div>
    </div>
  );
};

export default Randomizer;
