const fs = require("fs");
const path = require("path");

function deleteFile(path) {
	try {
		const rs = fs.unlink(path, (err) => {
			throw err;
		});
		console.log(rs);
	} catch (error) {
		console.log(error);
	}
}
