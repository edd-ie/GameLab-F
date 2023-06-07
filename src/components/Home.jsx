import React from 'react'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flappy">Flappy</Link></li>
        <li><Link to="/2048">2048</Link></li>
        <li><Link to="/profile">Profile</Link></li>
    </ul>
  )
}
