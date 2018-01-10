export function updateMouseDot() {
    this.calculateNewCoord('x')
    this.calculateNewCoord('y')
    this.draw()
}

export function calculateNewCoord(prop) {
    const mousePoint = this.mouse[prop]

    if (Math.round(this[prop]) === mousePoint) {
        return
    }

    const diff = Math.floor(mousePoint - this[prop]) / this.animFactor

    if (Math.abs(diff) > 0.05) {
        this[prop] += diff
    } else {
        this[prop] = mousePoint
    }
}
