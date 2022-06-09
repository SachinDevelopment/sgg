import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Randomizer from "./components/Randomizer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [socket, setSocket] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${API_URL}/players`);
      setAvailable(data);
    })();
  }, [setAvailable]);

  useEffect(() => {
    console.log('new socket?')
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
      setAvailable(availableCopy);
    });
  }, [socket, user]);

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
        <Header />
        <Routes className="p-2">
          <Route path="/lol/leaderboard" element={<Leaderboard allPlayers={available}/>} />
          <Route path="/lol/player/:id/stats" element={<Player />} exact />
          <Route
            path="/lol/matchmaking"
            element={<Randomizer socket={socket} available={available} />}
          />
          <Route path="/" element={<Leaderboard allPlayers={available}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
