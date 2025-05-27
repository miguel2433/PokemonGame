const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './Imagenes/Town.png'

const playerImage = new Image()
playerImage.src = './Imagenes/playerDown.png'

// Esperá a que ambas imágenes se carguen correctamente
image.onload = () => {
  c.drawImage(image, -750, -550)

  // Acá va correctamente la función onload del player
  playerImage.onload = () => {
    // Suponiendo que el sprite sheet tiene 4 frames horizontales (por eso width / 4)
    c.drawImage(
      playerImage,
      0, // frame X (primer frame)
      0, // frame Y
      playerImage.width / 4, // ancho de 1 frame
      playerImage.height,    // alto completo
      canvas.width / 2 - (playerImage.width / 4) / 2, // centrado en pantalla (dividido entre 8 porque es 1/4 del sprite)
      canvas.height / 2 - playerImage.height / 2,
      playerImage.width / 4, // dibujo mismo tamaño que el recorte
      playerImage.height
    )
  }
}
