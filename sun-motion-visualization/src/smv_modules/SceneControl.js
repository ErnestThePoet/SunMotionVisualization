import * as THREE from "three"

import { hCamera,sunLightDistanceScale,sunTrackDistanceScale } from "./AppConstants"
import { calculateSunPosition, toDeg } from "./GeoMath"
import { generateSunTrackLine } from "./ObjectGenerators"
import * as ANIMATIONS from "./Animations"

function changeToGroundView(app) {
    if (app.isGroundView) {
        return
    }

    app.isGroundView = true
    app.orbitControlsOuter.enabled = false
    app.latData.visible = false
    app.sunLight.children[0].visible = true

    app.groundPlaneMesh.visible=true

    updateSunPosition(app,app.latRad, app.timeMinutes, app.solarAltituteDeg)

    // save current camera state
    app.previousCameraZoom = app.cameraOuter.zoom
    app.previousCameraPosition = app.cameraOuter.position.clone()
    app.previousCameraQuaternion = app.cameraOuter.quaternion.clone()

    // prepare and play transition animations
    const cameraPositionTrack = new THREE.VectorKeyframeTrack(
        "camera.position",
        [0, 1],
        [app.cameraOuter.position.x, app.cameraOuter.position.y, app.cameraOuter.position.z,
            hCamera, 0, 0],
        THREE.InterpolateSmooth)

    // in particular, we calculate the quaternion (for lookAt) with a camera hijack.
    // that is, we put a copy of current camera to our desired state and get its
    // quaternion. then make a quaternion animation for our active camera.
    const cameraCopy = app.camera.clone()
    cameraCopy.position.set(hCamera, 0, 0)
    cameraCopy.lookAt(hCamera, 1, 0)
    cameraCopy.rotation.z = -Math.PI / 2

    const cameraQuaternionTrack = new THREE.QuaternionKeyframeTrack(
        "camera.quaternion",
        [0, 1],
        [app.cameraOuter.quaternion.x, app.cameraOuter.quaternion.y,
            app.cameraOuter.quaternion.z, app.cameraOuter.quaternion.w,
        cameraCopy.quaternion.x, cameraCopy.quaternion.y,
        cameraCopy.quaternion.z, cameraCopy.quaternion.w
        ]
    )

    const cameraClip =
        new THREE.AnimationClip("clip-camera", 1, [cameraPositionTrack, cameraQuaternionTrack])

    const mixerCamera = new THREE.AnimationMixer(app.camera)

    const cameraAction = mixerCamera.clipAction(cameraClip)

    cameraAction.loop = THREE.LoopOnce

    mixerCamera.addEventListener("finished", e => {
        e.action.stop()
        app.camera.position.set(hCamera, 0, 0)
        app.camera.setRotationFromQuaternion(cameraCopy.quaternion)
        app.camera.updateProjectionMatrix()

        app.sunTrackLineGroup.children[0] = generateSunTrackLine(app.latRad, app.solarAltituteDeg)
        app.sunTrackLineGroup.visible = true

        app.earthMesh.visible = false

        app.arrowMesh.position.set(0, 0, 0)
        app.arrowMesh.rotation.z = Math.PI / 2
        app.arrowMesh.visible = true

        app.isGroundControlsShow = true
        app.smvDragControls.enabled = true
        app.scene.background = 0x000000

        app.sunLight.intensity = 1
        app.ambientLight.intensity = 0.35
    })

    app.mixers = [mixerCamera]

    cameraAction.play()

    ANIMATIONS.showGroundPlane(app.groundPlaneMesh.material)

    ANIMATIONS.showCompass()
}

function switchGroundView(app) {
    // prevent repeated click during fade
    if (!app.isGroundControlsShow) {
        return
    }

    if (!app.isSkySphereView) {
        app.scene.rotation.z = Math.PI / 2
        app.sunTrackLineGroup.children[0].rotation.z = Math.PI / 2
        app.smvDragControls.enabled = false

        app.cameraOuter.position.set(372,196,330)
        app.cameraOuter.zoom = 1.0
        app.cameraOuter.updateProjectionMatrix()

        app.orbitControlsOuter.enabled = true

        app.sunLight.intensity = 0.6
        app.ambientLight.intensity = 0.5

        app.sunLight.children[0].visible = false
        app.littleSunMesh.visible = true

        app.arrowBigMesh.visible = true

        app.skyCircleLine.visible = true
        app.skySphereUMesh.visible = true
        app.skySphereLMesh.visible = true
    }
    else {
        app.scene.rotation.z = 0
        app.sunTrackLineGroup.children[0].rotation.z = 0
        app.smvDragControls.enabled = true

        app.orbitControlsOuter.enabled = false

        app.sunLight.intensity = 1
        app.ambientLight.intensity = 0.35

        app.sunLight.children[0].visible = true
        app.littleSunMesh.visible = false

        app.arrowBigMesh.visible = false

        app.skyCircleLine.visible = false
        app.skySphereUMesh.visible = false
        app.skySphereLMesh.visible = false
    }

    app.isSkySphereView = !app.isSkySphereView

    app.sunTrackLineGroup.children[0] =
        generateSunTrackLine(app.latRad, app.solarAltituteDeg, app.isSkySphereView)
    app.sunTrackLineGroup.children[0].rotation.z = app.isSkySphereView ? Math.PI / 2 : 0
}

function exitGroundView(app) {
    // prevent repeated click during fade
    if (!app.isGroundControlsShow) {
        return
    }

    if (app.isSkySphereView) {
        app.scene.rotation.z = 0
        app.sunTrackLineGroup.children[0].rotation.z = 0

        app.littleSunMesh.visible = false

        app.skyCircleLine.visible = false
        app.skySphereUMesh.visible=false
        app.skySphereLMesh.visible=false

        app.isSkySphereView = false

        app.arrowBigMesh.visible = false

        app.groundPlaneMesh.visible=false
    }
    else {
        ANIMATIONS.hideGroundPlane(app.groundPlaneMesh.material,() => {
                app.groundPlaneMesh.visible=false
            })
    }

    app.earthMesh.visible = true

    app.sunTrackLineGroup.visible = false
    app.arrowMesh.visible = false

    app.isGroundControlsShow = false
    app.smvDragControls.enabled = false
    app.scene.background = app.sceneBackgroundTexture
    app.ambientLight.intensity = 1.3
    app.sunLight.intensity = 0.5

    app.sunLight.children[0].visible = false

    if (app.windowIntervalHandlerNumber != -1) {
        window.clearInterval(app.windowIntervalHandlerNumber)
        app.windowIntervalHandlerNumber = -1
    }

    const cameraPositionTrack = new THREE.VectorKeyframeTrack(
        "camera.position",
        [0, 1],
        [app.camera.position.x, app.camera.position.y, app.camera.position.z,
        app.previousCameraPosition.x, app.previousCameraPosition.y, app.previousCameraPosition.z],
        THREE.InterpolateSmooth)

    const cameraQuaternionTrack = new THREE.QuaternionKeyframeTrack(
        "camera.quaternion",
        [0, 1],
        [app.camera.quaternion.x, app.camera.quaternion.y,
        app.camera.quaternion.z, app.camera.quaternion.w,
        app.previousCameraQuaternion.x, app.previousCameraQuaternion.y,
        app.previousCameraQuaternion.z, app.previousCameraQuaternion.w
        ]
    )

    const cameraClip =
        new THREE.AnimationClip("clip-camera", 1, [cameraPositionTrack, cameraQuaternionTrack])

    const mixerCamera = new THREE.AnimationMixer(app.camera)

    const cameraAction = mixerCamera.clipAction(cameraClip)

    cameraAction.loop = THREE.LoopOnce

    mixerCamera.addEventListener("finished", e => {
        e.action.stop()

        app.camera.position.set(
            app.previousCameraPosition.x,
            app.previousCameraPosition.y,
            app.previousCameraPosition.z)
        app.camera.setRotationFromQuaternion(app.previousCameraQuaternion)
        app.camera.updateProjectionMatrix()

        app.cameraOuter.position.set(
            app.previousCameraPosition.x,
            app.previousCameraPosition.y,
            app.previousCameraPosition.z)
        app.cameraOuter.setRotationFromQuaternion(app.previousCameraQuaternion)
        app.cameraOuter.zoom = app.previousCameraZoom
        app.cameraOuter.updateProjectionMatrix()

        app.isGroundView = false

        app.orbitControlsOuter.enabled = true

        app.latData.visible = true
    })

    app.mixers = [mixerCamera]

    cameraAction.play()

    ANIMATIONS.hideCompass(1, () => { app.currentHeadingRad = 0 })
}

function updateSunPosition(app,latRad, timeMinutes, solarAltituteDeg) {
    const calculatedSunPosition =
        calculateSunPosition(latRad, timeMinutes, solarAltituteDeg)

    app.sunLight.position.set(
        calculatedSunPosition[0] * sunLightDistanceScale,
        calculatedSunPosition[1] * sunLightDistanceScale,
        calculatedSunPosition[2] * sunLightDistanceScale
    )

    app.littleSunMesh.position.set(
        calculatedSunPosition[0] * sunTrackDistanceScale,
        calculatedSunPosition[1] * sunTrackDistanceScale,
        calculatedSunPosition[2] * sunTrackDistanceScale
    )

    let angleWithNormalRad = Math.acos(
        calculatedSunPosition[0] / Math.sqrt(
            calculatedSunPosition[0] ** 2
            + calculatedSunPosition[1] ** 2
            + calculatedSunPosition[2] ** 2)
    )

    let solarAltitudeAngleRad = Math.PI / 2 - angleWithNormalRad
    if (solarAltitudeAngleRad < 0) {
        solarAltitudeAngleRad = 0
    }

    app.solarAltitudeAngleDeg = toDeg(solarAltitudeAngleRad)
}

function updateSunTrackLine(app,latRad,solarAltitudeAngleDeg) {
    app.sunTrackLineGroup.children[0] = generateSunTrackLine(latRad, solarAltitudeAngleDeg, app.isSkySphereView)

    app.sunTrackLineGroup.children[0].rotation.z = app.isSkySphereView ? Math.PI / 2 : 0
}

export {
    changeToGroundView,
    switchGroundView,
    exitGroundView,
    updateSunPosition,
    updateSunTrackLine
}

