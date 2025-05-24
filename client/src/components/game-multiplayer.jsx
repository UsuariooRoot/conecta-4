import { useEffect } from 'react'
import { Board } from './board'
import { WinnerModal } from './winner-modal'
import { useGameMultiplayer } from '../hooks/use-game-multiplayer'
import { CardSelectColor } from './card-select-color'
import { FloatingMessage } from './floating-message'
import { Link } from 'react-router'

import Style from './game-multiplayer.module.css'

export function GameMultiplayer() {
  const {
    joinGame,
    startGame,
    changeColor,
    makeMove,
    resetGame,
    board,
    canStart,
    availableColors,
    currentPlayer,
    player,
    isMyTurn,
    winner,
    status,
    error
  } = useGameMultiplayer()

  useEffect(() => {
    joinGame()
  }, [joinGame])

  const leaveGame = () => {

  }

  return (
    <div className={Style.gameContainer}>
      <div className={Style.gamePlayer}>
        <h3>Eres las fichas de color:</h3>
        {player
          ? (<div className={Style.piece} style={{ backgroundColor: player?.color[1] }} />)
          : <span>Cargando...</span>}
      </div>
      {
        status === 'in-progress' ? (
          <div className={Style.currentTurn}>
            <span>
              Turno de:
            </span>
            <div className={Style.piece} style={{ backgroundColor: currentPlayer?.color[1] }} />
          </div>
        ) : <span className={Style.gameState}>Estado del juego: {status}</span>
      }

      {error && <FloatingMessage message={error} type='error' />}

      <Board
        makeMove={makeMove}
        board={board}
        disabled={!isMyTurn || status !== 'in-progress'}
      />

      {winner && (
        <WinnerModal
          resetGame={resetGame}
          winner={typeof winner !== 'string' && winner?.color[0]}
          isTie={winner === 'Tie'}
        />)}

      <div className={Style.actionsGame}>
        {availableColors && status !== 'in-progress' && (
          <CardSelectColor colors={availableColors} currentColor={player?.color} chooseColor={changeColor} />
        )}
        {
          canStart && (
            <button
              className={Style.startButton}
              onClick={startGame}
            >
              Iniciar juego
            </button>
          )
        }
      </div>
      <Link
        to="/"
        className={Style.startButton}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '14px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" /></svg>
        Abandonar partida
      </Link>
    </div>
  )
}
