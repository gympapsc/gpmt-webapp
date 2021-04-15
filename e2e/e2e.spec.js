import { fireEvent } from '@testing-library/dom'
import 'expect-puppeteer'
import path from 'path'

import { getDocument, queries, waitFor } from 'pptr-testing-library'

const { getByText, getByPlaceholderText } = queries

describe('e2e test', () => {
    it('should load signin page', async () => {
        await page.goto("http://localhost:5000/signin")
        let document = await getDocument(page)
        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signin.png')})
        
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)
        
        let button = await getByText(document, /Sign in/i)
    })

    it('should load signup page', async () => {
        await page.goto("http://localhost:5000/signup")

        page.on("error", function(err) {  
            theTempValue = err.toString();
            throw new Error("Page error: " + theTempValue); 
        })

        let document = await getDocument(page)
        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.png')})
        
        let firstnameField = await getByPlaceholderText(document, /firstname/)
        let surnameField = await getByPlaceholderText(document, /surname/)
        let emailField = await getByPlaceholderText(document, /email/)
        let passwordField = await getByPlaceholderText(document, /password/)
        let weightField = await getByPlaceholderText(document, /weight/)
        let heightField = await getByPlaceholderText(document, /height/)
        let birthDateField = await getByPlaceholderText(document, /birth date/)
        
        await firstnameField.type('hakim')
        await surnameField.type('rachidi')
        await emailField.type('test@t.com')
        await passwordField.type('password')
        await weightField.type("80")
        await heightField.type("170")
        await birthDateField.type("09/12/2002")

        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.png')})
        let button = await getByText(document, /Sign up/i)
        await button.click()
        
        await page.screenshot({path: path.resolve(__dirname, '../screenshots/signup.png')})

    })
})
