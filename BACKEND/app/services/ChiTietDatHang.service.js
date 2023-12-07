const { ObjectId } = require("mongodb");

class ChiTietDatHangService {
	constructor(client) {
		this.ChiTietDatHang = client.db().collection("chitietdathang");
	}
	extractData(payload) {
		const Data = {
			SoDonDH: payload.SoDonDH,
			MSHH: payload.MSHH,
			SoLuong: payload.SoLuong,
			GiaDatHang: payload.GiaDatHang,
			GiamGia: payload.GiamGia || 0,
		};
		// remove undefine fields
		Object.keys(Data).forEach(
			(key) => Data[key] === undefined && delete Data[key]
		);
		return Data;
	}
	async create(data) {
		const data_extract = this.extractData(data);
		const result = await this.ChiTietDatHang.insertOne(data_extract);
		return result;
	}
}

module.exports = ChiTietDatHangService;
