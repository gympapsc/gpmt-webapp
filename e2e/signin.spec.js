import "expect-puppeteer"
import fs from "fs"
import path from "path"
import { 
    getDocument, 
    queries, 
    waitFor 
} from 'pptr-testing-library'

const { 
    getByDisplayValue, 
    getByPlaceholderText, 
    getByLabelText,
    getByText,
    findAllByText,
} = queries

const delay = (fn, ms) => new Promise((res, rej) => setTimeout(async () => res(await fn()), ms))

describe('user sign in', () => {
    it('should sign in and redirect to app', async () => {
        await page.goto("http://localhost:5000/signin")
        await page.setViewport({ width: 1200, height: 800});

        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /Email/i)
        let passwordField = await getByPlaceholderText(document, /Passwort/i)


        await emailField.type("testing@taylor.com")
        await passwordField.type("Password")

        if(!fs.existsSync(path.resolve(__dirname, '../screenshots/signin')))  {
            fs.mkdirSync(path.resolve(__dirname, '../screenshots/signin'))
        }

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin/signin.png')})
        
        let button = await getByText(document, /Anmelden/i)

        await button.click()

        await page.waitForNavigation({
            timeout: 10000
        })
        
        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin/app.png')})
    })
})