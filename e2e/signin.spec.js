import 'expect-puppeteer'
import path from 'path'
import { 
    getDocument, 
    queries, 
    waitFor 
} from 'pptr-testing-library'

const { 
    getByText, 
    getByPlaceholderText, 
    getByLabelText 
} = queries

const delay = (fn, ms) => new Promise((res, rej) => setTimeout(async () => res(await fn()), ms))

beforeAll(() => {
    // TODO mock user in database
})

describe('user sign in', () => {
    it('should sign in and redirect to app', async () => {
        await page.goto("http://localhost:5000/signin")
        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)

        await emailField.type("t@t.com")
        await passwordField.type("password")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.signin.png')})
        
        let button = await getByText(document, /Anmelden/i)

        await button.click()

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.app.png')})
        }, 1200)
    })
})