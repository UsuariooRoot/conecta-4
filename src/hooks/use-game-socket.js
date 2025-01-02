import { useEffect } from 'react'

export function useGameSocket(socket, gameState) {
  const {
    setPlayer,
    setAvailableColors,
    setStatus,
    setBoard,
    setCurrentPlayer,
    setWinner,
    setError
  } = gameState

  useEffect(() => {
    if (!socket) return

    const socketHandlers = {
      'joined-game': ({ player, status, board, currentPlayer, colors }) => {
        setPlayer(player)
        setStatus(status)
        setBoard(board)
        setCurrentPlayer(currentPlayer)
        setAvailableColors(colors)
      },

      'game-updated': ({ status, board, currentPlayer, colors }) => {
        setStatus(status)
        setBoard(board)
        setCurrentPlayer(currentPlayer)
        setAvailableColors(colors)
      },

      'game-started': ({ board, currentPlayer, status }) => {
        setBoard(board)
        setCurrentPlayer(currentPlayer)
        setStatus(status)
      },

      'move-made': ({ board, currentPlayer, winner, status }) => {
        setBoard(board)
        setCurrentPlayer(currentPlayer)
        setWinner(winner)
        setStatus(status)
      },

      'player-disconnected': ({ status, board, currentPlayer }) => {
        setBoard(board)
        setStatus(status)
        setCurrentPlayer(currentPlayer)
        setWinner(null)
      },

      'game-restarted': ({ status, board, currentPlayer, winner }) => {
        setStatus(status)
        setBoard(board)
        setCurrentPlayer(currentPlayer)
        setWinner(winner)
      },

      'game-error': (message) => {
        setError(message)
        setTimeout(() => setError(null), 3000)
      }
    }

    // Register all event handlers
    Object.entries(socketHandlers).forEach(([event, handler]) => {
      socket.on(event, handler)
    })

    // Cleanup function
    return () => {
      Object.keys(socketHandlers).forEach((event) => {
        socket.off(event)
      })
    }
  }, [socket])
}
