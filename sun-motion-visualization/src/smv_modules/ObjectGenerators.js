import * as THREE from "three"

import { toRad,calculateSunPosition,calculateSunRiseSetPosition } from "./GeoMath"
import { sunTrackDistanceScale, modelPath } from "./AppConstants"

function generateLatLine(earthRadius, latDeg, color, isDashed) {
    const curve = new THREE.EllipseCurve(
        0,
        0,
        earthRadius * Math.cos(toRad(latDeg)) + 0.5,
        earthRadius * Math.cos(toRad(latDeg)) + 0.5,
        0,
        2 * Math.PI,
        false,
        Math.PI / 2
    )

    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100))

    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, earthRadius * Math.sin(toRad(latDeg)), 0)


    let material = undefined

    if (isDashed) {
        material = new THREE.LineDashedMaterial({ color: color, dashSize: 3, gapSize: 2 })
    }
    else {
        material = new THREE.LineBasicMaterial({ color: color })
    }

    return new THREE.Line(geometry, material).computeLineDistances()
}

// side: 0 - left; 1 - right
function generateLatSprite(latDeg, latType, textureName, side, scaleXToY) {
    const texture = new THREE.TextureLoader().load(modelPath + textureName)
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(12 * scaleXToY, 12, 1)
    sprite.smvLatRad = toRad(latDeg)
    sprite.smvLatType = latType
    sprite.smvSide = side

    return sprite
}


// generates a group of line and sprite of
// 0, 30, 60, the tropic of cancer and capricorn and polar circles.
function generateLatData(earthRadius) {
    const latGroup = new THREE.Group()
    const spriteGroup = new THREE.Group()

    const lats = [
        -66.5, -60, -30, -23.5,
        0,
        23.5, 30, 60, 66.5]

    const latsForSprites = [
        -66.5, -55, -30, -20,
        0,
        20, 30, 55, 66.5]

    const colors = [
        0x87CEFA, 0xffffff, 0xffffff, 0xFF00FF,
        0xffffff,
        0xFF00FF, 0xffffff, 0xffffff, 0x87CEFA]

    const isDashed = [
        true, false, false, true,
        false,
        true, false, false, true
    ]

    const spriteTextureNames = [
        "pcs.png", "60s.png", "30s.png", "tocs.png",
        "equa.png",
        "tocn.png", "30n.png", "60n.png", "pcn.png"
    ]

    const scaleXToYs = [
        2, 1.75, 1.75, 2.5,
        2,
        2.5, 1.75, 1.75, 2
    ]

    for (let i in lats) {
        latGroup.add(generateLatLine(earthRadius, lats[i], colors[i], isDashed[i]))
        spriteGroup.add(generateLatSprite(latsForSprites[i], i, spriteTextureNames[i], 0, scaleXToYs[i]))
        spriteGroup.add(generateLatSprite(latsForSprites[i], i, spriteTextureNames[i], 1, scaleXToYs[i]))
    }

    return new THREE.Group().add(latGroup, spriteGroup)
}

function generateSunTrackLine(latRad, solarAltituteDeg, addRiseSet = false, pointCount = 100, lineColor = 0xffffff) {

    const points = []
    for (let i = 0; i < pointCount; i++) {
        let timeMinutes = 24 * 60 * i / pointCount

        const pointPosition = calculateSunPosition(latRad, timeMinutes, solarAltituteDeg)

        points.push(
            new THREE.Vector3(
                pointPosition[0] * sunTrackDistanceScale,
                pointPosition[1] * sunTrackDistanceScale,
                pointPosition[2] * sunTrackDistanceScale))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: lineColor })

    const trackLine = new THREE.LineLoop(geometry, material)

    if (addRiseSet) {
        const riseSetPosition = calculateSunRiseSetPosition(latRad, solarAltituteDeg)

        const rsGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(3, riseSetPosition[0], riseSetPosition[1]),
            new THREE.Vector3(3, riseSetPosition[2], riseSetPosition[3])
        ])

        const rsMaterial = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 15, gapSize: 10 })

        trackLine.add(new THREE.Line(rsGeometry, rsMaterial).computeLineDistances())
    }

    return trackLine
}

export{generateLatData,generateSunTrackLine}