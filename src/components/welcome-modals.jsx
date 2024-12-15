function ModalContainer({ children }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  )
}

export function InitialModal({ nextModal }) {
  return (
    <ModalContainer>
      <h1>Conecta 4</h1>
      <p style={{ margin: '20px 0' }}>El juego de mesa clásico que reta tus habilidades estratégicas.</p>
      <div className='image-placeholder'>
        <img src='/conecta4.gif' alt='' />
      </div>
      <button onClick={() => nextModal('GameMode')}>Jugar</button>
    </ModalContainer>
  )
}

export function GameModeModal({ nextModal }) {
  return (
    <ModalContainer>
      <h2>Elige un modo de juego</h2>
      <button onClick={() => nextModal('DifficultySelection')}>Jugar con la máquina</button>
      <button onClick={() => nextModal('PlayingAgainstMachine')}>Jugar con un amigo</button>
    </ModalContainer>
  )
}

export function DifficultySelectionModal({ nextModal }) {
  return (
    <ModalContainer>
      <h2>Elige un modo de juego</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '180px', margin: '0 auto', padding: '10px 0' }}>
        <button onClick={() => nextModal('PlayingAgainstMachine')}>Fácil</button>
        <button onClick={() => nextModal('PlayingAgainstMachine')}>Medio</button>
        <button onClick={() => nextModal('PlayingAgainstMachine')}>Difícil</button>
      </div>
    </ModalContainer>
  )
}
