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

// Objects
function Dot(x, y) {
    this.x = x
    this.y = y
    this.lineWidth = 2
    this.radius = 16
    this.crossSize = 5
    this.getColor = (opacity) => `rgba(0, 145, 0, ${opacity})`
}

function MouseDot() {
    this.x = mouse.x
    this.y = mouse.y
    this.lineWidth = 4
    this.radius = 60
    this.crossSize = 10
    this.getColor = (opacity) => `rgba(49, 53, 255, ${opacity})`
}

Dot.prototype.update = function() {
    this.draw()
}

Dot.prototype.draw = function() {
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

MouseDot.prototype = {
    draw: Dot.prototype.draw,
}

MouseDot.prototype.update = function() {
    this.calculateNewCoord('x')
    this.calculateNewCoord('y')
    this.draw()
}

MouseDot.prototype.calculateNewCoord = function(prop) {
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

// Implementation
let dots
let mouseCircle

function init() {
    const marg = 80
    const hAmount = Math.floor(canvas.width / marg - 1)
    const vAmount = Math.floor(canvas.height / marg - 1)

    mouseCircle = new MouseDot()
    dots = []

    for (let i = 0; i < hAmount; i++) {
        for (let j = 0; j < vAmount; j++) {
            const x = i * marg + marg
            const y = j * marg + marg
            dots.push(new Dot(x, y))
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mouseCircle.update()
    dots.forEach((dot) => {
        dot.update()
    })
}

init()
animate()
