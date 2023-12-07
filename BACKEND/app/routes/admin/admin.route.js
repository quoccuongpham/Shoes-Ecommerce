const KhachHang = require("./KhachHang.route");
const NhanVien = require("./NhanVien.route");
const HangHoa = require("./HangHoa.route");
const HinhHH = require("./HinhHH.route");
const DatHang = require("./DatHang.route");
const router = require("express").Router();

router.use("/khachhang", KhachHang);
router.use("/nhanvien", NhanVien);
router.use("/hanghoa", HangHoa);
router.use("/hinhhanghoa", HinhHH);
router.use("/dathang", DatHang);


module.exports = router;
