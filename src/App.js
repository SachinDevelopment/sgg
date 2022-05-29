import "./App.css";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
// import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./components/Player";

const App = () => {
  // const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        <Header />
          <Routes className="p-2">
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/player/:id/stats" element={<Player />} exact />
            <Route path="/" element={<Leaderboard />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
