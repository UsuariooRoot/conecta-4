import Style from './winner-modal.module.css'

export function WinnerModal({ resetGame, winner, isTie }) {
  return (
    <section className={Style.winner}>
      <div className={Style.winnerContent}>
        {isTie
          ? (<h2>Empate</h2>)
          : (
            <>
              <h2>Ganador:</h2>
              <header className='win'>
                <div>{winner}</div>
              </header>
            </>)}
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>

  )
}
