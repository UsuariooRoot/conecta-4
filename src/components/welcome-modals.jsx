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
