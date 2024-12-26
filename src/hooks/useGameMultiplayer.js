import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { useSocket } from '../context/websocket-conexion'
import { GAME_STATES, N_COLUMNS, N_ROWS } from '../const'

export function useGameMultiplayer() {
  const socket = useSocket()
  const { id: gameId } = useParams()
  const [board, setBoard] = useState(Array(N_ROWS).fill(Array(N_COLUMNS).fill(null)))
  const [player, setPlayer] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [winner, setWinner] = useState(null)
  const [status, setStatus] = useState(GAME_STATES.WAITING)
  const [error, setError] = useState(null)

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

  return {
    board,
    currentPlayer,
    player,
    status,
    winner,
    error,
    joinGame,
    startGame,
    makeMove,
    resetGame,
    canStart: status === GAME_STATES.READY,
    isMyTurn: currentPlayer?.id === player?.id
  }
}
