const { ObjectId } = require("mongodb");

class DatHangService {
	constructor(client) {
		this.DatHang = client.db().collection("dathang");
		this.TrangThai = {
			1: "Đang chờ phê duyệt",
			2: "Đang giao hàng",
			3: "Giao thành công"
		}
	}
	extractData(payload) {
		const DatHang = {
			SoDonDH: payload.SoDonDH,
			MSKH: payload.MSKH,
			MSNV: payload.MSNV,
			NgayDH: payload.NgayDH || new Date(),
			NgayGH: payload.NgayGH,
			TrangThaiDH: this.TrangThai[payload.TrangThaiDH],
		};
		// remove underfile fields
		Object.keys(DatHang).forEach(
			(key) => DatHang[key] === undefined && delete DatHang[key]
		);
		if (DatHang.NgayGH) {
			DatHang.NgayGH = new Date(DatHang.NgayGH);
		}
		return DatHang;
	}
	async find(filter) {
		try {
			const cursor = await this.DatHang.find(filter);
			return await cursor.toArray();
		} catch (error) {
			return null;
		}
	}
	async create(data) {
		const result = this.DatHang.insertOne(this.extractData(data));
		return result;
	}

	async update(id, payload) {
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		};
		const update = this.extractData(payload);
		const result = await this.DatHang.findOneAndUpdate(
			filter,
			{ $set: update },
			{ returnDocument: "after" }
		);
		return result;
	}
	async delete(id) {
		const result = await this.DatHang.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
	async deleteAll(id) {
		const result = await this.DatHang.deleteMany({
			MSHH: id,
		});
		return result;
	}
}

module.exports = DatHangService;
