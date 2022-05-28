import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { ViewportProvider} from './context/ViewportProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ViewportProvider>
      <Auth0Provider
    domain="dev-gtsk-v34.us.auth0.com"
    clientId="trbSfyPR4LbS8jEjiDdFpzOhIxw5QHZJ"
    redirectUri={window.location.origin}
    audience="https://dev-gtsk-v34.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
    </Auth0Provider>
    </ViewportProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
