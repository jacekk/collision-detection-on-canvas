import { dotDraw } from './dot'
import { calculateNewCoord, updateMouseDot } from './mouseDot'
import dotUpdate1 from './dotUpdate-1'

// Initial Setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables / Constants
const MOUSE_CIRCLE_RADIUS = 60
const DOT_CIRCLE_RADIUS = 14
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
    this.ctx = ctx
    this.mouse = mouse
    this.mouseCircle = mouseCircle
    this.x = x
    this.y = y

    this.animFactor = 20
    this.lineWidth = 2
    this.crossSize = 4
    this.radius = DOT_CIRCLE_RADIUS
    this.centersDistance = Math.abs(DOT_CIRCLE_RADIUS + MOUSE_CIRCLE_RADIUS) + 1
    this.getColor = (opacity) => `rgba(0, 145, 0, ${opacity})`
}

function MouseDot(x, y) {
    this.ctx = ctx
    this.mouse = mouse
    this.mouseCircle = mouseCircle
    this.x = x
    this.y = y

    this.animFactor = 20
    this.lineWidth = 2
    this.crossSize = 8
    this.radius = MOUSE_CIRCLE_RADIUS
    this.getColor = (opacity) => `rgba(49, 53, 255, ${opacity})`
}

Dot.prototype = {
    draw: dotDraw,
    update: dotUpdate1,
}

MouseDot.prototype = {
    calculateNewCoord: calculateNewCoord,
    draw: Dot.prototype.draw,
    update: updateMouseDot,
}

// Implementation
let dots
let mouseCircle

function init() {
    const marg = 80
    const hAmount = Math.floor(canvas.width / marg - 1)
    const vAmount = Math.floor(canvas.height / marg - 1)

    mouseCircle = new MouseDot(mouse.x, mouse.y)
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
