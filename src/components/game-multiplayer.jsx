import { useParams } from 'react-router'

export function GameMultiplayer() {
  const { id } = useParams()
  return (
    <>
      <div>ID de la partida: {id}</div>
      {/* <Board handleBoardClick={handleBoardClick} board={board} boardRef={boardRef} />
      <WinnerModal resetGame={resetGame} winner={winner} />
      <h2>{`Turno de: ${turn === TURNS.player2 ? '🔴' : '🟢'}`}</h2> */}
    </>
  )
}
