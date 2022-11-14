function isMobilePhoneBrowser() {
    const uaLowerCase = navigator.userAgent.toLowerCase();
    return uaLowerCase.includes("android")
        || uaLowerCase.includes("harmony")
        || uaLowerCase.includes("iphone")
        || uaLowerCase.includes("mobile");
}

export { isMobilePhoneBrowser };