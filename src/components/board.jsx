import { N_COLUMNS } from '../const'
import Style from './board.module.css'

export function Board({ handleBoardClick, board, boardRef }) {
  // Estilar board segun numero de columnas
  const columnsStyle = {
    'grid-template-columns': `repeat(${N_COLUMNS}, 1fr)`
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
