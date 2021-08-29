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
    getAllByText,
    findAllByText,
    getAllByTitle,
    getByText,
    queryByText,
    getByTitle
} = queries

const delay = (fn, ms) => new Promise((res, rej) => setTimeout(async () => res(await fn()), ms))

describe('user questionnaire dialog', () => {
    it('should signin and answer questions', async () => {
        await page.goto("http://localhost:5000/signin")

        let document = await getDocument(page)
        
        let emailField = await getByPlaceholderText(document, /Email/i)
        let passwordField = await getByPlaceholderText(document, /Passwort/i)


        await emailField.type("testing@taylor.com")
        await passwordField.type("Password")

        if(!fs.existsSync(path.resolve(__dirname, '../screenshots/questionnaire')))  {
            fs.mkdirSync(path.resolve(__dirname, '../screenshots/questionnaire'))
        }

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/questionnaire/signin.png')})
        
        let submit = await getByText(document, /Anmelden/i)

        await submit.click()

        await page.waitForNavigation({
            timeout: 5000
        })

        await delay(() => {}, 2000)
        
        await page.screenshot({path: path.resolve(__dirname, '../screenshots/questionnaire/app.png')})
        document = await getDocument(page)
        expect(await getAllByText(document, /Multipler Sklerose/gi)).toBeDefined()
        expect(await getAllByText(document, /Ja/gi)).toBeDefined()

        let answerButton = await queryByText(document, /Ja/gi)
        answerButton.click()

        await delay(() => {}, 2000)

        expect(await getAllByText(document, /Seit wie vielen Jahren/gi)).toBeDefined()
        let messageField = await getByPlaceholderText(document, /Nachricht/i)
        await messageField.type("Seit 2 Jahren")
        submit = await getByTitle(document, /senden/i)
        await submit.click()

        await delay(() => {}, 2000)

        expect(await getAllByText(document, /(Das war's|Alles klar)/gi)).toBeDefined()
    })
})