import { Outlet, Route, Routes } from 'react-router'
import './App.css'
import { WelcomeGame } from './components/welcome-game.jsx'
import { GameMultiplayerPage } from './pages/game-multiplayer-page.jsx'
import { GameMultiplayer } from './components/game-multiplayer.jsx'
import { SocketProvider } from './context/websocket-conexion.jsx'
import { GameMachinePage } from './pages/game-machine-page.jsx'

export function App() {
  return (
    <main className='App'>
      <Routes>
        <Route path='/' element={<WelcomeGame />} />
        <Route element={<SocketProvider><Outlet /></SocketProvider>}>
          <Route path='/multiplayer' element={<GameMultiplayerPage />} />
          <Route path='/multiplayer/:id' element={<GameMultiplayer />} />
        </Route>
        <Route path='/machine' element={<GameMachinePage />} />
      </Routes>
    </main>
  )
}
