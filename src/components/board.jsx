import { useRef } from 'react'
import { N_COLUMNS } from '../const'
import Style from './board.module.css'

export function Board({ makeMove, board, disabled = true }) {
  const boardRef = useRef(null)

  const handleBoardClick = (event) => {
    if (disabled) return
    const boardRect = boardRef.current.getBoundingClientRect()
    // Check the clicks for each column
    const clickX = event.clientX - boardRect.left
    const columnWidth = boardRect.width / N_COLUMNS

    const columnIndex = Math.floor(clickX / columnWidth)

    if (columnIndex >= 0 && columnIndex < N_COLUMNS) {
      makeMove(columnIndex)
    }
  }

  // Style board according to number of columns
  const columnsStyle = {
    gridTemplateColumns: `repeat(${N_COLUMNS}, 1fr)`
  }

  return (
    <div className={Style.board} ref={boardRef} onClick={handleBoardClick}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={Style.row} style={columnsStyle}>
          {row.map((cell, i) => (
            <div
              key={i}
              className={Style.column}
              style={{ backgroundColor: cell }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
