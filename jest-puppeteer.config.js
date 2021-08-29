module.exports = {
	launch: {
		headless: true,
		slowMo: 10,
		devtools: false,
		args: [
			"--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure"
		]
	},
	server: {
    	command: 'npm run dev',
		port: 5000
    },
} 
