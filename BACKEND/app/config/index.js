const config = {
	app: {
		port: process.env.PORT || 3000,
	},
	db: {
		uri: process.env.MONGODB_URI || "mongodb://localhost:27017/myshop",
	},
	file_upload: {
		product_image: {
			destination: (req, file, cb) => {
				cb(null, "./public/products");
			},
			filename: (req, file, cb) => {
				cb(
					null,
					Date.now() +
						"-" +
						req.params.id +
						"-" +
						file.originalname.split(" ").join("")
				);
			},
		},
	},
};

module.exports = config;
