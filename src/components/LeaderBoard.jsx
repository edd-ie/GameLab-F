import React from 'react'
import './leaderBoard.css'
import falcon from '../assets/falcon-bg.png'
import hawk from '../assets/hawk-bg.png'

export default function FlappyBoard() {

  
  return (
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
  )
}
