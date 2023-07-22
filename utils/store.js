let instance
export default class Store {
  constructor() {
    if (instance) return instance
    instance = this
    this.ctx = canvas.getContext('2d')
    this.playerPosition = [innerWidth / 2, innerHeight - 60]
    this.playerRadius = 30
  }
  setPlayerPosition(position) {
    for (let i = 0; i < 2; i++) {
      this.playerPosition[i] = position[i]
    }
  }
}