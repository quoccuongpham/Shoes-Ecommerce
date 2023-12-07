const { ObjectId } = require("mongodb");
class NhanVienService {
	constructor(client) {
		this.NhanVien = client.db().collection("nhanvien");
	}
	// Dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
	extractData(payload) {
		const NhanVien = {
			HoTenNV: payload.HoTenNV,
			Password: payload.Password,
			ChucVu: payload.ChucVu,
			role: payload.role || "1",
			DiaChi: payload.DiaChi,
			SoDienThoai: payload.SoDienThoai,
		};
		// remove underfile fields
		Object.keys(NhanVien).forEach(
			(key) => NhanVien[key] === undefined && delete NhanVien[key]
		);
		return NhanVien;
	}

	async create(payload) {
		const contact = this.extractData(payload);
		const result = await this.NhanVien.insertOne(contact);
		return result;
	}

	async find(filter) {
		const cursor = await this.NhanVien.find(filter);
		return await cursor.toArray();
	}
	async findByPhone(SoDienThoai) {
		return await this.NhanVien.findOne({
			SoDienThoai: SoDienThoai,
		});

	}

	async findByName(name) {
		return await this.find({
			name: { $regex: new RegExp(name), $options: "i" },
		});
	}
	async findById(id) {
		return await this.NhanVien.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
	async update(id, payload) {
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		};
		const update = this.extractKhachHangData(payload);
		const result = await this.NhanVien.findOneAndUpdate(
			filter,
			{ $set: update },
			{ returnDocument: "after" }
		);
		return result;
	}
	async delete(id) {
		const result = await this.NhanVien.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
	async findFavorite() {
		return await this.find({ favorite: true });
	}
	async deleteAll() {
		const result = await this.NhanVien.deleteMany({});
		return result.deletedCount;
	}
}

module.exports = NhanVienService;
