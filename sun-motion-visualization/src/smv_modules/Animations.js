import { gsap, Power1 } from "gsap"

function showCompass(duration = 0.5, completed = () => { }) {
    gsap.to(".div-compass-wrapper", {
        duration: duration,
        opacity: 0.95,
        ease: Power1.easeIn,
        onComplete: completed
    })
}

function hideCompass(duration = 1, completed = () => { }) {
    gsap.to(".div-compass-wrapper", {
        duration: duration,
        opacity: 0,
        ease: Power1.easeOut,
        onComplete: completed
    })
}

function showAbout() {
    gsap.to(".div-about-wrapper", {
        duration: 0.5,
        opacity: 1,
        ease: Power1.easeIn
    })
}

function hideAbout(completed = () => { }) {
    gsap.to(".div-about-wrapper", {
        duration: 0.5,
        opacity: 0,
        ease: Power1.easeOut,
        onComplete: completed
    })
}

function showGroundPlane(material) {
    gsap.to(material, {
        duration: 1,
        opacity: 1,
        ease: Power1.easeIn
    })
}

function hideGroundPlane(material, completed = () => { }) {
    gsap.to(material, {
        duration: 1,
        opacity: 0,
        ease: Power1.easeOut,
        onComplete: completed
    })
}

export {
    showCompass,
    hideCompass,
    showAbout,
    hideAbout,
    showGroundPlane,
    hideGroundPlane
}