const canvas = document.querySelector('canvas')

canvas.width = 1024
canvas.height = 576

const c = canvas.getContext('2d')

c.fillStyle = 'white'

c.fillRect(0,0, canvas.width, canvas.height)

const img = new Image()
img.src = './img/Mapa.png'
console.log(img)


const playerImage = new Image()

playerImage.src = './img/ACharDown.png'

img.onload = () =>{
    c.drawImage(img, -1400, -800)
    playerImage.onload = () =>{
        c.drawImage(playerImage,
             canvas.width / 2 - playerImage.width / 2,
             canvas.height / 2 - playerImage.height / 2)
    }
}
