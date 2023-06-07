import React from 'react'
import { Link } from "react-router-dom";
import './Home.css';
import icon from '../assets/blossom-bg.png'
import Logout from './Logout';

export default function Home() {

  


  return (
    <>
      <div className='homeBG'>
        <div className='homeNav'>
          <h2 className='homeIcon'>Game <span>Lab</span> </h2>
          <ul>
              <li><Link to="/flappy" className='links'>JumpyBird</Link></li>
              <li><Link to="/2048" className='links'>Game2048</Link></li>
              <li><Link to="/profile" className='links'>profile</Link></li>
              <li><Link to="/leaderboard" className='links'>LeaderBoard</Link></li>
          </ul>
          <Logout/>
        </div>

        <div className='homeContent'>
          <div className='homeText'>
            <h1>Hi Name...</h1>
          </div>
          <div className='homeGames'>
            <Link to="/flappy">
              <div id='gameIcon1'></div>
            </Link>
            <Link to="/2048">
              <div id='gameIcon2'></div>
            </Link>
          </div>
        </div>
        <img className='imgBack' src={icon} alt="" />
      </div>
    </>
  )
}
