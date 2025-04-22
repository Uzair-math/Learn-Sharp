/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {}

// module.exports = 

module.exports = {
	// nextConfig,
	// webpack: (config) => {
	// 	config.resolve.alias["@"] = path.join(__dirname, "src"); // Adjust 'src' to your actual source directory
	// 	return config;
	// },
	images: {
		domains: [
			"flowbite.s3.amazonaws.com",
			"www.google.com",
			"media.licdn.com",
			"ibb.co",
			"i.ibb.co",
			"lh3.googleusercontent.com",
			"thumbs.dreamstime.com",
			"encrypted-tbn0.gstatic.com",
			"example.com",
			"avatars.githubusercontent.com",
			"mumbaimirror.indiatimes.com",
		],
	},
};
