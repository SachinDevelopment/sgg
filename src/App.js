import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Randomizer from "./components/Randomizer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
 const [socket, setSocket] = useState(null);
 const [tracked, setTracked] = useState(false)
 const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  
  useEffect(() => {
    console.log(tracked)
    if (isAuthenticated && user && !tracked) {
      axios.post(`${API_URL}/user`, {
        login_id: user.sub,
        email: user.email,
        name: user.name,
      }).then(() => setTracked(true) )
    }
  }, [isAuthenticated, user, tracked]);

  return (
    <Router>
      <div>
        <Header />
          <Routes className="p-2">
            <Route path="/lol/leaderboard" element={<Leaderboard />} />
            <Route path="/lol/player/:id/stats" element={<Player />} exact />
            <Route path="/lol/matchmaking" element={<Randomizer socket={socket}/>} />
            <Route path="/" element={<Leaderboard />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
