const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
    this.position = position
    this.width = 48
    this.height = 48
  }
  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []

const offset = {
  x: -737,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y
        }
      }))
  })
})

const image = new Image()
image.src = './Imagenes/Town.png'

const playerImage = new Image()
playerImage.src = './Imagenes/playerDown.png'

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    this.image = image
    this.frames = frames
    this.width = 0 // se define después
    this.height = 0
  }

  draw() {
    c.drawImage(
      this.image,
      0, 0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2, // estimado inicial
    y: canvas.height / 2 - 68 / 2
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
}



const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function animate() {
  window.requestAnimationFrame(animate)
  background.draw()

  boundaries.forEach((boundary) => {
    boundary.draw()
  })
  player.draw()

  let moving = true

  if (keys.w.pressed && lastkey === 'w') {
    for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries[i]
      if (rectangularCollision({
      rectangle1: player,
      rectangle2: {...boundary, position:{
        x: boundary.position.x,
        y: boundary.position.y + 3
      }}
      })) {
      console.log("colliding")
      moving = false
      break
    }
    }
    if(moving){
      movables.forEach((movable) => { movable.position.y += 3 })
    }
  }
  if (keys.s.pressed && lastkey === 's') {
      for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries[i]
      if (rectangularCollision({
      rectangle1: player,
      rectangle2: {...boundary, position:{
        x: boundary.position.x,
        y: boundary.position.y - 3
      }}
      })) {
      console.log("colliding")
      moving = false
      break
    }
    }
    if(moving){
    movables.forEach((movable) => { movable.position.y -= 3 })
    }
  }
  if (keys.a.pressed && lastkey === 'a') {
      for(let i = 0; i < boundaries.length; i++){
      const boundary = boundaries[i]
      if (rectangularCollision({
      rectangle1: player,
      rectangle2: {...boundary, position:{
        x: boundary.position.x + 3,
        y: boundary.position.y
      }}
      })) {
      console.log("colliding")
      moving = false
      break
    }
    }
    if(moving){
    movables.forEach((movable) => { movable.position.x += 3 })
    }
  }
  if (keys.d.pressed && lastkey === 'd') {
      for(let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position:{
          x: boundary.position.x,
          y: boundary.position.y - 3
      }}
      })) {
      console.log("colliding")
      moving = false
      break
    }
    }
    if(moving){
    movables.forEach((movable) => { movable.position.x -= 3 })}
  }
}

let imagesLoaded = 0
image.onload = checkLoaded
playerImage.onload = checkLoaded

function checkLoaded() {
  imagesLoaded++
  if (imagesLoaded === 2) {
    // Setear ancho y alto reales del player una vez cargada la imagen
    player.width = player.image.width / player.frames.max
    player.height = player.image.height

    console.log('Player width:', player.width)
    console.log('Player height:', player.height)

    animate()
  }
}

let lastkey = ''

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastkey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastkey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastkey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastkey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w': keys.w.pressed = false; break
    case 'a': keys.a.pressed = false; break
    case 's': keys.s.pressed = false; break
    case 'd': keys.d.pressed = false; break
  }
})
