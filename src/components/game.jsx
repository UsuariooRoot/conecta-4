import { useRef } from 'react'
import { Board } from './board'
import { WinnerModal } from './winner-modal'
import { useGame } from '../hooks/useGame'
import { N_COLUMNS, TURNS } from '../const'

export function Game() {
  const { board, turn, winner, updateBoard, resetGame } = useGame()
  const boardRef = useRef(null)

  function handleBoardClick(event) {
    const boardRect = boardRef.current.getBoundingClientRect()
    // Checkeamos los click por cada columna
    const clickX = event.clientX - boardRect.left
    const columnWidth = boardRect.width / N_COLUMNS

    const columnIndex = Math.floor(clickX / columnWidth)

    if (columnIndex >= 0 && columnIndex < N_COLUMNS) {
      updateBoard(columnIndex)
    }
  }

  return (
    <>
      <Board handleBoardClick={handleBoardClick} board={board} boardRef={boardRef} />
      <WinnerModal resetGame={resetGame} winner={winner} />
      <h2>{`Turno de: ${turn === TURNS.player2 ? '🔴' : '🟢'}`}</h2>
    </>
  )
}
