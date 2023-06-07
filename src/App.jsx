import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import FlappyBird from './components/Flappy.jsx'
import Game2048 from './components/g2048.jsx'
import Login from './components/Login'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Logout from './components/Logout.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import { useAuth0 } from '@auth0/auth0-react';
import LeaderBoard from './components/LeaderBoard.jsx';



function App() {
  const{isLoading, error} = useAuth0();
  const{isAuthenticated} = useAuth0()
  
  const router = createBrowserRouter([
      
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/flappy",
        element: <FlappyBird/>,
      },
      {
        path: "/2048",
        element: <Game2048/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard/>,
      }
    ]
  );

  return(
    <main>
      
      {error && <p>Error: {error.message}</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <Login/>
          <Logout/>
        </>
      )}
      {isAuthenticated && <RouterProvider router={router} />}
    </main>
  )
}

export default App
