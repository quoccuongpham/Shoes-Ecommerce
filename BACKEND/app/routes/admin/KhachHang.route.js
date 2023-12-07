const express = require("express");
const KhachHang = require("../../controllers/KhachHang.controller");
const checkToken = require("../../middleware/checkToken.middleware");
const validateAdmin = require("../../middleware/validateAdmin");

const router = express.Router();

router.post("/test", (req, res) => {
	console.log(req.body);
	res.json("thanh cong");
});

router
	.route("/")
	.get(checkToken, validateAdmin, KhachHang.findAll)
	.post(KhachHang.register);
// .delete(KhachHang.deleteAll);

// router.route("/favorite").get(KhachHang.findAllFavorite);

// router
// 	.route("/:id")
// 	.get(KhachHang.findOne)
// 	.put(KhachHang.update)
// 	.delete(KhachHang.delete);

module.exports = router;
