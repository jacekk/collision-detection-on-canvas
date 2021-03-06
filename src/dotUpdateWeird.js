export default function() {
    const xDiff = this.mouseCircle.x - this.x
    const yDiff = this.mouseCircle.y - this.y
    const zDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

    if (zDiff < this.centersDistance) {
        this.x -= Math.sin(xDiff / zDiff * zDiff) * 3
        this.y -= Math.sin(yDiff / zDiff * zDiff) * 3
    }

    this.draw()
}
