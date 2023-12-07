const router = require("express").Router();
const khachhang = require("../../controllers/KhachHang.controller");
const checkToken = require("../../middleware/checkToken.middleware");
router.route("/").get(checkToken, (req, res) => {
	console.log(req.user_info);
	res.json("user info");
});

router.route("/auth/dangnhap").post(khachhang.login);
router.route("/auth/dangky").post(khachhang.register);

module.exports = router;
