import { Link } from 'react-router'
import { ModalContainer } from './welcome-modals'

export function WelcomeGame() {
  return (
    <ModalContainer>
      <h1>Conecta 4</h1>
      <p style={{ margin: '20px 0' }}>El juego de mesa clásico que reta tus habilidades estratégicas.</p>
      <div className='image-placeholder'>
        <img src='/conecta4.gif' alt='' />
      </div>
      <div className='game-mode-container'>
        <h2>Elige un modo de juego</h2>
        <Link to='/machine' className='btn-primary'>Jugar con la máquina</Link>
        <Link to='/multiplayer' className='btn-primary'>Multijugador</Link>
      </div>
    </ModalContainer>
  )
}
