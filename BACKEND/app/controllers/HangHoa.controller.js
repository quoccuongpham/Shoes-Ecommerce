const ApiError = require("../api-error");
const HangHoaService = require("../services/HangHoa.service");
const HinhHHService = require("../services/HinhHH.service");
const fs = require("fs");
const path = require("path");
const MongoDB = require("../uitls/mongodb.util");

exports.create = async (req, res, next) => {
	try {
		const hang_hoa_service = new HangHoaService(MongoDB.client);
		if (await hang_hoa_service.findByName(req.body.TenHH)) {
			return next(new ApiError(400, "Hang da co san trong kho"));
		}
		const rs = await hang_hoa_service.create(req.body);
		console.log(rs);
		return res.json({
			success: true,
			message: "Them hang hoa thanh cong",
			value: rs
		});
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};
exports.delete = async (req, res, next) => {
	try {
		const hang_hoa_service = new HangHoaService(MongoDB.client);
		const hinh_hh_service = new HinhHHService(MongoDB.client);

		const hinh_hh_documents = await hinh_hh_service.find({
			MSHH: req.params.id,
		});
		hinh_hh_documents.forEach((element) => {
			fs.unlink(
				path.join("./public/products", path.basename(element.Url)),
				(err) => {
					if (err) console.log("Not found: ", element.TenHinh);
					else console.log("Deleting...", element.TenHinh);
				}
			);
		});
		await hinh_hh_service.deleteAll(req.params.id);
		const rs = await hang_hoa_service.delete(req.params.id);
		// console.log(rs);
		return res.json({
			success: true,
			message: "Xoa hang hoa thanh cong",
			value: rs
		});
	} catch (error) {}
};

// user

exports.user_getAll = async (req, res, next) => {
	try {
		const hang_hoa_service = new HangHoaService(MongoDB.client);
		const hinhhh_service = new HinhHHService(MongoDB.client);
		let dataValues = await hang_hoa_service.findAll();
		const urls = await hinhhh_service.find();

		dataValues = dataValues.map(value => {
			let id_hanghoa = value._id.toString();

			value.list_images = urls.filter(url => {
				return url.MSHH == id_hanghoa;
			})

			return value;
		})

		return res.json({
			success: true,
			dataValues,
		});
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};
exports.user_getDetail = async (req, res, next) => {
	try {
		const hang_hoa_service = new HangHoaService(MongoDB.client);
		const hinh_hh = new HinhHHService(MongoDB.client);

		let dataValues = [];
		dataValues.push(await hang_hoa_service.findById(req.params.id));

		dataValues.push(await hinh_hh.findAllByMSHHId(req.params.id));

		return res.json({
			success: true,
			dataValues,
		});
	} catch (e) {
		console.log(e);
		next(new ApiError());
	}
}