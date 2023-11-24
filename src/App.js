import React, { useEffect, useState } from 'react'
import "./App.css"
import player1 from "./play-1.jpg"
import player2 from "./play-2.jpg"
import Confetti from "react-confetti";
function App() {
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [player, setPlayer] = useState(1)
  const [box, setBox] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
  })
  const [winState, setWinState] = useState(null);

  const play = (boxNo) => {

    if (box[boxNo] !== "" || winState !== null) {
      return;
    }

    if (player === 1) {
      setBox({ ...box, [boxNo]: '✖️' })
    }
    else {
      setBox({ ...box, [boxNo]: '⚪' })
    }
  }

  const checkWin = () => {
    const symbol = player === 1 ? '✖️' : '⚪';


    if ((box[1] === symbol && box[2] === symbol && box[3] === symbol) || (box[4] === symbol && box[5] === symbol && box[6] === symbol) ||
      (box[7] === symbol && box[8] === symbol && box[9] === symbol) || (box[1] === symbol && box[5] === symbol && box[9] === symbol) ||
      (box[3] === symbol && box[5] === symbol && box[7] === symbol) || (box[1] === symbol && box[4] === symbol && box[7] === symbol) ||
      (box[2] === symbol && box[5] === symbol && box[8] === symbol) || (box[3] === symbol && box[6] === symbol && box[9] === symbol)
    ) {
      setWinState(player)
      setConfettiVisible(true)
    }
    setPlayer(player === 1 ? 2 : 1)
  }

  useEffect(() => { checkWin(player) }, [box])

  const reset = () => {
    setPlayer(1)
    setBox(
      {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
      }
    )
    setWinState(null)
    setConfettiVisible(false);
  }

  return (
    <div>
      <img className='gameimg' src='https://4.bp.blogspot.com/-UGd-nOoMK5g/WBd6ICqoumI/AAAAAAAAHXI/_6oeNhPtdHUqi6iUStCLvUvDUGV1S82VQCLcB/s1600/tttmarqlrg.gif' />

      <div className='player-container'>
        <p>Player 1  : ✖️</p>
        <p className='play-turn'>Player Turn : {player === 1 ? "⚪" : "✖️"}</p>
        <p>Player 2  : ⚪ </p>
      </div>

      {
        winState ? (<h1 className='win'>Winner is {player === 1 ? "⚪" : "✖️"}</h1>) : null
      }

      <div className='container'>
      <div>
        <img className='player-img' src={player1} />
      </div>

      <div className='board'>
        <div className='row'>
          <div className='box-1' onClick={() => { play(1) }}>{box[1]}</div>
          <div className='box-2' onClick={() => { play(2) }}>{box[2]}</div>
          <div className='box-3' onClick={() => { play(3) }}>{box[3]}</div>
        </div>

        <div className='row'>
          <div className='box-1' onClick={() => { play(4) }}>{box[4]}</div>
          <div className='box-2' onClick={() => { play(5) }}>{box[5]}</div>
          <div className='box-3' onClick={() => { play(6) }}>{box[6]}</div>
        </div>

        <div className='row'>
          <div className='box-7' onClick={() => { play(7) }}>{box[7]}</div>
          <div className='box-7' onClick={() => { play(8) }}>{box[8]}</div>
          <div className='box-8' onClick={() => { play(9) }}>{box[9]}</div>

        </div>
      </div>

      <div>
        <img className='player-img' src={player2} />
      </div>
      </div>
      <button type='button' onClick={reset} className='reset-btn'>Reset Game</button>
      <>
      {winState !== null && confettiVisible && (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        confettiSource={{
          x: window.innerWidth / 7,
          y: 2,
          w: window.innerWidth,
          h: 0,
        }}
        
      />
    )}</>
    </div>
   
  )
}

export default App