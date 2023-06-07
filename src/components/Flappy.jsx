import React, { useState, useEffect, useRef } from 'react'
import './Flappy.css'


export default function FlappyBird() {
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
      setGameStart(false)
      setPosition(200)
      console.log("file: App.jsx:68 -> useEffect -> board:", board);
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
    </>
  )
}