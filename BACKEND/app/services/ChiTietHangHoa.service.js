const { ObjectId } = require("mongodb");

class ChiTietDatHangService {
	constructor(client) {
		this.ChiTietDatHang = client.db().collection("chitietdathang");
	}
	extractData(payload) {
		const ChiTietDatHang = {
			SoDonDH: payload.SoDonDH,
			MSKH: payload.MSKH,
			MSNV: payload.MSNV,
			NgayDH: payload.NgayDH,
			NgayGH: payload.NgayGH,
			TrangThaiDH: payload.TrangThaiDH,
		};
		// remove underfile fields
		Object.keys(ChiTietDatHang).forEach(
			(key) =>
				ChiTietDatHang[key] === undefined && delete ChiTietDatHang[key]
		);
		return ChiTietDatHang;
	}
	async find(filter) {
		try {
			const cursor = await this.ChiTietDatHang.find(filter);
			return await cursor.toArray();
		} catch (error) {
			return null;
		}
	}
	async create(data) {
		const result = this.ChiTietDatHang.insertOne(this.extractData(data));
		return result;
	}

	async delete(id) {
		const result = await this.ChiTietDatHang.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
	async deleteAll(id) {
		const result = await this.ChiTietDatHang.deleteMany({
			MSHH: id,
		});
		return result;
	}
}

module.exports = ChiTietDatHangService;
