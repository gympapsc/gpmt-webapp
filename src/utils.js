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
                speechSynthesizer.close()
                res(result)
            },
            error => {
                speechSynthesizer.close()
                rej(error)
            }
        )
    })
}

export const stt = (audioConfig, speechConfig, recog, res) => {
    if(typeof window !== "undefined" && speechConfig) {
        console.log(speechConfig, audioConfig)
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

        recognizer.startContinuousRecognitionAsync(() => {
            recog("")
        })

        recognizer.recognizing = (sender, event) => {
            recog(event.result.text)
        }

        recognizer.recognized = (sender, event) => {
            if(event.result.text) {
                res(event.result.text)
            }
            recog("")
            recognizer.stopContinuousRecognitionAsync()
        }
    }
}


export const createSpeechConfig = (token, region) => {
    return speechsdk.SpeechConfig.fromAuthorizationToken(token, region)
}

export const delay = (ms) => new Promise((res, rej) => setTimeout(() => res(), ms))
