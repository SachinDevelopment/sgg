import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import Rules from "./components/Rules";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Randomizer from "./components/Randomizer";
import ChampStats from "./components/ChampStats";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const [available, setAvailable] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

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
                available={available}
                currentUser={currentUser}
              />
            }
          />
           <Route path="/lol/champions" element={<ChampStats />} />
           <Route path="/lol/rules" element={<Rules />} />
          <Route path="/" element={<Leaderboard allPlayers={available} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
