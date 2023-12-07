const ApiError = require("../api-error");
const HangHoaService = require("../services/HangHoa.service");
const DatHangService = require("../services/DatHang.service");
const ChiTietDatHangService = require("../services/ChiTietDatHang.service");
const MongoDB = require("../uitls/mongodb.util");
exports.create = async (req, res, next) => {
	try {
		// Kiem tra so luong hang
		const hanghoa_service = new HangHoaService(MongoDB.client);
		const check_hanghoa = await hanghoa_service.findById(req.body.MSHH);

		if (check_hanghoa.SoLuongHang < req.body.SoLuong) {
			return res.json({
				success: false,
				message: "Không đủ hàng trong kho"
			})
		}
		// Tao don dat hang => so don
		const dathang_service = new DatHangService(MongoDB.client);
		const info_dathang = await dathang_service.create({...req.body, TrangThaiDH : 2, MSNV: req.user_info.id});
		const MSDH = info_dathang.insertedId.toString();

		// console.log(req.user_info.id);

		// Tao chi tiet dat hang
		const chitietdathang_service = new ChiTietDatHangService(MongoDB.client);
		const info_chitietdathang = await chitietdathang_service.create({...req.body, SoDonDH: MSDH});
		console.log(info_chitietdathang);

		// Tru di so luong trong kho
		const update_soluong = await hanghoa_service.update(check_hanghoa._id, {SoLuongHang: check_hanghoa.SoLuongHang - req.body.SoLuong});
		console.log(update_soluong);
		// console.log(req.body);
		return res.json({
			success: true,
			message: "Tao don hang thanh cong",
		});
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};

exports.findAll = async (req, res, next) => {
	try {
		const dathang_service = new DatHangService(MongoDB.client);
		const chitietdathang_service = new ChiTietDatHangService(MongoDB.client);

		const rs_dathang = await dathang_service.find();

		console.log(rs_dathang)

		return res.json(rs_dathang);
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};

exports.update = async (req, res, next) => {
	try {
		console.log(req.user_info.id);
		console.log(req.params.id);
		console.log(req.body);
		const dathang_service = new DatHangService(MongoDB.client);
		const value = await dathang_service.update(req.params.id, {
			...req.body,
			MSNV: req.user_info.id
		})
		return res.json(value);
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
};

exports.userFindAll = async (req, res, next) => {
	try {
		const dathang_service = new DatHangService(MongoDB.client);
		const chitietdathang_service = new ChiTietDatHangService(MongoDB.client);

		const rs_dathang = await dathang_service.find({MSKH: req.user_info.id});

		console.log(rs_dathang)

		return res.json(rs_dathang);
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
}

exports.userCreate = async (req, res, next) => {
	try {
		// Kiem tra so luong hang
		const hanghoa_service = new HangHoaService(MongoDB.client);
		const check_hanghoa = await hanghoa_service.findById(req.body.MSHH);

		if (check_hanghoa.SoLuongHang < req.body.SoLuong) {
			return res.json({
				success: false,
				message: "Không đủ hàng trong kho"
			})
		}
		// Tao don dat hang => so don
		const dathang_service = new DatHangService(MongoDB.client);
		const info_dathang = await dathang_service.create({...req.body, TrangThaiDH : 1, MSKH: req.user_info.id});
		const MSDH = info_dathang.insertedId.toString();

		// console.log(req.user_info.id);

		// Tao chi tiet dat hang
		const chitietdathang_service = new ChiTietDatHangService(MongoDB.client);
		const info_chitietdathang = await chitietdathang_service.create({...req.body, SoDonDH: MSDH, GiaDatHang: check_hanghoa.Gia});
		console.log(info_chitietdathang);

		// Tru di so luong trong kho
		const update_soluong = await hanghoa_service.update(check_hanghoa._id, {SoLuongHang: check_hanghoa.SoLuongHang - req.body.SoLuong});
		console.log(update_soluong);
		// console.log(req.body);
		return res.json({
			success: true,
			message: "Tao don hang thanh cong",
		});
	} catch (error) {
		console.log(error);
		return next(new ApiError());
	}
}