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
        let passwordField = await getByLabelText(document, "Passwort")
        let passwordRepeatField = await getByLabelText(document, "Passwort wiederholen")
        let weightField = await getByLabelText(document, /Gewicht/)
        let heightField = await getByLabelText(document, /Größe/)
        let birthDayField = await getByPlaceholderText(document, /Tag/)
        let birthMonthField = await getByPlaceholderText(document, /Monat/)
        let birthYearField = await getByPlaceholderText(document, /Jahr/)
        
        await firstnameField.type('hakim')
        await surnameField.type('rachidi')
        await emailField.type('hakim@example.com')
        await passwordField.type('Password')
        await passwordRepeatField.type('Password')
        await weightField.type("80")
        await heightField.type("180")
        await birthDayField.type("12")
        await birthMonthField.type("9")
        await birthYearField.type("2002")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.filled_form.png')})
        let button = await getByText(document, /Registrieren/i)

        await button.click()

        await delay(async () => {
            await page.screenshot({path: path.resolve(__dirname, '../screenshots/messaging.type.png')})
        }, 1000)
    })
})