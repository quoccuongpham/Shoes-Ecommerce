const router = require("express").Router();
const checkToken = require("../../middleware/checkToken.middleware");
const validateAdmin = require("../../middleware/validateAdmin");
const dathang = require("../../controllers/DatHang.controller");
router
	.route("/")
	.get(checkToken, validateAdmin, dathang.findAll) // lay danh sach don hang
	.post(checkToken, validateAdmin, dathang.create); // tao don hang moi

router
	.route("/:id")
	.get(checkToken, validateAdmin) // xem chi tiet don hang
	.patch(checkToken, validateAdmin, dathang.update) // cap nhat don hang
	.delete(checkToken, validateAdmin); // xoa don hang
module.exports = router;
