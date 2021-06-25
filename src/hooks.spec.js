import {
    useDrinking,
    useMicturition,
    useStress,
    useUser,
    useMicturitionPredictions,
    useMessages,
    usePhotos,
    useUtterButtons
} from "./hooks"
import { renderHook } from '@testing-library/react-hooks'


describe("useDrinking hook", () => {
    let startDate = new Date()
    
    const { drinking } = renderHook(() => useDrinking(startDate))
})

describe("useMicturition hook", () => {

})

describe("useStress hook", () => {

})

describe("useUser hook", () => {

})

describe("useMicturitionPredictions hook", () => {

})

describe("useMessages hook", () => {

})

describe("usePhotos hook", () => {

})

describe("useUtterButtons hook", () => {

})

// describe("useDictation hook", () => {

// })