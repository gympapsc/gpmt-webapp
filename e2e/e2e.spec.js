import { fireEvent } from '@testing-library/dom'
import 'expect-puppeteer'
import path from 'path'

import { getDocument, queries, waitFor } from 'pptr-testing-library'

const { getByText, getByPlaceholderText, getByLabelText } = queries

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
        
        let button = await getByText(document, /Anmelden/i)

        await button.click()

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.app.png')})
        }, 1200)

    })

    it('should sign up and redirect to app', async () => {
        await page.goto("http://localhost:5000/signup")

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
        let button = await getByText(document, /Registrieren/i)

        await button.click()

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.app.png')})
        }, 1000)

    })

    it("should signout", async () => {
        await page.goto("http://localhost:5000/signin")
        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /Email/)
        let passwordField = await getByPlaceholderText(document, /Passwort/)

        await emailField.type("t@t.com")
        await passwordField.type("password")

        let signinButton = await getByText(document, /Anmelden/i)
        await signinButton.click()

        await page.waitFor(1000)

        let localStorageData = await page.evaluate(() => {
            let json = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                json[key] = localStorage.getItem(key);
            }
            return json;
        });
        expect(localStorageData["auth_token"]).toBeDefined()

        document = await getDocument(page)
        let signoutButton = await getByText(document, /Abmelden/i)
        await signoutButton.click()

        await page.waitFor(1000)

        localStorageData = await page.evaluate(() => {
            let json = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                json[key] = localStorage.getItem(key);
            }
            return json;
        });
        expect(localStorageData["auth_token"]).toBeUndefined()
    })
})

describe("messaging", () => {
    it("should send message and echo back", async () => {
        await page.goto("http://localhost:5000/signup")

        let document = await getDocument(page)
        
        let firstnameField = await getByLabelText(document, /Vorname/)
        let surnameField = await getByLabelText(document, /Nachname/)
        let emailField = await getByLabelText(document, /Email/)
        let passwordField = await getByLabelText(document, /Password/)
        let passwordField = await getByLabelText(document, /Password Wiederholden/)
        let weightField = await getByLabelText(document, /weight/)
        let heightField = await getByLabelText(document, /height/)
        let birthDateField = await getByLabelText(document, /birth date/)
        
        await firstnameField.type('hakim')
        await surnameField.type('rachidi')
        await emailField.type('test@test.com')
        await passwordField.type('password')
        await weightField.type("2")
        await heightField.type("8")
        await birthDateField.type("09/12/2002")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.signup.png')})
        let button = await getByText(document, /Sign up/i)

        await button.click()

        await page.waitFor(1000)

        document = await getDocument(page)
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
        await waitFor(() => getByText(document, /bot: (.*)+/))

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.send.png')})
        }, 1000)
    })
})