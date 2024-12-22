import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { initializeGameServer } from './websocket-events.js'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

initializeGameServer(io)

const PORT = process.env.PORT ?? 3001
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
