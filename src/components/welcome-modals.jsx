import { Link } from 'react-router'

export function ModalContainer({ children }) {
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
      <button className='btn-primary' onClick={() => nextModal('GameMode')}>Jugar</button>
    </ModalContainer>
  )
}

export function GameModeModal({ nextModal }) {
  return (
    <ModalContainer>
      <h2>Elige un modo de juego</h2>
      <button className='btn-primary' onClick={() => nextModal('DifficultySelection')}>Jugar con la máquina</button>
      <Link to='/multiplayer' className='btn-primary'>Multijugador</Link>
    </ModalContainer>
  )
}

export function DifficultySelectionModal() {
  return (
    <ModalContainer>
      <h2>Elige un modo de juego</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '180px', margin: '0 auto', padding: '10px 0' }}>
        <Link to='/machine?difficulty=easy' className='btn-primary'>Fácil</Link>
        <Link to='/machine?difficulty=medium' className='btn-primary'>Medio</Link>
        <Link to='/machine?difficulty=hard' className='btn-primary'>Difícil</Link>
      </div>
    </ModalContainer>
  )
}
