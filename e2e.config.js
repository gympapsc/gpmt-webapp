const path = require("path")

module.exports = {
    preset: 'jest-puppeteer',
    setupFiles: [
        path.resolve(__dirname, './src/polyfills.js')
    ],
    testPathIgnorePatterns: [
        '<rootDir>/src'
    ],
    testMatch: [
        '<rootDir>/e2e/*.spec.js'    
    ],
    setupFilesAfterEnv: [
        '<rootDir>/e2e/e2e.setup.js'
    ]
}
