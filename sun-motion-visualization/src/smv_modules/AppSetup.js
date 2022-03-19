import * as $ from "jquery"
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare"

import { earthRadius, skySphereRadius, modelPath,cameraOuterHorizontalSize, textureRepeatCount } from "./AppConstants"
import { generateLatData } from "./ObjectGenerators"
import { SMVDragControls } from "./DragControls"
import { toDeg, updateSprites } from "./GeoMath"
import { changeToGroundView } from "./SceneControl"

function initWebGLData(app) {
    // WebGL Data should not be placed in data() section. this will cause errors
    app.canvasWidth = 0
    app.canvasHeight = 0

    app.scene = undefined

    app.camera = undefined

    app.cameraOuter = undefined

    app.renderer = undefined

    app.sceneBackgroundTexture = undefined

    app.earthMesh = undefined

    app.ambientLight = undefined

    app.sunLight = undefined

    app.latData = undefined

    app.skyCircleLine = undefined
    app.skySphereUMesh = undefined
    app.skySphereLMesh = undefined

    app.groundPlaneMesh = undefined
    // use a group which permanently exists in scene to make track updates possible
    app.sunTrackLineGroup = undefined

    app.arrowMesh = undefined
    app.arrowBigMesh = undefined

    app.orbitControlsOuter = undefined

    app.smvDragControls = undefined

    app.rayCaster = undefined
    app.mousePointer = undefined

    app.clock = undefined

    app.mixers = undefined

    // camera state data before ground view
    app.previousCameraZoom = undefined
    app.previousCameraPosition = undefined
    app.previousCameraQuaternion = undefined

    // Interaction data
    app.isMouseOnEarth = false
}

function setUpWebGL(app) {
    ///////////////////////// Basic Setup /////////////////////////
    app.canvasWidth = window.innerWidth
    app.canvasHeight = window.innerHeight

    app.scene = new THREE.Scene()

    app.camera = new THREE.PerspectiveCamera(60, app.canvasWidth / app.canvasHeight, 0.01, 10000)

    app.cameraOuter = new THREE.OrthographicCamera(
        -cameraOuterHorizontalSize,
        cameraOuterHorizontalSize,
        cameraOuterHorizontalSize * app.canvasHeight / app.canvasWidth,
        -cameraOuterHorizontalSize * app.canvasHeight / app.canvasWidth,
        0.1,
        10000)


    app.renderer = new THREE.WebGLRenderer({ alpha: true })

    const textureLoader = new THREE.TextureLoader()

    app.sceneBackgroundTexture = textureLoader.load(modelPath + "starry.png")

    app.scene.background = app.sceneBackgroundTexture

    app.camera.name = "camera"
    app.camera.position.set(218, 0, -83)
    app.camera.lookAt(0, 0, 0)


    app.cameraOuter.position.set(218, 0, -83)
    app.cameraOuter.lookAt(0, 0, 0)


    app.renderer.setSize(app.canvasWidth, app.canvasHeight)

    $("body").append(app.renderer.domElement)

    ///////////////////////// Model Loading /////////////////////////

    // Earth
    const loader = new FBXLoader()
    loader.load(modelPath + "earth.fbx", obj => {
        app.earthMesh = obj

        obj.children[0].material.shininess = 80

        app.scene.add(obj)
    })

    // Arrows
    loader.load(modelPath + "arrow.fbx", obj => {
        app.arrowMesh = obj
        obj.visible = false
        app.scene.add(obj)
    })

    loader.load(modelPath + "arrow_big.fbx", obj => {
        app.arrowBigMesh = obj
        app.arrowBigMesh.position.set(0, 0, 0)
        app.arrowBigMesh.rotation.z = Math.PI / 2
        obj.visible = false
        app.scene.add(obj)
    })

    // Ground Plane
    const groundPlaneGeometry = new THREE.CircleGeometry(skySphereRadius, 100)

    const detailTexture = textureLoader.load(modelPath + "detail.bmp")
    detailTexture.wrapS = THREE.RepeatWrapping
    detailTexture.wrapT = THREE.RepeatWrapping
    detailTexture.repeat.set(textureRepeatCount, textureRepeatCount)
    const detailBumpTexture = textureLoader.load(modelPath + "detailb.bmp")
    detailBumpTexture.wrapS = THREE.RepeatWrapping
    detailBumpTexture.wrapT = THREE.RepeatWrapping
    detailBumpTexture.repeat.set(textureRepeatCount, textureRepeatCount)
    const groundMaterial = new THREE.MeshStandardMaterial({
        map: detailTexture,
        bumpMap: detailBumpTexture,
        side: THREE.DoubleSide
    })
    groundMaterial.transparent = true
    groundMaterial.opacity = 0

    app.groundPlaneMesh = new THREE.Mesh(groundPlaneGeometry, groundMaterial)
    app.groundPlaneMesh.position.set(0, 0, 0)
    app.groundPlaneMesh.rotation.x = Math.PI / 2
    app.groundPlaneMesh.rotation.y = -Math.PI / 2
    app.groundPlaneMesh.visible = false
    app.scene.add(app.groundPlaneMesh)

    // Little Sun (for skySphereView)
    const littleSunGeometry = new THREE.SphereGeometry(5, 10, 10)
    const littleSunMaterial = new THREE.MeshBasicMaterial({ color: 0xf0e68c })
    app.littleSunMesh = new THREE.Mesh(littleSunGeometry, littleSunMaterial)
    app.littleSunMesh.visible = false
    app.scene.add(app.littleSunMesh)

    // Sky Circle and Sky Sphere
    const skyCircleCurve = new THREE.EllipseCurve(0, 0, skySphereRadius, skySphereRadius)
    const skyCircleGeometry = new THREE.BufferGeometry().setFromPoints(skyCircleCurve.getPoints(100))
    const skyCircleMaterial = new THREE.LineDashedMaterial({
        color: 0xff8c00,
        dashSize: 6,
        gapSize: 4,
        transparent: true,
        opacity:0.6
    })

    app.skyCircleLine = new THREE.Line(skyCircleGeometry, skyCircleMaterial).computeLineDistances()
    app.skyCircleLine.rotation.x = Math.PI / 2
    app.skyCircleLine.visible = false
    
    // current design is not to show this
    //app.scene.add(app.skyCircleLine)

    const skySphereUGeometry = new THREE.SphereGeometry(
        skySphereRadius,
        100, 100,
        0, 2*Math.PI,
        0, Math.PI / 2
    )

    const skySphereLGeometry = new THREE.SphereGeometry(
        skySphereRadius,
        100, 100,
        0, 2*Math.PI,
        0, Math.PI / 2
    )

    const skySphereUMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e90ff,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
    })
    const skySphereLMaterial = new THREE.MeshBasicMaterial({
        color: 0x808080,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
    })

    app.skySphereUMesh = new THREE.Mesh(skySphereUGeometry, skySphereUMaterial)
    app.skySphereLMesh = new THREE.Mesh(skySphereLGeometry, skySphereLMaterial)

    app.skySphereUMesh.rotation.z = -Math.PI / 2
    app.skySphereLMesh.rotation.z = Math.PI / 2

    app.skySphereUMesh.visible = false
    app.skySphereLMesh.visible = false

    app.scene.add(app.skySphereUMesh, app.skySphereLMesh)

    ///////////////////////// GeoElements Loading /////////////////////////

    app.latData = generateLatData(100)

    updateSprites(app.cameraOuter, app.latData.children[1].children)

    app.scene.add(app.latData)

    app.sunTrackLineGroup = new THREE.Group()
    app.scene.add(app.sunTrackLineGroup)
    //app.scene.add(new THREE.AxesHelper(200))

    ///////////////////////// Light&Lensflare Setup /////////////////////////

    app.ambientLight = new THREE.AmbientLight(0xffffff, 1.3)

    app.sunLight = new THREE.DirectionalLight(0xffffff, 0.5)
    app.sunLight.position.set(150, 180, 0)

    const textureFlare0 = textureLoader.load(modelPath + "lf0.png")
    const textureFlare3 = textureLoader.load(modelPath + "lf1.png")

    const lensflare = new Lensflare()
    lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, app.sunLight.color))
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7))
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9))
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1))
    app.sunLight.add(lensflare)

    app.sunLight.children[0].visible = false

    app.scene.add(app.ambientLight)
    app.scene.add(app.sunLight)

    ///////////////////////// Control Setup /////////////////////////

    app.orbitControlsOuter = new OrbitControls(app.cameraOuter, app.renderer.domElement)
    app.orbitControlsOuter.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    app.orbitControlsOuter.dampingFactor = 0.05
    app.orbitControlsOuter.minZoom = 0.7350918906249998
    app.orbitControlsOuter.maxZoom = 4.658990676380596

    app.smvDragControls = new SMVDragControls(app.camera, app.renderer.domElement)
    app.smvDragControls.enabled = false
    app.smvDragControls.onHeadingChange = headingRad => {
        app.currentHeadingRad = headingRad
    }

    ///////////////////////// Utility Setup /////////////////////////

    app.rayCaster = new THREE.Raycaster()
    app.mousePointer = new THREE.Vector2()

    app.mixers = []

    app.clock = new THREE.Clock()

    ///////////////////////// Animation Render Setup /////////////////////////

    const animate = () => {
        requestAnimationFrame(animate)

        if (!app.isGroundView || app.isSkySphereView) {
            app.orbitControlsOuter.update()
        }

        const delta = app.clock.getDelta()

        for (let i of app.mixers) {
            i.update(delta)
        }

        app.renderer.render(app.scene, !app.isGroundView || app.isSkySphereView ? app.cameraOuter : app.camera)

    }

    animate()

    ///////////////////////// Event Setup /////////////////////////

    window.onresize = () => {
        app.canvasWidth = window.innerWidth
        app.canvasHeight = window.innerHeight

        app.renderer.setSize(app.canvasWidth, app.canvasHeight)
        app.camera.aspect = app.canvasWidth / app.canvasHeight
        app.camera.updateProjectionMatrix()

        app.cameraOuter.top = cameraOuterHorizontalSize * app.canvasHeight / app.canvasWidth
        app.cameraOuter.bottom = -cameraOuterHorizontalSize * app.canvasHeight / app.canvasWidth
        app.cameraOuter.updateProjectionMatrix()
    }

    window.onmousemove = (e) => {
        // do not pick up lat when in ground view, including animation
        if (app.isGroundView) {
            return
        }

        app.mousePointer.x = (e.clientX / window.innerWidth) * 2 - 1
        app.mousePointer.y = - (e.clientY / window.innerHeight) * 2 + 1

        app.rayCaster.setFromCamera(app.mousePointer, app.cameraOuter)

        if (app.earthMesh) {
            const intersects = app.rayCaster.intersectObjects(app.earthMesh.children, false)
            if (intersects.length > 0) {
                let latRad = Math.asin(intersects[0].point.y / earthRadius)

                app.latDegFixed1 = parseFloat(toDeg(latRad).toFixed(1))

                // overwrite the fixed value updated by the watch function with the precise value
                app.latRad = latRad

                app.isMouseOnEarth = true
            }
            else {
                app.isMouseOnEarth = false
            }
        }
    }

    window.ondblclick = () => {
        if (app.isMouseOnEarth) {
            changeToGroundView(app)
        }
    }

    app.orbitControlsOuter.addEventListener("change", () => {
        if (!app.isGroundView) {
            updateSprites(app.cameraOuter, app.latData.children[1].children)
        }

        if (app.isSkySphereView) {
            let angleRad =
                Math.acos(
                    -app.cameraOuter.position.x
                    / Math.sqrt(
                        app.cameraOuter.position.x ** 2
                        + app.cameraOuter.position.z ** 2))

            app.currentHeadingRad =
                app.cameraOuter.position.z > 0 ? (Math.PI - angleRad) : (Math.PI + angleRad)
        }
    })
}

export {initWebGLData,setUpWebGL}