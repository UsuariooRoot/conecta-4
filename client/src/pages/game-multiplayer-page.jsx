import { Link, useLocation, useNavigate } from 'react-router'
import { ModalContainer } from '../components/modal-container'
import Style from './game-multiplayer-page.module.css'
import { useEffect } from 'react'
import { useSocket } from '../context/websocket-conexion'
import { FloatingMessage } from '../components/floating-message'

export function GameMultiplayerPage() {
  const socket = useSocket()
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (!socket) return

    socket.on('game-created', (gameId) => {
      const gameUrl = `/multiplayer/${gameId}`
      navigate(gameUrl)
    })

    return () => {
      socket.off('game-created')
    }
  }, [socket])

  const createAGame = () => {
    if (!socket) return
    socket.emit('create-game')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { gameId } = Object.fromEntries(new FormData(e.target))
    const gameUrl = `/multiplayer/${gameId}`
    navigate(gameUrl)
  }

  return (
    <ModalContainer>
      {state?.message && <FloatingMessage message={state.message} type='error' />}
      <h2>Crea o unete a una partida</h2>
      <div style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        <form className={Style.joinGameForm}>
          <input type='text' name='gameId' placeholder='ID de la partida...' />
          <button type='submit' className={Style.button}>Unirse</button>
        </form>
        <button className='btn-primary' onClick={createAGame}>Crear una partida</button>
        <Link to='/' className='btn-primary'>Regresar</Link>
      </div>
    </ModalContainer>
  )
}
