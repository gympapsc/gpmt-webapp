import { redirect } from './utils'

describe("redirect to path", () => {

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