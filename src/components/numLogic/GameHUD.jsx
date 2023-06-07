import React from 'react'
import TryAgain from '../../assets/img/try-again.gif'

export default function GameState({onRestart, board}) {
    if (board.hasWon()){
        return(
            <div className='tile2048'></div>
        )
    }
    else if (board.hasLost()){
        return (
            <div className='gameOver' onClick={onRestart}>
                <img 
                    src={TryAgain} 
                    alt="Try Again" 
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer'
                    }}
                />
            </div>
        )
    }
    else{
        return(
            null
        )
    }
}
