import React from 'react'
import './leaderBoard.css'
import falcon from '../assets/falcon-bg.png'
import hawk from '../assets/hawk-bg.png'
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react'

export default function LeaderBoard() {
  const [flappy, setFlappy] = React.useState([])
  const [g2048, set2048] = React.useState([])
  const [render, setRender] = React.useState([...flappy])
  console.log("file: LeaderBoard.jsx:12 -> LeaderBoard -> render:", render);
  
  const url_F = 'http://127.0.0.1:9292/flappy_board'
  const url_2048 = 'http://127.0.0.1:9292/num_board'

  useEffect(() => {
    fetch(url_F)
    .then(resp => resp.json())
    .then(data => {
      setFlappy(data)
      setRender(data)
    })

    fetch(url_2048)
   .then(resp => resp.json())
   .then(data => {set2048(data)})
  },[])

  console.log(flappy, g2048)


  function handleClick(e){
    const game = document.getElementById('gl')
    const jump = document.getElementById('jl')

    let elem = e.target
    console.log(e.target.classList)
    let value = elem.classList.value.split(' ')
    console.log("file: LeaderBoard.jsx:36 -> handleClick -> value:", value);

    if(!value.includes('active') && value[0] === 'gL'){
      elem.attributes.class.value += ' active';
      console.log(e.target.classList)
      jump.classList.remove('active')
      setRender(g2048)
    }

    if(!value.includes('active') && value[0] === 'jL'){
      elem.attributes.class.value += ' active';
      console.log(e.target.classList)
      game.classList.remove('active')
      setRender(flappy)
    }
  }

  let pos = 1;
  const view = render.map((rank, index) => {
    
    return(
      <div key={`ranks${index}`} className="rankLeads">
        <div className="rank-rank" key={`lead_ranks${index}`}>{pos++}</div>
        <div className="rank-name" key={`lead_names${index}`}>{rank.name || rank.user}</div>
        <div className="rank-score" key={`lead_scores${index}`}>{`Score: ${rank.score}`}</div>
        {(rank.hasOwnProperty("time"))&&<div className="rank-time" key={`lead_times${index}`}>{`Time: ${rank.time}`}</div>}
      </div>
    )
  })
  
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
                  <div id='jl' className='jL active' onClick={handleClick}>Jumpy Bird</div>
                  <div id='gl' className='gL' onClick={handleClick}>2048</div>
                </nav>
              </header>
              <div className='lMain'>
                {view}
              </div>
          </div>
          <div className='uBoard'></div>
      </div>
    </>
  )
}
