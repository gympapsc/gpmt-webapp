import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"

export const redirect = path => {
    const { protocol, host } = window.location
    window.location.assign(`${protocol}//${host}${path}`)
}

export const shorten = (string, maxlen) => {
    if(!string || string.length <= maxlen) {
        return string
    }
    return string?.substring(0, maxlen - 3) + "..."
}

export const tts = async (text, config) => {
    config.speechSynthesisLanguage = "de-DE"
    config.speechSynthesisVoiceName = "de-DE-KatjaNeural"
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput()
    const speechSynthesizer = new speechsdk.SpeechSynthesizer(config, audioConfig)
    return new Promise((res, rej) => {
        speechSynthesizer.speakTextAsync(
            text,
            result => {
                synthesizer.close()
                res(result)
            },
            error => {
                synthesizer.close()
                rej(error)
            }
        )
    })
}

export const createSpeechConfig = (token, region) => {
    return speechsdk.SpeechConfig.fromAuthorizationToken(token, region)
}