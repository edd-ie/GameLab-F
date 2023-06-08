import React,{useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

// import dotenv from 'dotenv';

// dotenv.config();

// const cli = process.env.REACT_APP_AUTH0_CLIENT_ID;
  
const dom="dev-2ykvq2rgzomrfi8w.us.auth0.com"
const cli="GrD95fk6DewRPswy6ebQWkIjuv9f15Qi"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={dom}
      clientId={cli}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)

