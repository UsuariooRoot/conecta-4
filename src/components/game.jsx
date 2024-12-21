import { Board } from './board'
import { WinnerModal } from './winner-modal'
import { useGame } from '../hooks/useGame'
import { TURNS } from '../const'

export function Game() {
  const { board, turn, winner, updateBoard, resetGame } = useGame()

  return (
    <>
      <Board makeMove={updateBoard} board={board} />
      <WinnerModal resetGame={resetGame} winner={winner} />
      <h2>{`Turno de: ${turn === TURNS.player2 ? '🔴' : '🟢'}`}</h2>
    </>
  )
}
