import { useState } from 'react'
import { DifficultySelectionModal, GameModeModal, InitialModal } from './welcome-modals'

export function WelcomeGame() {
  const [currentModal, setCurrentModal] = useState('Initial')

  const openModal = (modalId) => {
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
