import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import './App.css';
import axios from 'axios'
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

// import { BrowserRouter, Route, Routes  } from 'react-router-dom';

let API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [msg, setMsg] = useState('');
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect (() => {
    axios.get(`${API_URL}/health`).then(({ data }) => {
      console.log('data', data)
        setMsg(data.msg)
    });
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if(isAuthenticated){
    return (
      <div className="flex justify-center">
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <LogoutButton/>
      </div>
      
  );
  } else {
    return (
      <div className="flex justify-center items-center h-full space-x-2">
        <div>
        {`API Response: ${msg}`}
        </div>
        <LoginButton/>
      </div>
    );
  }
}

export default App;
