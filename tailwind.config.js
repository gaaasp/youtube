const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Inter"', ...fontFamily.sans],
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: {
					1: "var(--accent-1)",
					2: "var(--accent-2)",
					3: "var(--accent-3)",
					4: "var(--accent-4)",
					5: "var(--accent-5)",
					6: "var(--accent-6)",
					7: "var(--accent-7)",
					8: "var(--accent-8)",
				},
				blue: "var(--blue)",
				green: "var(--green)",
				red: "var(--red)",
			},
			minHeight: { 8: "2rem", 12: "3rem" },
			minWidth: { 8: "2rem", 12: "3rem", 64: "16rem" },
		},
	},
	plugins: [],
};
