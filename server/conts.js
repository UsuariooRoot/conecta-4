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
