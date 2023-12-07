const router = require("express").Router()
const checkToken = require("../../middleware/checkToken.middleware");
const validateAdmin = require("../../middleware/validateAdmin");
router.get("/user", checkToken, (req, res, next) => {
    return res.json({
        success: true
    });
});
router.get("/admin", checkToken, validateAdmin, (req, res, next) => {
    return res.json({
        success: true
    });
});


module.exports = router;