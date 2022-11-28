import {
    earthRadius,
    skySphereRadius,
    wordCenterCircleRadius,
    divSize,
    labelWidth,
    labelHeight
} from "./AppConstants"

import { toRad } from "./CommonMath"

const floatEps = 0.0001
const halfPi = Math.PI / 2

function updateSprites(camera, sprites) {
    const posScales = [
        1.2, 1.2, 1.25, 1.3,
        1.3,
        1.3, 1.25, 1.2, 1.2
    ]

    for (const i of sprites) {
        const camX = camera.position.x
        const camZ = camera.position.z

        const z0 = Math.sqrt(
            (earthRadius ** 2 * camX ** 2) / (camX ** 2 + camZ ** 2))

        const targetX = -Math.cos(i.smvLatRad) * z0 * camZ / camX
        const targetZ = Math.cos(i.smvLatRad) * z0
        const targetY = Math.sin(i.smvLatRad) * earthRadius

        if (i.smvSide == 0) {
            i.position.x = targetX * posScales[i.smvLatType]
            i.position.y = targetY * posScales[i.smvLatType]
            i.position.z = targetZ * posScales[i.smvLatType]
        }
        else {
            i.position.x = -targetX * posScales[i.smvLatType]
            i.position.y = targetY * posScales[i.smvLatType]
            i.position.z = -targetZ * posScales[i.smvLatType]
        }
    }
}

function calculateSunPosition(latRad, timeMinutes, subSolarPointLatDeg) {
    const s = toRad(subSolarPointLatDeg)
    const d = Math.sin(s)
    const l = Math.cos(s)

    const sinAlpha = Math.sin(latRad)
    const cosAlpha = Math.cos(latRad)
    const cosTheta = Math.cos(Math.PI * timeMinutes / (24 * 30))

    let x = 0
    let y = 0
    let z = 0

    // 90N
    if (Math.abs(latRad - halfPi) <= floatEps) {
        x = d
        y = l * cosTheta
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - y ** 2)
    }
    // 90S
    else if (Math.abs(latRad + halfPi) <= floatEps) {
        x = -d
        y = -l * cosTheta
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - y ** 2)
    }
    else {
        const xc = d * sinAlpha
        const yc = d * cosAlpha

        x = -l * cosAlpha * cosTheta + xc
        y = (xc - x) * Math.tan(latRad) + yc
        z = isNoonOrMidnight(timeMinutes)
            ? 0
            : Math.sqrt(l ** 2 - (x - xc) ** 2 - (y - yc) ** 2)
    }

    if (timeMinutes < 12 * 60) {
        z = -z
    }

    return [x * skySphereRadius, y * skySphereRadius, z * skySphereRadius]
}

function calculateSunRiseSetPosition(latRad, subSolarPointLatDeg) {
    const s = toRad(subSolarPointLatDeg)
    const d = Math.sin(s)
    const l = Math.cos(s)

    const sinAlpha = Math.sin(latRad)
    const cosAlpha = Math.cos(latRad)

    let sunriseY = 0
    let sunriseZ = 0

    let sunsetY = 0
    let sunsetZ = 0

    if (Math.abs(latRad - halfPi) > floatEps
        && Math.abs(latRad + halfPi) > floatEps
        && Math.abs(latRad) < Math.abs(
            Math.PI / 2 - Math.abs(toRad(subSolarPointLatDeg)))) {

        const xc = d * sinAlpha
        const yc = d * cosAlpha

        sunriseY = sunsetY = xc ** 2 / yc + yc

        sunriseZ = -Math.sqrt(l ** 2 - xc ** 2 - xc ** 4 / yc ** 2)
        sunsetZ = -sunriseZ

        sunriseY *= skySphereRadius
        sunriseZ *= skySphereRadius
        sunsetY *= skySphereRadius
        sunsetZ *= skySphereRadius
    }

    return [sunriseY, sunriseZ, sunsetY, sunsetZ]
}

function isNoonOrMidnight(timeMinutes) {
    return timeMinutes == 0 || timeMinutes == 12 * 60
}

function calculateCompassWordTranslates(currentHeadingRad) {
    // all size in px

    const translates = [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 0
        },
    ]

    const rotationOffsetsRad = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]

    for (const i in translates) {
        const targetRotationRad = rotationOffsetsRad[i] - currentHeadingRad

        let targetTranslateX =
            wordCenterCircleRadius * Math.sin(targetRotationRad) + divSize / 2
        let targetTranslateY =
            divSize / 2 - wordCenterCircleRadius * Math.cos(targetRotationRad)

        targetTranslateX -= labelWidth / 2
        targetTranslateY -= labelHeight / 2

        translates[i].x = targetTranslateX
        translates[i].y = targetTranslateY
    }

    return translates
}

export {
    updateSprites,
    calculateSunPosition,
    calculateSunRiseSetPosition,
    calculateCompassWordTranslates
}