import { useState } from 'react'
import { GAME_STATES, N_COLUMNS, N_ROWS } from '../const'

export function useGameState() {
  const [board, setBoard] = useState(Array(N_ROWS).fill().map(() => Array(N_COLUMNS).fill(null)))
  const [player, setPlayer] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState(GAME_STATES.WAITING)
  const [error, setError] = useState(null)

  return {
    board,
    setBoard,
    player,
    setPlayer,
    currentPlayer,
    setCurrentPlayer,
    winner,
    setWinner,
    status,
    setStatus,
    error,
    setError
  }
}
