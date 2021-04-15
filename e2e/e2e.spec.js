import { fireEvent } from '@testing-library/dom'
import 'expect-puppeteer'
import path from 'path'

import { getDocument, queries, waitFor } from 'pptr-testing-library'

const { getByText, getByPlaceholderText } = queries

const delay = (fn, ms) => new Promise((res, rej) => setTimeout(async () => res(await fn()), ms))

describe('authentication', () => {

    it('should sign in and redirect to app', async () => {
        await page.goto("http://localhost:5000/signin")
        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)

        await emailField.type("t@t.com")
        await passwordField.type("password")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.signin.png')})
        
        let button = await getByText(document, /Sign in/i)

        await button.click()

        // await waitFor(async () => {
        //     let document = await getDocument(page)
        //     getByText(document, "Hello")
        // })

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.app.png')})
        }, 1200)

    })

    it('should sign up and redirect to app', async () => {
        await page.goto("http://localhost:5000/signup")

        page.on("error", function(err) {  
            theTempValue = err.toString();
            throw new Error("Page error: " + theTempValue); 
        })

        let document = await getDocument(page)
        
        let firstnameField = await getByPlaceholderText(document, /firstname/)
        let surnameField = await getByPlaceholderText(document, /surname/)
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)
        let weightField = await getByPlaceholderText(document, /weight/)
        let heightField = await getByPlaceholderText(document, /height/)
        let birthDateField = await getByPlaceholderText(document, /birth date/)
        
        await firstnameField.type('hakim')
        await surnameField.type('rachidi')
        await emailField.type('rachidi@t.com')
        await passwordField.type('password')
        await weightField.type("2")
        await heightField.type("8")
        await birthDateField.type("09/12/2002")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.signup.png')})
        let button = await getByText(document, /Sign up/i)

        await button.click()

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.app.png')})
        }, 1000)

    })
})

describe("messaging", () => {

    beforeAll(async () => {
        await page.goto("http://localhost:5000/signin")
        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)

        await emailField.type("t@t.com")
        await passwordField.type("password")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.signin.png')})
        
        let button = await getByText(document, /Sign in/i)

        await button.click()
    })

    it("should send message and echo back", async () => {
        await page.goto("http://localhost:5000/app")
        let document = await getDocument(page)
        
        let sendButton = await getByText(document, /Send/i)
        expect(sendButton).toBeDefined()
        let messageField = await getByPlaceholderText(document, /Message/i)
        expect(messageField).toBeDefined()

        await messageField.type("Hello")
        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.type.png')})
        }, 1000)
        await sendButton.click()

        await waitFor(() => getByText(document, "user: Hello"))
        // await waitFor(() => getByText(document, "bot: Hello"))

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.send.png')})
        }, 1000)
    })

})