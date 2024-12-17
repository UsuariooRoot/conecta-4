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

const games = {} // Almacenar partidas

io.on('connection', (socket) => {
  console.log('Un cliente se conectó: ', socket.id)

  // Crear una nueva partida
  socket.on('create-game', () => {
    // Genera un ID único para la partida
    const gameId = crypto.randomUUID()
    games[gameId] = {
      id: gameId,
      players: [],
      status: 'waiting',
      board: null,
      currentPlayer: null,
      winner: null // to be fixed
    }

    socket.emit('game-created', gameId)
    console.log('partida creada con exito')
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

    if (game.status === 'in-progress') {
      socket.emit('game-error', 'La partida ya comenzó')
      return
    }

    // Agregar jugador a la partida
    game.players.push({
      id: socket.id,
      color: game.players.length === 0 ? 'red' : 'yellow'
    })

    socket.join(gameId)
    socket.emit('joined-game', {
      gameId,
      playerColor: game.players[game.players.length - 1].color
    })

    // Si hay 2 jugadores, iniciar el juego
    if (game.players.length === 2) {
      game.status = 'in-progress'
      game.board = Array(6).fill().map(() => Array(7).fill(null))
      game.currentPlayer = 'red'

      io.to(gameId).emit('game-started', {
        board: game.board,
        currentPlayer: game.currentPlayer
      })
    }
  })

  // Hacer un movimiento
  socket.on('make-move', ({ gameId, column, playerColor }) => {
    const game = games[gameId]

    if (!game || game.status !== 'in-progress') {
      socket.emit('game-error', 'Partida no válida')
      return
    }

    if (game.currentPlayer !== playerColor) {
      socket.emit('game-error', 'No es tu turno')
      return
    }

    // Lógica para hacer el movimiento (simplificada)
    const row = game.board.findLastIndex(row => row[column] === null)
    if (row !== -1) {
      game.board[row][column] = playerColor

      // Cambiar turno
      game.currentPlayer = playerColor === 'red' ? 'yellow' : 'red'

      // Emitir movimiento a todos los jugadores
      io.to(gameId).emit('move-made', {
        board: game.board,
        currentPlayer: game.currentPlayer
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('se desconecto un cliente: ', socket.id)

    for (const gameId in games) {
      const game = games[gameId]
      const remainingPlayers = game.players.filter(player => player.id !== socket.id)

      if (remainingPlayers.length === 0) {
        delete games[gameId]
      } else {
        game.players = remainingPlayers
        io.to(gameId).emit('player-disconnected', 'El otro jugador se desconectó')
      }
    }
  })
})

const PORT = process.env.PORT ?? 3001
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
