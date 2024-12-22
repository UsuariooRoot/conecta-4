export const SELECT_TURNS = (p1, p2) => ({
  player1: p1,
  player2: p2
})

export const TURNS = {
  player1: '#FF0000',
  player2: '#00FF00'
}

export const N_ROWS = 6

export const N_COLUMNS = 7

export const GAME_MODE = {
  vsMachine: 'vsMachine',
  multiplayer: 'multiplayer'
}

export const GAME_STATES = {
  WAITING: 'waiting',
  READY: 'ready',
  IN_PROGRESS: 'in-progress',
  FINISHED: 'finished'
}
