import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Randomizer from "./components/Randomizer";
import ChampStats from "./components/ChampStats";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [socket, setSocket] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const [available, setAvailable] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [online, setOnline] = useState([]);

  useEffect(() => {

  }, [])
  useEffect(() => {
    axios.get(`${API_URL}/players`).then(({ data }) => {
      setAvailable(data);
    });
  }, [setAvailable]);

  useEffect(() => {
    if (!user) return;
    axios.get(`${API_URL}/user/${user.sub}`).then(({ data }) => {
      setCurrentUser(data);
    });
  }, [user, setCurrentUser]);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;

    if (user) {
      socket.emit("online", user.sub);
    }

    socket.on("playerOnline", (allPlayers) => {
      const availableCopy = Array.from(available);
      available.forEach((a) => {
        if (allPlayers.find((all) => a.id === all)) {
          a.online = true;
        } else {
          a.online = false;
        }
      });
      setOnline(availableCopy);
    });
  }, [socket, user, setOnline, available]);

  useEffect(() => {
    if (isAuthenticated && user) {
      axios.post(`${API_URL}/user`, {
        login_id: user.sub,
        email: user.email,
        name: user.name,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <div>
        <Header currentUser={currentUser}/>
        <Routes className="p-2">
          <Route
            path="/lol/leaderboard"
            element={<Leaderboard allPlayers={available} setAvailable={setAvailable}/>}
          />
          <Route path="/lol/player/:id/stats" element={<Player />} exact />
          <Route
            path="/lol/matchmaking"
            element={
              <Randomizer
                socket={socket}
                available={online}
                currentUser={currentUser}
              />
            }
          />
           <Route path="/lol/champions" element={<ChampStats />} />
          <Route path="/" element={<Leaderboard allPlayers={available} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
