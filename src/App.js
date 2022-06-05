import "./App.css";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
// import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import Randomizer from "./components/Randomizer";

const App = () => {
  // const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        <Header />
          <Routes className="p-2">
            <Route path="/lol/leaderboard" element={<Leaderboard />} />
            <Route path="/lol/player/:id/stats" element={<Player />} exact />
            <Route path="/lol/matchmaking" element={<Randomizer />} />
            <Route path="/" element={<Leaderboard />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
