import { useState, useEffect } from 'react'

import './App.css';
import axios from 'axios'
import Header from './components/Header'
import Leaderboard from "./components/Leaderboard";
import { useAuth0 } from "@auth0/auth0-react";
// import { BrowserRouter, Route, Routes  } from 'react-router-dom';

let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const { isAuthenticated } = useAuth0();
 
  return (
      <div>
      <Header/>
      <div className="p-2">
      {isAuthenticated ? <Leaderboard/> : "Login to see the leaderboard"}
      </div>
      </div>
    );
  }

export default App;
