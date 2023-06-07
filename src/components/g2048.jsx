import React, { useState, useEffect, useRef } from 'react'
import './num-css/main.scss'
import './num-css/main.scss'
import Tile from './Tile'
import Cell from './Cell'
import { Board } from './helper'
import useEvent from './numLogic/useEvent';
import GameState from './numLogic/GameHUD'
import { Link } from "react-router-dom";


export default function Game2048() {
    const [board, setBoard] = useState(new Board())

    function handleKeyDown(e) {
        console.log(e.keyCode);
        if (board.hasWon()) {
            return;
        }
        if (e.keyCode >= 37 && e.keyCode <= 40) {
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
        </div>
    )
}

