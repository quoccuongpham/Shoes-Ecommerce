const router = require("express").Router();
const checkToken = require("../../middleware/checkToken.middleware");

const dathang = require("../../controllers/DatHang.controller");
router
    .route("/")
    .get(checkToken, dathang.userFindAll) // lay danh sach don hang
    .post(checkToken, dathang.userCreate); // tao don hang moi


module.exports = router;
