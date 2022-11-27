import {earthRadius, skySphereRadius,wordCenterCircleRadius,divSize,labelWidth,labelHeight} from "./AppConstants"

function toDeg(rad) {
    return 180 * rad / Math.PI
}

function toRad(deg) {
    return Math.PI * deg / 180
}

function updateSprites(camera, sprites) {
    const posScales = [
        1.2, 1.2, 1.25, 1.3,
        1.3,
        1.3, 1.25, 1.2, 1.2
    ]

    for (let i of sprites) {
        let camX = camera.position.x
        let camZ = camera.position.z

        let z0 = Math.sqrt((earthRadius ** 2 * camX ** 2) / (camX ** 2 + camZ ** 2))

        let targetX = -Math.cos(i.smvLatRad) * z0 * camZ / camX
        let targetZ = Math.cos(i.smvLatRad) * z0
        let targetY = Math.sin(i.smvLatRad) * earthRadius

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
    const floatEps = 0.0001
    const D = 23.48159662 // original value divided by scale 100000 to ensure precision
    const halfPi = Math.PI / 2

    let sa = toRad(subSolarPointLatDeg)
    let d = D * Math.cos(halfPi - sa)
    let l = D * Math.sin(halfPi - sa)
    let cosAngle = Math.cos(Math.PI * timeMinutes / (24 * 30))

    let x = 0
    let y = 0
    let z = 0

    // equator
    if (Math.abs(latRad) <= floatEps) {
        x = -l * cosAngle
        y = d
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - x ** 2)
    }
    // 90N
    else if (Math.abs(latRad - halfPi) <= floatEps) {
        x = d
        y = l * cosAngle
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - y ** 2)
    }
    // 90S
    else if (Math.abs(latRad + halfPi) <= floatEps) {
        x = -d
        y = -l * cosAngle
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - y ** 2)
    }
    else {
        let deltaL = 0 - latRad

        let yc = Math.sqrt((d ** 2) / (Math.tan(deltaL) ** 2 + 1))
        if (subSolarPointLatDeg < 0) {
            yc = -yc
        }

        let xc = -Math.tan(deltaL) * yc

        let xk = -Math.sqrt((l ** 2 * yc ** 2) / (yc ** 2 + xc ** 2)) + xc
        let yk = (xc - xk) * xc / yc + yc

        let yLeft = yk - yc - yc * (xk - xc) / xc
        let yRight = l ** 2 * cosAngle - yc ** 2 * (xk - xc) / xc + yc * (yk - yc)

        y = yRight / yLeft
        x = (yc - y) * yc / xc + xc
        z = isNoonOrMidnight(timeMinutes) ? 0 : Math.sqrt(l ** 2 - (x - xc) ** 2 - (y - yc) ** 2)
    }

    if (timeMinutes < 12 * 60) {
        z = -z
    }

    const finalScale = skySphereRadius / D
    return [x * finalScale, y * finalScale, z * finalScale]

}

function calculateSunRiseSetPosition(latRad, subSolarPointLatDeg) {
    const floatEps = 0.0001
    const D = 23.48159662 // original value divided by scale 100000 to ensure precision
    const halfPi = Math.PI / 2

    let sa = toRad(subSolarPointLatDeg)
    let d = D * Math.cos(halfPi - sa)
    let l = D * Math.sin(halfPi - sa)

    let sunriseY = 0
    let sunriseZ = 0

    let sunsetY = 0
    let sunsetZ = 0

    if (Math.abs(latRad - halfPi) > floatEps
        && Math.abs(latRad + halfPi) > floatEps
        && Math.abs(latRad) < Math.abs(Math.PI / 2 - Math.abs(toRad(subSolarPointLatDeg)))) {

        let deltaL = 0 - latRad

        let yc = Math.sqrt((d ** 2) / (Math.tan(deltaL) ** 2 + 1))
        if (subSolarPointLatDeg < 0) {
            yc = -yc
        }

        let xc = -Math.tan(deltaL) * yc

        sunriseY = sunsetY = xc ** 2 / yc + yc

        sunriseZ = -Math.sqrt(l ** 2 - xc ** 2 - xc ** 4 / yc ** 2)
        sunsetZ = -sunriseZ

        const finalScale = skySphereRadius / D

        sunriseY *= finalScale
        sunriseZ *= finalScale
        sunsetY *= finalScale
        sunsetZ *= finalScale
    }

    return [sunriseY, sunriseZ, sunsetY, sunsetZ]
}

function isNoonOrMidnight(timeMinutes) {
    return timeMinutes == 0 || timeMinutes == 12 * 60
}

function calculateCompassWordTranslates(currentHeadingRad) {
    // all size in px

    let translates = [
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

    for (let i in translates) {
        let targetRotationRad = rotationOffsetsRad[i] - currentHeadingRad

        let targetTranslateX = wordCenterCircleRadius * Math.sin(targetRotationRad) + divSize / 2
        let targetTranslateY = divSize / 2 - wordCenterCircleRadius * Math.cos(targetRotationRad)

        targetTranslateX -= labelWidth / 2
        targetTranslateY -= labelHeight / 2

        translates[i].x = targetTranslateX
        translates[i].y = targetTranslateY
    }

    return translates
}

export {
    toDeg,
    toRad,
    updateSprites,
    calculateSunPosition,
    calculateSunRiseSetPosition,
    calculateCompassWordTranslates
}