const path = require("path")

module.exports = {
    collectCoverage: true,
    coverageDirectory: path.resolve(__dirname, 'coverage'),
    setupFiles: [
        path.resolve(__dirname, './src/polyfills.js'),
        "dotenv/config"
    ],
    moduleNameMapper: {
		"\\.(css|scss|sass)": path.resolve(__dirname, '__mocks__/style.js')
	},
	testPathIgnorePatterns: [
		'e2e'
	],
    setupFilesAfterEnv: [
        path.resolve(__dirname, './unit.setup.js')
    ]
}
