export function dotDraw() {
    const xs = this.crossSize
    const c = this.ctx

    c.lineWidth = this.lineWidth
    c.fillStyle = this.getColor('0.15')
    c.strokeStyle = this.getColor('0.1')

    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
    c.stroke()
    c.closePath()

    c.strokeStyle = this.getColor('0.3')

    c.beginPath()
    c.moveTo(this.x - xs, this.y)
    c.lineTo(this.x + xs, this.y)
    c.stroke()

    c.beginPath()
    c.moveTo(this.x, this.y - xs)
    c.lineTo(this.x, this.y + xs)
    c.stroke()
}
