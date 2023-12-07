const checkToken = require("../../middleware/checkToken.middleware");
const hinhhh = require("../../controllers/HinhHH.controller");
const router = require("express").Router();

router.route("/").get(checkToken).post(checkToken);

router
	.route("/:id")
	.post(checkToken, hinhhh.multer_image_product(), hinhhh.create);

module.exports = router;
