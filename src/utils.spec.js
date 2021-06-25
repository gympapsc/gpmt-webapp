import { redirect, shorten } from './utils'

describe("redirect to browser", () => {

    it("should redirect to /", () => {
        delete window.location
        window.location = {
            host: "localhost",
            protocol: "http:",
            href: "http://localhost/",
            assign: jest.fn()
        }
        
        redirect("/")
        expect(window.location.assign).toHaveBeenCalled()
        expect(window.location.assign).toHaveBeenCalledWith("http://localhost/")
    })

    it("should redirect to /path", () => {
        delete window.location
        window.location = {
            host: "localhost",
            protocol: "http:",
            href: "http://localhost/",
            assign: jest.fn()
        }
        
        redirect("/path")
        expect(window.location.assign).toHaveBeenCalledTimes(1)
        expect(window.location.assign).toHaveBeenCalledWith("http://localhost/path")
    })

})

describe("shorten string", () => {
    it("it should return string as is if short enough", () => {
        let string = "123456789"

        expect(shorten(string, 9)).toEqual(string)
    })

    it("it should return short string", () => {
        let string = "1234567890"

        expect(shorten(string, 9)).toEqual("123456...")
    })
})