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
        board[x][y] === player
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

// Empate EndGame
export function checkEndGame(newBoard) {
  // revisamos que sean diferentes de null
  const listElements = newBoard.map((square) => (square.every((squ) => squ !== null)))
  return listElements.every((value) => value !== false)
}
