
export const redirect = path => {
    const { protocol, host } = window.location
    window.location.assign(`${protocol}//${host}${path}`)
}

export const shorten = (string, maxlen) => {
    if(string.length <= maxlen) {
        return string
    }
    return string?.substring(0, maxlen - 3) + "..."
}