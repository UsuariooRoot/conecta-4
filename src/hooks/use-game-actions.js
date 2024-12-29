import { useCallback } from 'react'
import { GAME_STATES } from '../const'

export function useGameActions(socket, gameId, gameState) {
  const { player, currentPlayer, status, setError } = gameState

  // Join game
  const joinGame = useCallback(() => {
    if (socket && gameId) {
      socket.emit('join-game', gameId)
    }
  }, [socket, gameId])

  // Start game
  const startGame = useCallback(() => {
    if (socket && gameId) {
      socket.emit('start-game', gameId)
    }
  }, [socket, gameId])

  // Make move
  const makeMove = useCallback(
    (column) => {
      if (socket && gameId && player && status === GAME_STATES.IN_PROGRESS) {
        if (currentPlayer.id !== player.id) {
          setError('Not your turn')
          return
        }
        socket.emit('make-move', { gameId, column, player })
      }
    },
    [socket, gameId, player, currentPlayer, status]
  )

  // Reset game
  const resetGame = useCallback(() => {
    if (socket && gameId) {
      socket.emit('reset-game', gameId)
    }
  }, [socket, gameId])

  return {
    joinGame,
    startGame,
    makeMove,
    resetGame
  }
}
