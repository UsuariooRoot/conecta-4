import { useCallback, useState } from 'react'
import { N_COLUMNS, N_ROWS, TURNS } from '../const'
import { checkEndGame, checkWinner } from '../logic/winner'
import { INITIAL_STATE_BOARD, INITIAL_STATE_WINNER, resetGameStorage, saveGameToStorage } from '../logic/storage/storage'
import confetti from 'canvas-confetti'

export function useGame() {
  const [board, setBoard] = useState(INITIAL_STATE_BOARD())

  const [turn, setTurn] = useState(INITIAL_STATE_WINNER())

  const [winner, setWinner] = useState(null) // null: aun no hay ganador, false: empate

  const updateBoard = useCallback((columnIndex) => {
    if (winner) return // no actualizar si hay un ganador

    const newBoard = board.map(row => [...row]) // hacemos una copia exacta del board
    const newTurn = turn === TURNS.player1 ? TURNS.player2 : TURNS.player1

    // agregar una ficha a la última posicion vacía de una columna del tablero
    for (let index = newBoard.length - 1; index >= 0; index--) {
      if (newBoard[index][columnIndex] === null) {
        newBoard[index][columnIndex] = turn
        // Verificar si hay ganador
        const newWinner = checkWinner(newBoard, { row: index, col: columnIndex, player: turn })
        setBoard(newBoard)
        setTurn(newTurn)
        // guardar estado actual de la partida
        saveGameToStorage({ board: newBoard, turn: newTurn })

        if (newWinner) {
          confetti()
          setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
          setWinner(false)
        }
        break
      }
    }
  }, [board, turn, winner])

  const resetGame = useCallback(() => {
    setBoard(Array(N_ROWS).fill(Array(N_COLUMNS).fill(null)))
    setTurn(TURNS.player1)
    setWinner(null)
    resetGameStorage()
  }, [])

  return { board, turn, winner, updateBoard, resetGame }
}
