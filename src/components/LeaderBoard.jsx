import React from 'react'
import './leaderBoard.css'
import falcon from '../assets/falcon-bg.png'
import hawk from '../assets/hawk-bg.png'
import { Link } from "react-router-dom";

export default function LeaderBoard() {

  
  return (
    <>
      <Link to="/">
          <h2 id='homeIcon'>Game <span>Lab</span> </h2>
      </Link>
      <div className='lCase'>
          <div className='lBoard'>
              <header className='lHeader'>
                <h1 className='lTitle'>Leaderboard</h1>
                <img src={hawk} alt='hawk' className='lPoster' />
                <nav className='lNav'>
                  <div className='active'>Jumpy Bird</div>
                  <div>2048</div>
                </nav>
              </header>
              <main className='lMain'></main>
          </div>
          <div className='uBoard'></div>
      </div>
    </>
  )
}
