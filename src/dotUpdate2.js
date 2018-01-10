export default function() {
    var xDiff = this.mouseCircle.x - this.x
    var yDiff = this.mouseCircle.y - this.y
    var zDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

    if (zDiff < this.centersDistance) {
        const factor = (this.centersDistance - zDiff) / this.animFactor
        this.x -= Math.sin(xDiff / zDiff) * factor
        this.y -= Math.sin(yDiff / zDiff) * factor
    }

    this.draw()
}
