import { dotDraw } from './dot'
import { calculateNewCoord, updateMouseDot } from './mouseDot'

import dotUpdateEachOther, { checkOtherDots } from './dotUpdateEachOther'
import dotUpdateOverlapped from './dotUpdateOverlapped'
import dotUpdateWeird from './dotUpdateWeird'

// Initial Setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables / Constants
const DOT_CIRCLE_RADIUS = 14
const DOTS_MARGIN = 60
const MOUSE_CIRCLE_RADIUS = 50

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
    // passed
    this.x = x
    this.y = y
    // globals
    this.ctx = ctx
    this.mouse = mouse
    this.mouseCircle = mouseCircle
    this.dots = dots
    // settings
    this.animFactor = 12
    this.lineWidth = 2
    this.crossSize = 4
    this.radius = DOT_CIRCLE_RADIUS
    this.centersDistance = Math.abs(DOT_CIRCLE_RADIUS + MOUSE_CIRCLE_RADIUS) + 1
    this.getColor = (opacity) => `rgba(0, 145, 0, ${opacity})`
}

function MouseDot(x, y) {
    this.x = x
    this.y = y
    // globals
    this.ctx = ctx
    this.mouse = mouse
    this.mouseCircle = mouseCircle
    this.dots = dots
    // settings
    this.animFactor = 12
    this.lineWidth = 2
    this.crossSize = 8
    this.radius = MOUSE_CIRCLE_RADIUS
    this.getColor = (opacity) => `rgba(49, 53, 255, ${opacity})`
}

const getDotUpdateBaseOnSearchQuery = () => {
    const mode = parseInt(location.search.replace('?', ''), 10)

    switch (mode) {
        case 2:
            return dotUpdateWeird
        case 3:
            return dotUpdateOverlapped
        default:
            return dotUpdateEachOther
    }
}

Dot.prototype = {
    checkOtherDots: checkOtherDots,
    draw: dotDraw,
    update: getDotUpdateBaseOnSearchQuery(),
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
    const hAmount = Math.floor(canvas.width / DOTS_MARGIN - 1)
    const vAmount = Math.floor(canvas.height / DOTS_MARGIN - 1)

    mouseCircle = new MouseDot(mouse.x, mouse.y)
    dots = []

    for (let i = 0; i < hAmount; i++) {
        for (let j = 0; j < vAmount; j++) {
            const x = i * DOTS_MARGIN + DOTS_MARGIN
            const y = j * DOTS_MARGIN + DOTS_MARGIN
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
