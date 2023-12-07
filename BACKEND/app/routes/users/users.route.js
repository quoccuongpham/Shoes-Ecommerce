const router = require("express").Router();
const khachhang = require("./KhachHang.route");
const hanghoa = require("./HangHoa.route");
const dathang = require("./DatHang.route");

router.use("/khachhang", khachhang);
router.use("/hanghoa", hanghoa);
router.use("/dathang", dathang);

module.exports = router;
