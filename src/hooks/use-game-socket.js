import { useEffect } from 'react'

export function useGameSocket(socket, gameState) {
  const {
    setPlayer,
    setStatus,
    setBoard,
    setCurrentPlayer,
    setWinner,
    setError
  } = gameState

  useEffect(() => {
    if (!socket) return

    socket.on('joined-game', ({ player, status, board, currentPlayer }) => {
      console.log('Joined game as:', player) // remove
      setPlayer(player)
      setStatus(status)
      setBoard(board)
      setCurrentPlayer(currentPlayer)
    })

    socket.on('game-updated', ({ status, board, currentPlayer }) => {
      setStatus(status)
      setBoard(board)
      setCurrentPlayer(currentPlayer)
    })

    socket.on('game-started', ({ board, currentPlayer, status }) => {
      console.log('Game started') // remove
      setBoard(board)
      setCurrentPlayer(currentPlayer)
      setStatus(status)
    })

    socket.on('move-made', ({ board, currentPlayer, winner, status }) => {
      setBoard(board)
      setCurrentPlayer(currentPlayer)
      setWinner(winner)
      setStatus(status)
    })

    socket.on('player-disconnected', ({ status, board, currentPlayer }) => {
      setBoard(board)
      setStatus(status)
      setCurrentPlayer(currentPlayer)
      setWinner(null)
    })

    socket.on('game-restarted', ({ status, board, currentPlayer, winner }) => {
      setStatus(status)
      setBoard(board)
      setCurrentPlayer(currentPlayer)
      setWinner(winner)
    })

    socket.on('game-error', (message) => {
      setError(message)
      setTimeout(() => setError(null), 3000)
    })

    return () => {
      socket.off('joined-game')
      socket.off('game-updated')
      socket.off('game-started')
      socket.off('move-made')
      socket.off('player-disconnected')
      socket.off('game-restarted')
      socket.off('game-error')
    }
  }, [socket])
}
