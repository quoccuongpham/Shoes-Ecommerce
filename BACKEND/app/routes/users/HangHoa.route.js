const router = require("express").Router();
const hanghoa = require("../../controllers/HangHoa.controller");
const checkToken = require("../../middleware/checkToken.middleware");

router.route("/").get(hanghoa.user_getAll);

router.route("/:id").get(hanghoa.user_getDetail);

module.exports = router;
