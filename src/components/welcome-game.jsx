import { useState } from 'react'
import { DifficultySelectionModal, GameModeModal, InitialModal } from './welcome-modals'
import { GAME_MODE } from '../const'
import { createGame } from '../service/web-socket'

export function WelcomeGame() {
  const [currentModal, setCurrentModal] = useState('Initial')

  const openModal = (modalId) => {
    if (modalId === GAME_MODE.multiplayer) {
      createGame()
    }
    setCurrentModal(modalId)
  }

  return (
    <div className='app'>
      {currentModal === 'Initial' && (
        <InitialModal nextModal={openModal} />
      )}

      {currentModal === 'GameMode' && (
        <GameModeModal nextModal={openModal} />
      )}

      {currentModal === 'DifficultySelection' && (
        <DifficultySelectionModal nextModal={openModal} />
      )}
    </div>
  )
}
