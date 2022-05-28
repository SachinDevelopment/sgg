import { useState, useEffect } from 'react'

import './App.css';
import axios from 'axios'

// import { BrowserRouter, Route, Routes  } from 'react-router-dom';

let API_URL = "http://localhost:5000";
if(process.env.NODE_ENV === 'production'){
  API_URL = process.env.REACT_APP_API_URL;
}

const App = () => {
  const [msg, setMsg] = useState('');

  useEffect (() => {
    axios.get(`${API_URL}/health`).then(({ data }) => {
      console.log('data', data)
        setMsg(data.msg)
    });
  }, [])

  return (
    <div className="wrapper">
      {`Application: ${msg}`}
    </div>
  );
}

export default App;
