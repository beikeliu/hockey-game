import './libs/weapp-adapter'

const ctx = canvas.getContext('2d')

const topBuffer = 50

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
  position: [innerWidth / 2, 60 + topBuffer],
  radius: 33,
  color: '#0000FF',
  setPosition(position) {
    this.position[0] = position[0]
    this.position[1] = position[1]
  }
}

const ball = {
  position: [innerWidth / 2, innerHeight / 2 + topBuffer / 2],
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

function drawSite() {
  ctx.strokeStyle = 'green'
  ctx.strokeRect(20, 20 + topBuffer, innerWidth - 40, innerHeight - 40 - topBuffer)
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  ctx.moveTo(innerWidth / 2 - 60, 20 + topBuffer)
  ctx.lineTo(innerWidth / 2 + 60, 20 + topBuffer)
  ctx.moveTo(innerWidth / 2 - 60, innerHeight - 20)
  ctx.lineTo(innerWidth / 2 + 60, innerHeight - 20)
  ctx.stroke();
}

function draw() {
  drawSite()
  drawCake(player.position, player.radius, player.color)
  drawCake(right.position, right.radius, right.color)
  drawCake(ball.position, ball.radius, ball.color)
}


let touched = undefined

function getCakeBox(x, y, r) {
  return {
    l: x - r,
    r: x + r,
    t: y - r,
    b: y + r
  }
}

function checkTouchPalyer(e) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  const [px, py] = player.position
  const {
    l,
    r,
    t,
    b
  } = getCakeBox(px, py, player.radius)
  return x >= l && x <= r && y >= t && y <= b
}

function checkTouchRight(e) {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  const [px, py] = right.position
  const {
    l,
    r,
    t,
    b
  } = getCakeBox(px, py, right.radius)
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
  const ballBox = getCakeBox(...ball.position, ball.radius)
  const playBox = getCakeBox(...player.position, player.radius)
  if (
    ballBox.b > playBox.t &&
    ballBox.t < playBox.b &&
    ballBox.r > playBox.l &&
    ballBox.l < playBox.r
  ) {
    console.log('碰上了,但是怎么设置ball的弹射方向？')
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw()
}

function initEvent() {
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
}


// start
draw()
initEvent()