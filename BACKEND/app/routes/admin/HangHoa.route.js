const checkToken = require("../../middleware/checkToken.middleware");
const hanghoa = require("../../controllers/HangHoa.controller");
const validateAdmin = require("../../middleware/validateAdmin");
const router = require("express").Router();

router
	.route("/")
	.get(checkToken, hanghoa.user_getAll)
	.post(checkToken, hanghoa.create)
	.patch(checkToken)
	.delete(checkToken, validateAdmin);

router.route("/:id").delete(checkToken, validateAdmin, hanghoa.delete);
module.exports = router;
