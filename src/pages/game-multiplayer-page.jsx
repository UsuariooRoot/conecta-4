import { Link } from 'react-router'
import { ModalContainer } from '../components/welcome-modals'
import Style from './game-multiplayer-page.module.css'

export function GameMultiplayerPage() {
  return (
    <ModalContainer>
      <h2>Crea o unete a una partida</h2>
      <div className={Style.multiplayerOptions}>
        <form action='' className={Style.joinGameForm}>
          <input type='text' placeholder='ID de la partida....' />
          <button className={Style.button}>Unirse</button>
        </form>
        <Link to='/multiplayer' className='btn-primary'>Crear una partida</Link>
      </div>
    </ModalContainer>
  )
}
