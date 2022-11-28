class SMVDragControls {
    constructor(camera, domElement) {

        this.moveScale = 1

        this.enabled = true

        this.fovScale = 1

        this.maxFov = 80
        this.minFov = 50

        this.onHeadingChange = undefined

        this._isMouseDown = false

        domElement.addEventListener("wheel", e => {
            if (!this.enabled) {
                return
            }

            if (e.deltaY > 0) {
                if (camera.fov + 5 * this.fovScale > this.maxFov) {
                    camera.fov = this.maxFov
                }
                else {
                    camera.fov += 5 * this.fovScale
                }
            }
            else if (e.deltaY < 0) {
                if (camera.fov - 5 * this.fovScale < this.minFov) {
                    camera.fov = this.minFov
                }
                else {
                    camera.fov -= 5 * this.fovScale
                }
            }

            camera.updateProjectionMatrix()
        })

        domElement.addEventListener("pointerdown", () => {
            this._isMouseDown = true
        })

        domElement.addEventListener("pointerup", () => {
            this._isMouseDown = false
        })

        domElement.addEventListener("pointermove", e => {
            if (!this.enabled) {
                return
            }

            if (this._isMouseDown) {
                const scaledMoveX = e.movementX * this.moveScale * 0.01
                // rotation.x limited within [0,2Pi)
                if (camera.rotation.x - scaledMoveX < 0) {
                    camera.rotation.x = Math.PI * 2 + camera.rotation.x - scaledMoveX
                }
                else if (camera.rotation.x - scaledMoveX >= Math.PI * 2) {
                    camera.rotation.x = camera.rotation.x - scaledMoveX - Math.PI * 2
                }
                else {
                    camera.rotation.x -= scaledMoveX
                }

                //console.log(camera.rotation.x)

                const halfPi = Math.PI / 2

                const scaledMoveY = e.movementY * this.moveScale * 0.01
                // rotation.y limited within [-Pi/2,Pi/2]
                if (camera.rotation.y + scaledMoveY > halfPi) {
                    camera.rotation.y = halfPi
                }
                else if (camera.rotation.y + scaledMoveY < -halfPi) {
                    camera.rotation.y = -halfPi
                }
                else {
                    camera.rotation.y += scaledMoveY
                }

                if (this.onHeadingChange) {
                    let correctedHeadingRad = -camera.rotation.x + 2.5 * Math.PI
                    if (correctedHeadingRad >= Math.PI * 2) {
                        correctedHeadingRad -= Math.PI * 2
                    }
                    this.onHeadingChange(correctedHeadingRad)
                }
            }
        })
    }
}

export { SMVDragControls }