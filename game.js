import './libs/weapp-adapter'

const ctx = canvas.getContext('2d')

const player = {
  position: [innerWidth / 2, innerHeight - 60],
  radius: 33,
  color: '#FF0000',
  setPosition(position) {
    this.position[0] = position[0]
    this.position[1] = position[1]
  },
}

const right = {
  position: [innerWidth / 2, 60],
  radius: 33,
  color: '#0000FF',
  setPosition(position) {
    this.position[0] = position[0]
    this.position[1] = position[1]
  }
}

const ball = {
  position: [innerWidth / 2, innerHeight / 2],
  radius: 25,
  color: '#FFFFFF',
  setPosition(position) {
    this.position[0] = position[0]
    this.position[1] = position[1]
  },
}

function drawCake(pos, rad, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(pos[0], pos[1], rad, 0, 360)
  ctx.fill()
}

drawCake(player.position, player.radius, player.color)
drawCake(right.position, right.radius, right.color)
drawCake(ball.position, ball.radius, ball.color)

let touched = undefined

function checkTouchPalyer(e) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  const [px, py] = player.position
  const l = px - player.radius
  const r = px + player.radius
  const t = py - player.radius
  const b = py + player.radius
  return x >= l && x <= r && y >= t && y <= b
}

function checkTouchRight(e) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  const [px, py] = right.position
  const l = px - right.radius
  const r = px + right.radius
  const t = py - right.radius
  const b = py + right.radius
  return x >= l && x <= r && y >= t && y <= b
}

function handleTouchMove(e) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  if (touched === 'player') {
    player.setPosition([x, y])
  }
  if (touched === 'right') {
    right.setPosition([x, y])
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawCake(player.position, player.radius, player.color)
  drawCake(right.position, right.radius, right.color)
  drawCake(ball.position, ball.radius, ball.color)
}

canvas.addEventListener('touchstart', (e) => {
  if (checkTouchPalyer(e)) {
    touched = 'player'
  } else if (checkTouchRight(e)) {
    touched = 'right'
  } else {
    touched = undefined
  }
})

canvas.addEventListener('touchmove', (e) => {
  if (!touched) return
  handleTouchMove(e)
})

canvas.addEventListener('touchend', () => {
  touched = false
})