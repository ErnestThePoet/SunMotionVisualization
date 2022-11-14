// earth model radius corresponding to the value set in 3dmax
const earthRadius = 100
// camera height above ground in groundView
const hCamera = 0.05
// Sun Rise/Set line above ground
const hRiseSetLine = 0.15
// sky sphere radius in skySphereView
const skySphereRadius = 100

// distance scale to real calculated sun distance
// set slightly lower for sunlight to avoid flashing
const sunLightDistanceScale = 0.98
const sunTrackDistanceScale = 1

// static file path
const modelPath = "./static/"

// orthographic camera horizontal size
const cameraOuterHorizontalSize = 300

// local time autoplay interval in ms
const autoPlayIntervalMs = 20

// ground plane texture repeat count
const textureRepeatCount = 3000

// compass size info in px
const wordCenterCircleRadius = 62
const divSize = 200
const labelWidth = 25
const labelHeight = 35

export {
    earthRadius,
    hCamera,
    hRiseSetLine,
    skySphereRadius,
    sunLightDistanceScale,
    sunTrackDistanceScale,
    modelPath,
    cameraOuterHorizontalSize,
    autoPlayIntervalMs,
    textureRepeatCount,
    wordCenterCircleRadius,
    divSize,
    labelWidth,
    labelHeight
}