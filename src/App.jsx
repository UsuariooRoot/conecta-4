import { Route, Routes } from 'react-router'
import './App.css'
import { WelcomeGame } from './components/welcome-game.jsx'
import { Game } from './components/game.jsx'
import { GameMultiplayer } from './components/game-multiplayer.jsx'

export function App() {
  return (
    <main className='App'>
      <Routes>
        <Route path='/' element={<WelcomeGame />} />
        <Route path='/multiplayer/:id' element={<GameMultiplayer />} />
        <Route path='/machine' element={<Game />} />
      </Routes>
    </main>
  )
}
