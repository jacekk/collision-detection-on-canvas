export default function() {
    var xDiff = this.mouseCircle.x - this.x
    var yDiff = this.mouseCircle.y - this.y
    var zDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

    if (zDiff < this.centersDistance) {
        this.x -= Math.sin(xDiff / zDiff * zDiff) * 3
        this.y -= Math.sin(yDiff / zDiff * zDiff) * 3
    }

    this.draw()
}
