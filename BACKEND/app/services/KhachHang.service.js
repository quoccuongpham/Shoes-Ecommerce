const { ObjectId } = require("mongodb");
class KhachHangService {
	constructor(client) {
		this.KhachHang = client.db().collection("khachhang");
	}
	// Dinh nghia cac phuong thuc truy xuat csdl su dung mongodb api
	extractKhachHangData(payload) {
		const KhachHang = {
			HoTenKH: payload.HoTenKH,
			Password: payload.Password,
			DiaChi: payload.DiaChi,
			SoDienThoai: payload.SoDienThoai,
		};
		// remove underfile fields
		Object.keys(KhachHang).forEach(
			(key) => KhachHang[key] === undefined && delete KhachHang[key]
		);
		return KhachHang;
	}

	async create(payload) {
		const contact = this.extractKhachHangData(payload);
		const result = await this.KhachHang.insertOne(contact);
		return result;
	}

	async find(filter) {
		const cursor = await this.KhachHang.find(filter);
		return await cursor.toArray();
	}

	async findByPhone(SoDienThoai) {
		try {
			return await this.KhachHang.findOne({
				SoDienThoai: SoDienThoai,
			});
		} catch (error) {
			return null;
		}
	}

	async findByName(name) {
		return await this.find({
			name: { $regex: new RegExp(name), $options: "i" },
		});
	}
	async findById(id) {
		return await this.KhachHang.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
	async update(id, payload) {
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		};
		const update = this.extractKhachHangData(payload);
		const result = await this.KhachHang.findOneAndUpdate(
			filter,
			{ $set: update },
			{ returnDocument: "after" }
		);
		return result;
	}
	async delete(id) {
		const result = await this.KhachHang.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
	async findFavorite() {
		return await this.find({ favorite: true });
	}
	async deleteAll() {
		const result = await this.KhachHang.deleteMany({});
		return result.deletedCount;
	}
}

module.exports = KhachHangService;
