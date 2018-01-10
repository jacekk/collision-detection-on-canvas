// Initial Setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables / Constants
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
/*
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
*/

// Objects
function MouseCircle() {
    this.x = mouse.x
    this.y = mouse.y
    this.lineWidth = 4
    this.radius = 60
    this.crossSize = 10
    this.getColor = (opacity) => `rgba(49, 53, 255, ${opacity})`
}

MouseCircle.prototype.calculateNewCoord = function(prop) {
    const mousePoint = mouse[prop]

    if (Math.round(this[prop]) === mousePoint) {
        return
    }

    const diff = Math.floor(mousePoint - this[prop]) / 15

    if (Math.abs(diff) > 0.05) {
        this[prop] += diff
    } else {
        this[prop] = mousePoint
    }
}

MouseCircle.prototype.update = function() {
    this.calculateNewCoord('x')
    this.calculateNewCoord('y')
    this.draw()
}

MouseCircle.prototype.draw = function() {
    const xs = this.crossSize

    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.getColor('0.15')
    ctx.strokeStyle = this.getColor('0.1')

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.strokeStyle = this.getColor('0.3')

    ctx.beginPath()
    ctx.moveTo(this.x - xs, this.y)
    ctx.lineTo(this.x + xs, this.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(this.x, this.y - xs)
    ctx.lineTo(this.x, this.y + xs)
    ctx.stroke()
}

// Implementation
let circles
let mouseCircle

function init() {
    mouseCircle = new MouseCircle()
    circles = []

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            // circles.push();
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mouseCircle.update()

    // ctx.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
