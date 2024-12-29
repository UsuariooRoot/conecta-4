import { useEffect } from 'react'
import { useGameMultiplayer } from '../hooks/useGameMultiplayer'
import { Board } from './board'
import { WinnerModal } from './winner-modal'

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
    <div className='game-container'>
      <div className='game-status'>
        <h2>Eres las fichas de color: {player?.color.hex || 'Connecting...'}</h2>
        <span className='game-state'>Estado del juego: {status}</span>
        {error && <div className='error-message'>{error}</div>}
      </div>

      {canStart && (
        <button
          className='start-button'
          onClick={startGame}
        >
          Iniciar juego
        </button>
      )}

      {status === 'in-progress' && (
        <div className='turn-indicator'>
          {isMyTurn ? 'Es tu turno' : 'Esperando jugada del oponente...'}
        </div>
      )}

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

      <span className='current-turn'>
        {currentPlayer ? `Turno de: ${currentPlayer?.color.hex}` : 'Juego no iniciado'}
      </span>
    </div>
  )
}
