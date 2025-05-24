import { useEffect } from 'react'
import { Board } from './board'
import { WinnerModal } from './winner-modal'
import { useGameMultiplayer } from '../hooks/use-game-multiplayer'
import { CardSelectColor } from './card-select-color'

import Style from './game-multiplayer.module.css'
import { FloatingMessage } from './floating-message'

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

  return (
    <div className={Style.gameContainer}>
      <div className={Style.gamePlayer}>
        <h3>Eres las fichas de color:</h3>
        {player
          ? (<div className={Style.piece} style={{ backgroundColor: player?.color[1] }} />)
          : <span>Cargando...</span>}
      </div>
      <span className={Style.gameState}>Estado del juego: {status}</span>

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
        {canStart && (
          <button
            className={Style.startButton}
            onClick={startGame}
          >
            Iniciar juego
          </button>
        )}
        {
          status === 'in-progress' && (
            <div className={Style.currentTurn}>
              <span>
                Turno de:
              </span>
              <div className={Style.piece} style={{ backgroundColor: currentPlayer?.color[1] }} />
            </div>
          )
        }
      </div>
    </div>
  )
}
