import { useParams } from 'react-router'
import { useSocket } from '../context/websocket-conexion'
import { useGameState } from './use-game-state'
import { useGameActions } from './use-game-actions'
import { useGameSocket } from './use-game-socket'
import { GAME_STATES } from '../const'

export function useGameMultiplayer() {
  const socket = useSocket()
  const { id: gameId } = useParams()
  const gameState = useGameState()
  const gameActions = useGameActions(socket, gameId, gameState)

  useGameSocket(socket, gameState)

  const {
    board,
    currentPlayer,
    player,
    status,
    winner,
    error
  } = gameState

  return {
    // State
    board,
    currentPlayer,
    player,
    status,
    winner,
    error,

    // Actions
    ...gameActions,

    // Computed properties
    canStart: status === GAME_STATES.READY,
    isMyTurn: currentPlayer?.id === player?.id
  }
}
