import { N_COLUMNS, N_ROWS, TURNS } from '../../const'

export const INITIAL_STATE_BOARD = () => {
  const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(N_ROWS).fill(Array(N_COLUMNS).fill(null))
}

export const INITIAL_STATE_WINNER = () => window.localStorage.getItem('turn') ?? TURNS.player1

export const saveGameToStorage = ({ board, turn }) => {
  // guardar aqui partida
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
