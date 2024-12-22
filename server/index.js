import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const N_ROWS = 6
const N_COLUMNS = 7

const GAME_STATES = {
  WAITING: 'waiting', // Only one player has joined
  READY: 'ready', // 2 players, ready to go
  IN_PROGRESS: 'in-progress',
  FINISHED: 'finished'
}

const games = {} // Store games

io.on('connection', (socket) => {
  console.log('Un cliente se conectó: ', socket.id) // remove

  // Create a new game
  socket.on('create-game', () => {
    // Generate ramdon ID
    const gameId = crypto.randomUUID()

    games[gameId] = {
      id: gameId,
      players: [],
      status: GAME_STATES.WAITING,
      board: Array(N_ROWS).fill(Array(N_COLUMNS).fill(null)),
      currentPlayer: null,
      winner: null
    }

    socket.emit('game-created', gameId)
    console.log('partida creada con exito') // remove
    console.log(games[gameId]) // remove
  })

  // Unirse a una partida existente
  socket.on('join-game', (gameId) => {
    const game = games[gameId]

    if (!game) {
      socket.emit('game-error', 'Partida no encontrada')
      return
    }

    if (game.players.length >= 2) {
      socket.emit('game-error', 'Partida llena')
      return
    }

    if (game.status === GAME_STATES.IN_PROGRESS) {
      socket.emit('game-error', 'La partida ya comenzó')
      return
    }

    // Add new player to the game
    const newPlayer = {
      id: socket.id,
      color: game.players.length === 0 ? 'Verde' : 'Rojo'
    }

    game.players.push(newPlayer)
    socket.join(gameId)

    // Update game status and/or current player based on player count
    if (game.players.length === 1) {
      game.status = GAME_STATES.WAITING
      game.currentPlayer = newPlayer.color
    } else if (game.players.length === 2) {
      game.status = GAME_STATES.READY
    }

    // Emit updated game state to all players
    io.to(gameId).emit('game-updated', {
      board: game.board,
      status: game.status,
      currentPlayer: game.currentPlayer
    })

    socket.emit('joined-game', {
      gameId,
      playerColor: newPlayer.color,
      status: game.status,
      board: game.board,
      currentPlayer: game.currentPlayer
    })

    console.log(games) // remove
  })

  socket.on('start-game', (gameId) => {
    const game = games[gameId]

    if (!game) {
      socket.emit('game-error', 'Partida no encontrada')
      return
    }

    if (game.players.length !== 2) {
      socket.emit('game-error', 'Jugadores incompletos')
    }

    game.status = GAME_STATES.IN_PROGRESS
    game.currentPlayer = game.players[0].color // First player starts

    io.to(gameId).emit('game-started', {
      board: game.board,
      currentPlayer: game.currentPlayer,
      status: game.status
    })
  })
})

const PORT = process.env.PORT ?? 3001
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
