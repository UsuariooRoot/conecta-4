import Style from './winner-modal.module.css'

export function WinnerModal({ resetGame, winner }) {
  return (
    <>
      {winner !== null && (
        <section className={Style.winner}>
          <div className={Style.winnerContent}>
            <h2>{!winner ? 'Empate' : 'Ganó: '}</h2>
            <header className='win'>
              {winner && <div>{winner}</div>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </>
  )
}
