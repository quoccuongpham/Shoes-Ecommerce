const ApiError = require("../api-error");
function validateAdmin(req, res, next) {
	try {
		if (!req.user_info.role) {
			return next(new ApiError(400, "don't have permission"));
		}
		next();
	} catch (error) {
		return next(new ApiError(400, "don't have permission"));
	}
}

module.exports = validateAdmin;
