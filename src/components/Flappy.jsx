import React, { useState, useEffect, useRef } from 'react'
import './Flappy.css'
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export default function FlappyBird() {
  const{user} = useAuth0()
  const [player_id, setPlayer_id] = useState(0)

  const userData = {
    name: user.nickname,
    email: user.email
  }

  useEffect(() => {
        fetch('http://127.0.0.1:9292/user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {setPlayer_id(data.id)})
        .catch(err => console.log(err))
    },[])



    const game_width = 800;
  const game_height = 500;
  const birdSize = 50;
  const gravity = 6
  const jumpHeight = 70;
  const pipeWidth = 50;
  const gap = birdSize*3.5
  const birdHorizontal =  game_width/3 - birdSize/2
  let board = useRef(0)
  
  const[score, setScore] = useState(0)
  const [position, setPosition] = useState(200)
  const [fallSpeed, setFallSpeed] = useState(25)
  const [velocity, setVelocity] = useState(5)
  const[gameStart, setGameStart] = useState(false)
  const[pipeHeight, setPipeHeight] = useState(200)
  const[pipeLeft, setPipeLeft] = useState(game_width - pipeWidth)
  const bottomPipeHeight = game_height - gap-pipeHeight
  const pipeTop = game_height-(bottomPipeHeight+pipeHeight)
  const [highScore, setHighScore] = useState(0)

  function handleScoreReset(){
    fetch(`http://127.0.0.1:9292/reset_flappy/${player_id}`,{
      method:'DELETE'
    })
    setHighScore(0)
  }


  function postScore(data){
    console.log("file: Flappy.jsx:52 -> postScore -> data:", data, player_id);
    fetch(`http://127.0.0.1:9292/flappy_board/${player_id}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })
  }
  

  function fetchHighScore(){
    fetch(`http://127.0.0.1:9292/rank_flappy/${player_id}`)
    .then(res => res.json())
    .then(data => {
      console.log("file: Flappy.jsx:68 -> fetchHighScore -> data:", data);
      setHighScore(data.score)
    })
  }
  
  useEffect(() =>{
    let timeId;
    if(gameStart && position < (game_height - birdSize)){
      timeId = setInterval(() =>{
        setPosition(position => position + gravity)
      }, fallSpeed);
    }
    else{setScore(0); setVelocity(5)}
    return () => clearInterval(timeId)
  });


  useEffect(() =>{
    let obstaclesId;
    if(gameStart && pipeLeft >= -pipeWidth){
      obstaclesId = setInterval(() =>{
        setPipeLeft(pipeLeft => pipeLeft - velocity)
      }, fallSpeed);

      return () => clearInterval(obstaclesId)
    }
    else{
      setPipeLeft(game_width - pipeWidth)
      setPipeHeight(Math.floor(Math.random()*(game_height-gap)))
      setScore(score+1)
    }
  },[gameStart, pipeLeft])

  //Collision Detection
  useEffect(() =>{
    const collideTop = (position >= 0 && position < pipeHeight);
    const collideBottom = position <= game_height && position >= (game_height - bottomPipeHeight);
    let collisionId;

    if (
      pipeLeft >= birdHorizontal && pipeLeft <= (birdHorizontal+pipeWidth) 
      &&
      (collideTop || collideBottom)
    ){
      board = score
      let sendData = {"user_id": player_id, "score": board}
      postScore(sendData)
      setGameStart(false)
      setPosition(200)
      console.log("file: App.jsx:68 -> useEffect -> board score:", board);
      fetchHighScore()
    }
    else if(score%10 == 0 && score !== 0){
      setVelocity(velocity+0.1)
    }
    
},[position, pipeLeft, pipeHeight, bottomPipeHeight])

  function handleJump(event) {
    event.target.style.outline = "none";
    let newPos = position - jumpHeight;

    if(!gameStart){
      setGameStart(true)
      
    }
    else if(newPos < 0){
      setPosition(0)
    }
    else{
      setPosition(newPos)
    }
  }
  
  
  

  return (
    <>
      <Link to="/">
          <h2 id='homeIcon'>Game <span>Lab</span> </h2>
      </Link>
      <div id='game'>
        <div id='gameBox' style={{width: game_width, height: game_height}} onClick={handleJump}>
          
          <div className='pipe' style={{
            position: 'relative',width: pipeWidth, top: 0,
            height: pipeHeight, left: pipeLeft, backgroundColor: 'red'
          }}/>

          <div className='bird' alt="flappy" style={{
            position: 'absolute',
            left: birdHorizontal,
            top: position, width: birdSize, height: birdSize
          }}></div>

          <div className='pipe' style={{
            position: 'relative',width: pipeWidth, top: pipeTop,
            height: bottomPipeHeight, left: pipeLeft, backgroundColor: 'red'
          }}/>

          <div className='score'><h1>{score}</h1></div>
        </div>
      </div>
      <div id='highScore'>
          <h1>High Score:</h1>
          <h3>{highScore}</h3>
          <p>Click to play</p>
      </div>

      <div id='scoreReset' onClick={handleScoreReset}>
        Reset <br /> High Score
      </div>
    </>
  )
}