import React, { useState, useEffect, useRef } from 'react'
import './num-css/main.scss'
import './num-css/main.scss'
import Tile from './Tile'
import Cell from './Cell'
import { Board } from './helper'
import useEvent from './numLogic/useEvent';
import GameState from './numLogic/GameHUD'
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export default function Game2048() {
    const [board, setBoard] = useState(new Board())
    const{user} = useAuth0()
    const [player_id, setPlayer_id] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [userStats, setUserStats] = useState({})
    console.log("file: g2048.jsx:19 -> Game2048 -> userStats:", userStats);

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
            .then(data => {setPlayer_id(data.id);
                console.log("file: g2048.jsx:42 -> useEffect -> data:", data);
                fetch(`http://127.0.0.1:9292/rank_num/${data.id}`)
                .then(res => res.json())
                .then(data => {setUserStats(data)})
                .catch(err => console.log(err))
            
            })
            .catch(err => console.log(err))
        },[])


    function postScore(data){
        console.log("file: g2048.jsx:37 -> postScore -> data:", data);
        fetch(`http://127.0.0.1:9292/num_board/${player_id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
        })
    }


    function fetchHighScore(){
        fetch(`http://127.0.0.1:9292/rank_num/${player_id}`)
        .then(res => res.json())
        .then(data => {
        console.log("file: Flappy.jsx:68 -> fetchHighScore -> data:", data);
        setHighScore(data.score)
        })
    }

    function handleScoreReset(){
        fetch(`http://127.0.0.1:9292/reset_num/${player_id}`,{
        method:'DELETE'
        })
        setUserStats({score:0, moves:0})
    }

    const [moved, setMoved] = useState(0)
    console.log("file: g2048.jsx:56 -> Game2048 -> moved:", moved);

    function postScore(data) {
        fetch(`http://127.0.0.1:9292/num_board/${player_id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
        })
    }    


    function handleKeyDown(e) {
        console.log(e.keyCode);
        if(board.hasLost()){
            //'/num_board/:id'
            let mov = moved
            let val = {score: board.score, user_id: player_id, moves: mov}
            postScore(val)            
            return;
        }
        if (board.hasWon()) {
            let mov = moved
            let val = {score: board.score, user_id: player_id, moves: mov}
            postScore(val) 
            return;
        }
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            setMoved(moved+1)
            let direction = e.keyCode - 37;
            let boardClone = Object.assign(
                Object.create(Object.getPrototypeOf(board)),
                board);
            //let boardClone = structuredClone(board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
        
    }        

    useEvent('keydown', handleKeyDown)

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((cell, cellIndex) => {
                    return (
                        <Cell key={rowIndex*board.size + cellIndex}/>
                    )
                })}
            </div>
        )
    })

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map(
        (tile, tileIndex) =>{return <Tile key={tileIndex} tile={tile}/>}
    )

    function resetGame() {
        setMoved(0)
        setBoard(new Board())
    }    

    return(
        <div>
            <Link to="/">
                <h2 id='homeIcon'>Game <span>Lab</span> </h2>
            </Link>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>Reset</div>
                <div className='score-box'>
                    <div className='score-header'>SCORE:</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className="board">
                {cells}
                {tiles}
                <GameState onRestart={resetGame} board={board}/>
            </div>
            <div id='highScore'>
                <h1>High Score:</h1>
                <h3>Score: {userStats.score} | Moves: {userStats.moves}</h3>
                <p>Use arrow keys to move tiles</p>
            </div>

            <div id='scoreReset' onClick={handleScoreReset}>
                Reset <br /> High Score
            </div>
        </div>
    )
}