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

describe("user sign up", () => {
    it("should sign up and redirect to `/app`", async () => {
        await page.goto("http://localhost:5000/signup")

        let document = await getDocument(page)
        
        let firstnameField = await getByLabelText(document, /Vorname/)
        let surnameField = await getByLabelText(document, /Nachname/)
        let emailField = await getByLabelText(document, /Email/)
        let passwordField = await getByLabelText(document, /Password/)
        let passwordRepeatField = await getByLabelText(document, /Password Wiederholden/)
        let weightField = await getByLabelText(document, /Gewicht/)
        let heightField = await getByLabelText(document, /Größe/)
        let birthDayField = await getByLabelText(document, /Geburtstag/)
        let birthMonthField = await getByLabelText(document, /Geburtsmonat/)
        let birthYearField = await getByLabelText(document, /Geburtsjahr/)
        
        await firstnameField.type('hakim')
        await surnameField.type('rachidi')
        await emailField.type('hakim@example.com')
        await passwordField.type('password')
        await passwordRepeatField.type('password')
        await weightField.type("2")
        await heightField.type("8")
        await birthDayField.type("12")
        await birthMonthField.type("9")
        await birthYearField.type("2002")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.filled_form.png')})
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

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.send.png')})
        }, 1000)
    })
})