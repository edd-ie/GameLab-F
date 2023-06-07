import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import FlappyBird from './components/Flappy'
import Game2048 from './components/g2048'
import Login from './components/Login'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Logout from './components/Logout'
import Home from './components/Home'
import Profile from './components/Profile'
import { useAuth0 } from '@auth0/auth0-react';



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
      
    </main>
  )
}

export default App
