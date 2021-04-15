const path = require("path")

module.exports = {
    collectCoverage: true,
    coverageDirectory: path.resolve(__dirname, 'coverage'),
    setupFiles: [
        path.resolve(__dirname, './src/polyfills.js')
    ],
    moduleNameMapper: {
		"\\.(css|scss|sass)": path.resolve(__dirname, '__mocks__/style.js')
	},
	testPathIgnorePatterns: [
		'e2e'
	]
}
