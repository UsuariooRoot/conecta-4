export const N_ROWS = 6
export const N_COLUMNS = 7

export const GAME_STATES = {
  WAITING: 'waiting', // Only one player has joined
  READY: 'ready', // 2 players, ready to go
  IN_PROGRESS: 'in-progress',
  FINISHED: 'finished'
}

export const INITIAL_STATE_BOARD = () =>
  Array(N_ROWS).fill().map(() => Array(N_COLUMNS).fill(null))

export const AVAILABLE_COLORS = [
  { name: 'Verde', hex: '#00FF00' },
  { name: 'Rojo', hex: '#FF0000' },
  { name: 'Amarillo', hex: '#FFFF00' },
  { name: 'Azul', hex: '#0000FF' },
  { name: 'Naranja', hex: '#FFA500' },
  { name: 'Rosa', hex: '#FF69B4' },
  { name: 'Negro', hex: '#000000' },
  { name: 'Blanco', hex: '#FFFFFF' },
  { name: 'Morado', hex: '#800080' },
  { name: 'Cian', hex: '#00FFFF' },
  { name: 'Lima', hex: '#32CD32' },
  { name: 'Marrón', hex: '#8B4513' }]

export const DEFAULT_COLOR = [
  AVAILABLE_COLORS[0],
  AVAILABLE_COLORS[1]
]
