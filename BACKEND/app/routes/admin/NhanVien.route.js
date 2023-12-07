const express = require("express");
const NhanVien = require("../../controllers/NhanVien.controller");
const checkToken = require("../../middleware/checkToken.middleware");
const router = express.Router();

router.get("/test", checkToken, (req, res) => {
	console.log(req.user_info);
	res.json("thanh cong");
});
router.route("/").get(checkToken, NhanVien.findAll);
router.post("/dangky", NhanVien.register);
router.post("/dangnhap", NhanVien.login);

// router.route("/").get(NhanVien.findAll).post(NhanVien.create);
// .delete(NhanVien.deleteAll);

// router.route("/favorite").get(NhanVien.findAllFavorite);

// router
// 	.route("/:id")
// 	.get(NhanVien.findOne)
// 	.put(NhanVien.update)
// 	.delete(NhanVien.delete);

module.exports = router;
