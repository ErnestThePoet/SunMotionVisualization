function toDeg(rad) {
    return 180 * rad / Math.PI
}

function toRad(deg) {
    return Math.PI * deg / 180
}

export {
    toDeg,
    toRad
}