import 'expect-puppeteer'
import fs from "fs"
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
    it("should sign up and redirect to setup", async () => {
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
        
        await firstnameField.type('testing')
        await surnameField.type('bob')
        await emailField.type(`test@${Math.round(Math.random() * 100)}.org`)
        await passwordField.type('Password')
        await passwordRepeatField.type('Password')
        await weightField.type("80")
        await heightField.type("180")
        await birthDayField.type("12")
        await birthMonthField.type("9")
        await birthYearField.type("2002")

        if(!fs.existsSync(path.resolve(__dirname, '../screenshots/signup')))  {
            fs.mkdirSync(path.resolve(__dirname, '../screenshots/signup'))
        }

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup/signup.png')})
        let submit = await getByText(document, /Registrieren/i)

        await submit.click()

        await page.waitForNavigation({
            timeout: 10000
        })

        await page.screenshot({ path: path.resolve(__dirname, "../screenshots/signup/setup.about.png")})

        document = await getDocument(page)
        submit = await getByText(document, /Weiter/i)
        await submit.click()

        await page.waitForNavigation({
            timeout: 10000
        })

        await page.screenshot({ path: path.resolve(__dirname, "../screenshots/signup/setup.audio.png")})
        document = await getDocument(page)
        submit = await getByText(document, /Weiter/i)
        await submit.click()

        await page.waitForNavigation({
            timeout: 10000
        })

        await page.screenshot({ path: path.resolve(__dirname, "../screenshots/signup/app.png")})


    })
})