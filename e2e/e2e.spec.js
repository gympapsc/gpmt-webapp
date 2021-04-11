import 'expect-puppeteer'
import path from 'path'
import { getDocument, queries, waitFor } from 'pptr-testing-library'

const { getByText, getByPlaceholderText } = queries

describe('e2e test', () => {
    beforeEach(async () => {
        await page.goto("http://localhost:5000")
    })

    it('should load the page', async () => {
        let document = await getDocument(page)
        await page.screenshot({path: path.resolve(__dirname, '../results/screenshot.png')})
    })
})
