import { useNavigate } from 'react-router'
import { ModalContainer } from '../components/welcome-modals'
import Style from './game-multiplayer-page.module.css'
import { useEffect } from 'react'
import { useSocket } from '../context/websocket-conexion'

export function GameMultiplayerPage() {
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return

    socket.on('game-created', (gameId) => {
      const gameUrl = `/multiplayer/${gameId}`
      navigate(gameUrl)
    })

    return () => {
      socket.off('game-created')
      socket.disconnect()
    }
  }, [socket])

  const createAGame = () => {
    if (!socket) return
    socket.emit('create-game')
  }

  return (
    <ModalContainer>
      <h2>Crea o unete a una partida</h2>
      <div className={Style.multiplayerOptions}>
        <form className={Style.joinGameForm}>
          <input type='text' placeholder='ID de la partida....' />
          <button className={Style.button}>Unirse</button>
        </form>
        <button className='btn-primary' onClick={createAGame}>Crear una partida</button>
      </div>
    </ModalContainer>
  )
}
