import { GAME_STATES } from './conts.js'
import { availableColor, checkTie, checkWinner, createGame, generateGameId, getColors, resetGame, setDefaultColor } from './logic-game.js'

export const games = {} // Store games

// Mapping players to a game
export const playerGameMap = new Map() // socketId -> gameId

export function initializeGameServer(io) {
  io.on('connection', (socket) => {
    // Create a new game
    socket.on('create-game', () => {
      let gameId // Generate ramdon ID

      do {
        gameId = generateGameId(6)
      } while (games[gameId])

      games[gameId] = createGame(gameId)

      socket.emit('game-created', gameId)
    })

    // Join an existing game
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

      // Check if player is rejoining
      const existingPlayer = game.players.find(p => p.id === socket.id)
      if (existingPlayer) {
        socket.emit('joined-game', {
          gameId,
          playerColor: existingPlayer,
          status: game.status,
          board: game.board,
          currentPlayer: game.currentPlayer
        })
        return
      }

      // Add new player to the game
      const newPlayer = {
        id: socket.id,
        color: setDefaultColor(game.players)
      }

      game.players.push(newPlayer)
      playerGameMap.set(socket.id, gameId)
      socket.join(gameId)

      // Update game status and/or current player based on player count
      if (game.players.length === 1) {
        game.status = GAME_STATES.WAITING
        game.currentPlayer = newPlayer
      } else if (game.players.length === 2) {
        game.status = GAME_STATES.READY
      }

      // Emit updated game state to all players
      io.to(gameId).emit('game-updated', {
        board: game.board,
        status: game.status,
        currentPlayer: game.currentPlayer,
        colors: getColors(game.players)
      })

      socket.emit('joined-game', {
        gameId,
        player: newPlayer,
        status: game.status,
        board: game.board,
        currentPlayer: game.currentPlayer,
        colors: getColors(game.players)
      })
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
      game.currentPlayer = game.players[0] // First player starts

      io.to(gameId).emit('game-started', {
        board: game.board,
        currentPlayer: game.currentPlayer,
        status: game.status
      })
    })

    socket.on('change-color', ({ playerId, color }) => {
      const gameId = playerGameMap.get(playerId)

      if (!gameId) {
        socket.emit('game-error', 'Partida no encontrada')
        return
      }

      const game = games[gameId]
      const isColorAvailable = availableColor(game.players, color)

      if (!isColorAvailable) {
        socket.emit('game-error', 'Color no disponible')
        return
      }

      game.players = game.players.map(p => {
        return p.id === playerId ? { ...p, color } : p
      })

      io.to(gameId).emit('player-changed-his-color', {
        colors: getColors(game.players)
      })

      socket.emit('color-changed', {
        player: game.players.find(p => p.id === playerId)
      })
    })

    // Handle moves
    socket.on('make-move', ({ gameId, column, player }) => {
      const game = games[gameId]

      if (!game || game.status !== GAME_STATES.IN_PROGRESS) {
        socket.emit('game-error', 'Estado de juego invalido')
        return
      }

      if (game.currentPlayer.id !== player.id) {
        socket.emit('game-error', 'No es tu turno')
        return
      }

      const row = game.board.findLastIndex(row => row[column] === null)

      if (row !== -1) {
        game.board[row][column] = player.color[1]
        const winner = checkWinner(game.board, { row, col: column, player })

        if (winner) {
          game.status = GAME_STATES.FINISHED
          game.winner = player
        } else if (checkTie(game.board)) {
          game.status = GAME_STATES.FINISHED
          game.winner = 'Tie'
        }

        game.currentPlayer = game.players.find(({ id }) => id !== player.id)

        io.to(gameId).emit('move-made', {
          board: game.board,
          currentPlayer: game.currentPlayer,
          winner: game.winner,
          status: game.status
        })
      }
    })

    socket.on('reset-game', (gameId) => {
      const game = games[gameId]

      if (!game) {
        socket.emit('game-error', 'Partida no encontrada')
        return
      }

      resetGame(game)

      io.to(gameId).emit('game-restarted', {
        status: game.status,
        board: game.board,
        currentPlayer: game.currentPlayer,
        winner: game.winner
      })
    })

    socket.on('disconnect', () => {
      const gameId = playerGameMap.get(socket.id)
      if (!gameId) return

      const game = games[gameId]
      if (!game) return

      game.players = game.players.filter(({ id }) => id !== socket.id)

      playerGameMap.delete(socket.id)

      if (game.players.length === 0) {
        delete games[gameId]
      } else {
        resetGame(game)
        io.to(gameId).emit('player-disconnected', {
          status: game.status,
          board: game.board,
          currentPlayer: game.currentPlayer
        })
      }
    })
  })
}
