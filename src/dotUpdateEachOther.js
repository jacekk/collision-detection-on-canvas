export default function() {
    const xDiff = this.mouseCircle.x - this.x
    const yDiff = this.mouseCircle.y - this.y
    const zDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

    if (zDiff < this.centersDistance) {
        const factor = (this.centersDistance - zDiff) / this.animFactor
        this.x -= Math.sin(xDiff / zDiff) * factor
        this.y -= Math.sin(yDiff / zDiff) * factor
        this.checkOtherDots()
    }

    this.draw()
}

export function checkOtherDots(movedBy) {
    const dotWidth = this.radius * 2

    const notThisFilter = (dot) => this.x !== dot.x && this.y !== dot.y
    const notMovedBy = (dot) => movedBy.x === dot.x && movedBy.y === dot.y

    const tooCloseDiffs = []
    const notThisOne = this.dots.filter(notThisFilter)
    const tooClose = notThisOne.filter((dot) => {
        if (movedBy && notMovedBy(dot)) {
            return false
        }

        const xDiff = this.x - dot.x
        const yDiff = this.y - dot.y
        const zDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

        if (zDiff > dotWidth) {
            return false
        }

        tooCloseDiffs.push({ xDiff, yDiff })

        return true
    })

    tooClose.forEach((dot, index) => {
        const { xDiff, yDiff } = tooCloseDiffs[index]
        const ratio = dotWidth / Math.sqrt(xDiff * xDiff + yDiff * yDiff)

        dot.x = this.x - xDiff * ratio
        dot.y = this.y - yDiff * ratio
        dot.checkOtherDots(this)
    })
}
