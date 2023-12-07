const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
function checkToken(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		req.user_info = jwt.verify(token, process.env.JWT);
		next();
	} catch (error) {
		return next(new ApiError(400, "invalid token"));
	}
}

module.exports = checkToken;
