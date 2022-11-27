function getHeadingWord(currentHeadingRoundedDeg) {
    if (currentHeadingRoundedDeg == 0) {
        return "北"
    }
    else if (0 < currentHeadingRoundedDeg && currentHeadingRoundedDeg < 90) {
        return "东北"
    }
    else if (currentHeadingRoundedDeg == 90) {
        return "东"
    }
    else if (90 < currentHeadingRoundedDeg && currentHeadingRoundedDeg < 180) {
        return "东南"
    }
    else if (currentHeadingRoundedDeg == 180) {
        return "南"
    }
    else if (180 < currentHeadingRoundedDeg && currentHeadingRoundedDeg < 270) {
        return "西南"
    }
    else if (currentHeadingRoundedDeg == 270) {
        return "西"
    }
    else {
        return "西北"
    }
}

function convertToLocalTime(timeMinutes) {
    const hourDecimal = timeMinutes / 60

    const hour = parseInt(hourDecimal)
    const minute = Math.round(60 * (hourDecimal - hour))

    const minuteZeroed = minute < 10 ? `0${minute}` : `${minute}`

    return `${hour}:${minuteZeroed}`
}

export{getHeadingWord,convertToLocalTime}