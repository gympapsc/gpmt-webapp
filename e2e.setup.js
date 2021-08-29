import fs from "fs"
import path from "path"

jest.setTimeout(150000)

beforeEach(async () => {
    await page.setViewport({ width: 1000, height: 1000});
})

beforeAll(() => {
    if(!fs.existsSync(path.resolve(__dirname, "./screenshots")))  {
        fs.mkdirSync(path.resolve(__dirname, "./screenshots"))
    }
})
