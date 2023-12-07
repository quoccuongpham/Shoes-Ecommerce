const multer = require("multer");
const config = require("../config");
const HinhHHService = require("../services/HinhHH.service");
const ApiError = require("../api-error");
const MongoDB = require("../uitls/mongodb.util");
exports.findAll = async () => {
	//
};

exports.create = async (req, res, next) => {
	try {
		const schema = (TenHinh, Url, MSHH) => {
			return {
				TenHinh,
				Url,
				MSHH,
			};
		};
		const documents = req.files.map((file) => {
			return schema(
				file.originalname,
				`${process.env.HOST}\\${file.path}`,
				req.params.id
			);
		});
		const hinhhh_service = new HinhHHService(MongoDB.client);
		const rs = await hinhhh_service.create(documents);
		return res.json({
			success: true,
			message: "Upload anh thanh cong",
			value: rs
		});
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};

exports.multer_image_product = function () {
	const storage_image_product = multer.diskStorage(
		config.file_upload.product_image
	);
	const upload_image_product = multer({ storage: storage_image_product });

	return upload_image_product.array("image_products");
};
