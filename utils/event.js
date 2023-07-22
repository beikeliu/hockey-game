import Store from './store'

export const initEvent = () => {
  const store  = new Store()
  const {
    ctx,
    playerPosition,
    playerRadius,
  } = store
  let touched = false
  canvas.addEventListener('touchstart', (e) => {
    const checkTouchPalyer = () => {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      const [px, py] = playerPosition
      const l = px - playerRadius
      const r = px + playerRadius
      const t = py - playerRadius
      const b = py + playerRadius
      return x >= l && x <= r && y >= t && y <= b
    }
    touched = checkTouchPalyer()
  })
  canvas.addEventListener('touchmove', (e) => {
    if (!touched) return
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    store.setPlayerPosition([x, y])
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(x, y, playerRadius, 0, 360)
    ctx.fill()
  })
  canvas.addEventListener('touchend', () => {
    touched = false
  })
}