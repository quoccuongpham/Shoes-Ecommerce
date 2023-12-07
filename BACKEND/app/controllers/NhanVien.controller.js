const NhanVienService = require("../services/NhanVien.service");
const MongoDB = require("../uitls/mongodb.util");
const ApiError = require("../api-error");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
//TODO: XAC THUC
exports.login = async (req, res, next) => {
	try {
		const nhan_vien_service = new NhanVienService(MongoDB.client);
		const data = nhan_vien_service.extractData(req.body);

		if (!data.SoDienThoai || !data.Password) {
			return next(new ApiError(400, "Missing username or password"));
		}

		const document = await nhan_vien_service.findByPhone(data.SoDienThoai);
		if (await argon2.verify(document.Password, String(data.Password))) {
			const token = jwt.sign(
				{
					id: document._id.toString(),
					role: document.role,
				},
				process.env.JWT
			);
			return res.json({
				success: true,
				message: "Dang nhap thanh cong!",
				token: token,
			});
		}

		return next(new ApiError(500, "Sai so dien thoai hoac mat khau!"));
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while creating the contact")
		);
	}
};

exports.register = async (req, res, next) => {
	try {
		const nhan_vien_service = new NhanVienService(MongoDB.client);
		const data = nhan_vien_service.extractData(req.body);
		if (!data.Password || !data.HoTenNV || !data.SoDienThoai) {
			return next(new ApiError(400, "Missing data"));
		}

		// kiem tra so dien thoai
		if (
			(
				await nhan_vien_service.find({
					SoDienThoai: data.SoDienThoai,
				})
			).length > 0
		) {
			return res.json({
				success: false,
				message: "So dien thoai da dang ky",
			});
		}
		// hash mat khau
		data.Password = await argon2.hash(String(data.Password));
		const document = await nhan_vien_service.create(data);

		// tao token
		const token = jwt.sign(
			{ id: document.insertedId.toString() },
			process.env.JWT
		);
		return res.json({
			success: true,
			message: "dang ky tai khoan thanh cong",
			token: token,
		});
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while creating the contact")
		);
	}
};

//? Them nhan_vien
exports.create = async (req, res, next) => {
	try {
		const nhan_vien_service = new NhanVienService(MongoDB.client);
		const document = await nhan_vien_service.create(req.body);
		return res.json(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "An error occurred while creating the contact")
		);
	}
};

//? Lay danh sach nhan vien
exports.findAll = async (req, res, next) => {
	let document = [];
	try {
		const nhan_vien_service = new NhanVienService(MongoDB.client);
		document = await nhan_vien_service.find({});
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while retrieving contacts")
		);
	}
	return res.send(document);
};

// exports.findOne = async (req, res, next) => {
// 	try {
// 		const nhan_vien_service = new NhanVienService(MongoDB.client);
// 		const document = await nhan_vien_service.findById(req.params.id);
// 		if (!document) {
// 			return next(new ApiError(404, "Contact not found"));
// 		}
// 		return res.send(document);
// 	} catch (error) {
// 		return next(
// 			new ApiError(
// 				500,
// 				`Error retrieving contact with id=${req.params.id}`
// 			)
// 		);
// 	}
// };

// exports.update = async (req, res, next) => {
// 	if (Object.keys(req.body).length === 0) {
// 		return next(new ApiError(400, "Data to update can not be empty"));
// 	}

// 	try {
// 		const nhan_vien_service = new NhanVienService(MongoDB.client);
// 		const document = await nhan_vien_service.update(
// 			req.params.id,
// 			req.body
// 		);
// 		if (!document) {
// 			return next(new ApiError(404, "Contact not found"));
// 		}
// 		return res.send({ message: "Contact was update successfully" });
// 	} catch (error) {
// 		return next(
// 			new ApiError(500, `Error updating contact with id=${req.params.id}`)
// 		);
// 	}
// };

// exports.delete = async (req, res, next) => {
// 	try {
// 		const nhan_vien_service = new NhanVienService(MongoDB.client);
// 		const document = await nhan_vien_service.delete(req.params.id);
// 		if (!document) {
// 			return next(new ApiError(404, "Contact not found"));
// 		}
// 		return res.send({ message: "Contact was deleted successfully" });
// 	} catch (error) {
// 		return next(
// 			new ApiError(
// 				500,
// 				`Could not delete contact with id=${req.params.id}`
// 			)
// 		);
// 	}
// };

// exports.deleteAll = async (req, res, next) => {
// 	try {
// 		const nhan_vien_service = new NhanVienService(MongoDB.client);
// 		const deletedCount = await nhan_vien_service.deleteAll();
// 		return res.send({
// 			message: `${deletedCount} contacts were deleted successfully`,
// 		});
// 	} catch (error) {
// 		return next(
// 			new ApiError(500, "An error occurred while removing all contacts")
// 		);
// 	}
// };

// // find all favorite contact of a user
// exports.findAllFavorite = async (req, res, next) => {
// 	try {
// 		const nhan_vien_service = new NhanVienService(MongoDB.client);
// 		const document = await nhan_vien_service.findFavorite();
// 		return res.send(document);
// 	} catch (error) {
// 		return next(
// 			new ApiError(
// 				500,
// 				"An error occurred while retrieving favorite contacts"
// 			)
// 		);
// 	}
// };
