const { ObjectId } = require("mongodb");

class HangHoaService {
	constructor(client) {
		this.HangHoa = client.db().collection("hanghoa");
		this.HinhHH = client.db().collection("hinhhanghoa");
	}
	extractHangHoaData(payload) {
		const HangHoa = {
			TenHH: payload.TenHH,
			ThuongHieu: payload.ThuongHieu,
			MoTaHH: payload.MoTaHH,
			Gia: payload.Gia,
			Mau: payload.Mau,
			KichCo: payload.KichCo,
			SoLuongHang: payload.SoLuongHang,
			GhiChu: payload.GhiChu,
		};
		// remove underfile fields
		Object.keys(HangHoa).forEach(
			(key) => HangHoa[key] === undefined && delete HangHoa[key]
		);
		return HangHoa;
	}
	async create(data) {
		const hanghoa = this.extractHangHoaData(data);
		const result = this.HangHoa.insertOne(hanghoa);
		return result;
	}

	async update(id, payload) {
		const filter = {
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		};
		const update = this.extractHangHoaData(payload);
		const result = await this.HangHoa.findOneAndUpdate(
			filter,
			{ $set: update },
			{ returnDocument: "after" }
		);
		return result;
	}

	async findAll() {
		try {
			const cursor = await this.HangHoa.find();
			return await await cursor.toArray();
		} catch (error) {
			return null;
		}
	}
	async findByName(TenHH) {
		try {
			return await this.HangHoa.findOne({
				TenHH: TenHH,
			});
		} catch (error) {
			return null;
		}
	}

	async findById(id) {
		return await this.HangHoa.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}

	async delete(id) {
		const result = await this.HangHoa.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
}

module.exports = HangHoaService;
