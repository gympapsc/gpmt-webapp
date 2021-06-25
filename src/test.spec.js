import api from "./api/http"

describe("test", () => {
    test("should test", async () => {
        let {data: {ok}} = await api.signinUser("testing@taylor.com", "Password")
        expect(ok).toBeTruthy()
    })
})