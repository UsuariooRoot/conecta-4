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
  ['Verde', '#00FF00'],
  ['Rojo', '#FF0000'],
  ['Amarillo', '#FFFF00'],
  ['Azul', '#0000FF'],
  ['Naranja', '#FFA500'],
  ['Rosa', '#FF69B4'],
  ['Negro', '#000000'],
  ['Blanco', '#FFFFFF'],
  ['Morado', '#800080'],
  ['Cian', '#00FFFF'],
  ['Lima', '#32CD32'],
  ['Marrón', '#8B4513']]
