import Store from './store'

export const drawPlayer = () => {
  const {
    ctx,
    playerPosition,
    playerRadius
  } = new Store()
  const [x, y] = playerPosition
  ctx.fillStyle = "#FF0000"
  ctx.beginPath()
  ctx.arc(x, y, playerRadius, 0, 360)
  ctx.fill()
}