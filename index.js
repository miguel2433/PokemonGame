const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for( let i = 0; i < collisions.length; i += 70){
  collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary{
  static width = 48
  static height = 48
  constructor({position}){
    this.position = position
    this.width = 48
    this.height = 48
  }
  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []

const offset ={
  x : -737,
  y : -650
}
collisionsMap.forEach((row, i)=> {
  row.forEach((symbol, j) =>{
    if(symbol === 1025)
    boundaries.push(new Boundary({
      position:{
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height+ offset.y
      }
    }))
  })
})

console.log(boundaries)

const image = new Image()
image.src = './Imagenes/Town.png'

const playerImage = new Image()
playerImage.src = './Imagenes/playerDown.png'

class Sprite {
  constructor({position, velocity,image}){
    this.position = position
    this.image = image
  }

  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}


const background = new Sprite({
  position:{
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

function animate(){
  window.requestAnimationFrame(animate)
  background.draw()

  boundaries.forEach(boundary =>{
    boundary.draw()
  })

  c.drawImage(
    playerImage,
    0, 0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  )

  // Movimiento (permitiendo múltiples teclas)
  if (keys.w.pressed && lastkey === 'w') background.position.y += 3
  if (keys.s.pressed && lastkey === 's') background.position.y -= 3
  if (keys.a.pressed && lastkey === 'a') background.position.x += 3
  if (keys.d.pressed && lastkey === 'd') background.position.x -= 3
}

let imagesLoaded = 0
image.onload = checkLoaded
playerImage.onload = checkLoaded

function checkLoaded() {
  imagesLoaded++
  if (imagesLoaded === 2) {
    animate()
  }
}

let lastkey = ''

window.addEventListener('keydown', (e) => {
  switch(e.key){
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
  switch(e.key){
    case 'w': keys.w.pressed = false; break
    case 'a': keys.a.pressed = false; break
    case 's': keys.s.pressed = false; break
    case 'd': keys.d.pressed = false; break
  }
})
 