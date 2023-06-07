import React,{useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'


fetch('http://127.0.0.1:9292/log')
.then(res => res.json())
.then(data => {console.log('Log data:', data[0].description,
      data[1].description
      )


    const dom=data[0].description
    const cli=data[1].description

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

  }
)

