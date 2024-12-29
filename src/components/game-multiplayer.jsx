import { useEffect } from 'react'
import { Board } from './board'
import { WinnerModal } from './winner-modal'
import { useGameMultiplayer } from '../hooks/use-game-multiplayer'
import Style from './game-multiplayer.module.css'
export function GameMultiplayer() {
  const {
    joinGame,
    startGame,
    makeMove,
    resetGame,
    board,
    canStart,
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
          ? (<div className={Style.piece} style={{ backgroundColor: player?.color.hex }} />)
          : <span>Cargando...</span>}
      </div>
      <span className={Style.gameState}>Estado del juego: {status}</span>

      {error && <div className={Style.errorMessage}>{error}</div>}

      <Board
        makeMove={makeMove}
        board={board}
        disabled={!isMyTurn || status !== 'in-progress'}
      />

      {winner && (
        <WinnerModal
          resetGame={resetGame}
          winner={typeof winner !== 'string' && winner?.color.name}
          isTie={winner === 'Tie'}
        />)}

      {
        status === 'in-progress' && (
          <div className={Style.currentTurn}>
            <span>
              Turno de:
            </span>
            <div className={Style.piece} style={{ backgroundColor: currentPlayer?.color.hex }} />
          </div>
        )
      }

      {canStart && (
        <button
          className={Style.startButton}
          onClick={startGame}
        >
          Iniciar juego
        </button>
      )}
    </div>
  )
}
