import { AVAILABLE_COLORS, GAME_STATES, INITIAL_STATE_BOARD } from './conts.js'

export function createGame(gameId) {
  return {
    id: gameId,
    players: [],
    status: 'waiting',
    board: INITIAL_STATE_BOARD(),
    currentPlayer: null,
    winner: null
  }
}

export function resetGame(game) {
  game.status = game.players.length === 2 ? GAME_STATES.READY : GAME_STATES.WAITING
  game.board = INITIAL_STATE_BOARD()
  game.currentPlayer = game.players[0]
  game.winner = null
}

export function checkWinner(board, lastMove) {
  if (!lastMove) return null

  const { row, col, player } = lastMove
  const directions = [
    { dx: 1, dy: 0 }, // Horizontal
    { dx: 0, dy: 1 }, // Vertical
    { dx: 1, dy: 1 }, // Diagonal descendente
    { dx: 1, dy: -1 } // Diagonal ascendente
  ]

  for (const { dx, dy } of directions) {
    let count = 1

    // Verificar en ambas direcciones desde el último movimiento
    for (const dir of [-1, 1]) {
      let x = row + dir * dy
      let y = col + dir * dx

      while (
        x >= 0 && x < board.length &&
        y >= 0 && y < board[0].length &&
        board[x][y] === player.color[1]
      ) {
        count++
        x += dir * dy
        y += dir * dx
      }
    }

    if (count >= 4) return player
  }

  return null
}

export function checkTie(board) {
  return board.every((arr) => !arr.includes(null))
}

export function setDefaultColor(players) {
  if (players.length === 0) return AVAILABLE_COLORS[0]
  return AVAILABLE_COLORS.find(([_, hex]) => players[0].color[1] !== hex)
}

export function getColors(players) {
  return AVAILABLE_COLORS.map(color => {
    const isUsed = players.some(player => player.color[1] === color[1])
    return [color[0], color[1], isUsed]
  })
}

export function availableColor(players, colorSelected) {
  return players.length === 1 || players.every((p) => p.color[1] !== colorSelected[1])
}
