const withPreact = require("next-plugin-preact");

module.exports = withPreact({
	images: {
		domains: [
			"i.ytimg.com",
			"i1.ytimg.com",
			"i2.ytimg.com",
			"i3.ytimg.com",
			"i4.ytimg.com",
			"yt.ggpht.com",
			"yt1.ggpht.com",
			"yt2.ggpht.com",
			"yt3.ggpht.com",
			"yt4.ggpht.com",
		],
		loader: "custom",
	},
});
